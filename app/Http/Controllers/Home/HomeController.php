<?php

namespace DreamsArk\Http\Controllers\Home;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Faker\Generator;
use Illuminate\Auth\AuthManager;
use Illuminate\Cookie\CookieJar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Socialite;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     * @internal param Request $request
     */
    public function index(Request $request, UserRepositoryInterface $userRepository, AuthManager $auth)
    {

        /**
         * to get approved in QQ for oAuth Login event
         * @todo: they instructed to use home page as callback page for first time to get approved and later can be modified to internal pages
         */
        if(strpos($request->headers->get('referer'), 'graph.qq.com')!==false || ($request->has('code') && $request->has('state'))){
            $socialDriver = 'qq';
            $socialUser = Socialite::driver($socialDriver)->user();
            if (is_null($socialUser))
                return redirect()->route('login')->withErrors(trans('auth.token-not-received'));

            $userObj = $userRepository->checkUserExists($socialUser->email, $socialUser->id, $socialDriver);
            $user = '';
            $socialData = [
                'auth_type'   => $socialDriver,
                'auth_id'     => $socialUser->id,
                'auth_email'  => $socialUser->email,
                'auth_token'  => $socialUser->token,
                'avatar_path' => $socialUser->avatar
            ];
            if ($userObj->isEmpty()) {
                /** @var Generator $faker */
                $faker = app(\Faker\Generator::class);
                /**
                 * Create User
                 */
                $newUserData = [
                    'name'     => $socialUser->name??$socialUser->nickname??'',
                    'username' => $socialUser->email != '' ? preg_replace('/@.*?$/', '', $socialUser->email) : $socialUser->id,
                    'email'    => $socialUser->email,
                    'password' => $faker->password(6, 6),
                ];

                /** @var User $user */
                $user = dispatch(new CreateUserJob($newUserData));


                $user->socialite()->create($socialData);
                $user->fresh();
                $message = trans('auth.account-created') . '. ' . trans('auth.please-update-your-personal-details');
            } else {
                /** @var User $user */
                $user = $userObj[0];
                $userSocialite = $userRepository->getSocialiteObject($user->id, $socialDriver);
                if ($userSocialite->isEmpty()) {
                    $user->socialite()->create($socialData);
                }
                $auth->login($user);
                $message = trans('auth.login-success');
            }
            if ($user instanceof User)
                return redirect()->intended(route('user.settings'))->withSuccess($message);

            return redirect()->route('login')->withErrors(trans('auth.social-login-failed'));
        }
//        return $this->dispatch(new GetUniqueCharacters());

        /**
         * Check if intro cookie is set
         */
        /*if (!$request->hasCookie('intro')) {
            return view('in');
        }*/

        return view('index');

    }

    /**
     * @param Request $request
     * @param CookieJar $cookie
     * @return \Illuminate\Http\RedirectResponse
     */
    public function skip(Request $request, CookieJar $cookie)
    {

        if ($request->get('skip', false)) {
            $cookie->queue(cookie('intro', 'skipped'));
        }

        return redirect()->route('home');

    }

}
