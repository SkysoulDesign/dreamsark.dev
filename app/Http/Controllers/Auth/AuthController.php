<?php

namespace DreamsArk\Http\Controllers\Auth;

use DreamsArk\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Socialite;
use SocialiteProviders\Manager\Config;

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
    public function create()
    {
        return view("auth.login");
    }

    public function loginWithSocial(Request $request)
    {
        if (!$request->has('login_through'))
            return redirect()->back()->withErrors(trans('auth.invalid-data-found'));

        $login_through = $request->get('login_through', '');

        $clientId = env(strtoupper($login_through).'_KEY');
        $clientSecret = env(strtoupper($login_through).'_SECRET');
        $redirectUrl = route('login.social.callback', $login_through);
        $config = new Config($clientId, $clientSecret, $redirectUrl);

        /*return Socialite::class->with($login_through)->setConfig($config)->redirect();*/
        $socialDriver = Socialite::driver($login_through);
        return $socialDriver->redirect();

    }

    public function loginWithSocialCallBack(Request $request)
    {
        if (!$request->has('social'))
            return redirect()->route('login')->withErrors(trans('auth.social-driver-not-found'));

        $socialDriver = $request->get('social', '');
        $user = Socialite::driver($socialDriver)->user();
        dd($user);

        dd($request->all());
    }

    /**
     * Post the Login form
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {

        /**
         * Determines if it`s an email otherwise consider being a username
         */
        $field = filter_var($request->get('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $request->merge([$field => $request->get('login')]);

        $this->validate($request, [
            'login'    => 'required',
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
