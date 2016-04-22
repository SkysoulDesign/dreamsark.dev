<?php

namespace DreamsArk\Http\Controllers\Session;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Session\UserCreation;
use DreamsArk\Http\Requests\Session\UserEdition;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Jobs\Session\UpdateUserJob;

/**
 * Class SessionController
 *
 * @package DreamsArk\Http\Controllers\Session
 */
class SessionController extends Controller
{
    /**
     * SessionController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', array('only' => ['index', 'update']));
    }

    /**
     * Display Profile Page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('session.profile');
    }

    /**
     * Display a registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('session.register');
    }

    /**
     * Dispatch command to create User
     *
     * @param UserCreation $request
     * @return \Illuminate\View\View
     */
    public function store(UserCreation $request)
    {
        /**
         * Create User
         */
        $user = $this->dispatch(new CreateUserJob($request->all()));

        return redirect()->route('user.account');

    }

    /**
     * Update User Profile.
     *
     * @param UserEdition $request
     * @return \Illuminate\Http\Response
     */
    public function update(UserEdition $request)
    {
        $this->dispatch(new UpdateUserJob($request->user(), $request->all()));

        return redirect()->back();
    }

}
