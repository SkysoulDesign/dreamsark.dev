<?php

namespace DreamsArk\Http\Controllers\Auth;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Faker\Generator;
use Illuminate\Auth\AuthManager;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Socialite;

/**
 * Class AuthController
 *
 * @package DreamsArk\Http\Controllers\Auth
 */
class AuthController extends Controller
{

    use ThrottlesLogins;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @var AuthManager
     */
    protected $auth;

    /**
     * @param Application $app
     * @param AuthManager $auth
     */
    function __construct(Application $app, AuthManager $auth)
    {
        $this->middleware('guest', ['except' => 'logout']);
        $this->app = $app;
        $this->auth = $auth;
    }

    /**
     * Show Login Page
     *
     * @return \Illuminate\View\View
     */
    public function login()
    {
        return view('auth.login');
    }

    /**
     * Display a registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function register()
    {
        return view('session.register');
    }

    /**
     * Post the Login form
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function loginStore(Request $request)
    {
        /**
         * Determines if it`s an email otherwise consider being a username
         */
        $field = filter_var($request->get('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $request->merge([$field => $request->get('login')]);

        $this->validate($request, [
            'login' => 'required',
            'password' => 'required'
        ]);

        if ($this->auth->attempt($request->only($field, 'password'))) {

            if ($this->auth->user()->is('admin'))
                return redirect()->intended(route('admin.index'));

            return redirect()->intended(route('home'));

        }

        return redirect()->route('login')->withInput()->withErrors('These credentials do not match our records.');
    }

    /**
     * Dispatch command to create User
     *
     * @param UserCreation $request
     *
     * @return \Illuminate\View\View
     */
    public function registerStore(UserCreation $request)
    {
        /**
         * Create User
         */
        $this->dispatch(new CreateUserJob($request->all()));

        return redirect()->route('user.account');

    }

    public function loginWithSocial(Request $request)
    {
        if (!$request->has('login_through'))
            return redirect()->back()->withErrors(trans('auth.invalid-data-found'));

        $login_through = $request->get('login_through', '');

        $socialDriver = Socialite::driver($login_through);

        return $socialDriver->redirect();

    }

    public function loginWithSocialCallBack(Request $request, UserRepositoryInterface $userRepository)
    {
        if (is_null($request->social))
            return redirect()->route('login')->withErrors(trans('auth.social-driver-not-found'));
        else if (empty($request->all()))
            return redirect()->route('login')->withErrors(trans('auth.invalid-data-received'));

        $socialDriver = $request->social;
        $socialUser = Socialite::driver($socialDriver)->user();

        if (is_null($socialUser))
            return redirect()->route('login')->withErrors(trans('auth.token-not-received'));

        /**
         * @TODO: need to check the user existence by email address received in $socialUser->user object and create if not
         */
        $userObj = $userRepository->checkUserExists($socialUser->email, $socialUser->id, $socialDriver);
        $user = '';
        $socialData = [
            'auth_type' => $socialDriver,
            'auth_id' => $socialUser->id,
            'auth_email' => $socialUser->email,
            'auth_token' => $socialUser->token,
            'avatar_path' => $socialUser->avatar
        ];
        if ($userObj->isEmpty()) {
            /** @var Generator $faker */
            $faker = app(\Faker\Generator::class);
            /**
             * Create User
             */
            $newUserData = [
                'name' => $socialUser->name??$socialUser->nickname??'',
                'username' => $socialUser->email != '' ? preg_replace('/@.*?$/', '', $socialUser->email) : $socialUser->id,
                'email' => $socialUser->email,
                'password' => $faker->password(6, 6),
            ];

            /** @var User $user */
            $user = dispatch(new CreateUserJob($newUserData));

            $socialData['avatar_path'] = $this->saveAvatarFromUrl($socialDriver, $user, $socialUser->avatar);

            $user->socialite()->create($socialData);
            $user->fresh();
            $message = trans('auth.account-created') . '. ' . trans('auth.please-update-your-personal-details');
        } else {
            /** @var User $user */
            $user = $userObj[0];
            $userSocialite = $userRepository->getSocialiteObject($user->id, $socialDriver);
            if ($userSocialite->isEmpty()) {
                $socialData['avatar_path'] = $this->saveAvatarFromUrl($socialDriver, $user, $socialUser->avatar);
                $user->socialite()->create($socialData);
            }
            $this->auth->login($user);
            $message = trans('auth.login-success');
        }
        if ($user instanceof User)
            return redirect()->intended(route('user.settings'))->withSuccess($message);

        return redirect()->route('login')->withErrors(trans('auth.social-login-failed'));

    }

    private function saveAvatarFromUrl($socialDriver, $user, $avatar)
    {
        /** file save from url */
        $avatar_path = $avatar;
        if (!is_null($avatar)) {

            $extension = pathinfo($avatar, PATHINFO_EXTENSION) ?: 'jpg';
            // pathinfo($socialUser->avatar, PATHINFO_FILENAME)
            $fileName = str_slug($user->username . '-' . $socialDriver . '-profile_avatar') . '.' . $extension;
            $userDir = "user_content" . DIRECTORY_SEPARATOR . $user->id;
            $path = $userDir . DIRECTORY_SEPARATOR . str_plural('avatar');
            $avatarUploadPath = $path . DIRECTORY_SEPARATOR . $fileName;
            if (!\File::exists(public_path($userDir)))
                \File::makeDirectory(public_path($userDir));
            if (!\File::exists(public_path($path)))
                \File::makeDirectory(public_path($path));
            $newFile = copy($avatar, $avatarUploadPath);
            if ($newFile) {
                $avatar_path = $avatarUploadPath;
            }

        }

        return $avatar_path;
    }

    /**
     * Log the User out of the system
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout()
    {
        $this->auth->logout();

        return redirect()->route('login');
    }

}
