<?php

namespace DreamsArk\Http\Controllers\Auth;

use DreamsArk\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    use ThrottlesLogins;

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
        return view("auth.login");
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
            return redirect()->intended(route('home'));
        }

        return redirect()->route('login')->withInput()->withErrors('These credentials do not match our records.');

    }

    /**
     * Log the User out of the system
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout()
    {
        $this->auth->logout();
        return redirect()->route('login');
    }

}
