<?php

namespace DreamsArk\Http\Controllers\Session;

use DreamsArk\Commands\Session\CreateUserCommand;
use DreamsArk\Commands\Session\UpdateUserCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Session\UserCreation;
use DreamsArk\Http\Requests\Session\UserEdition;

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
        $command = new CreateUserCommand($request->all());
        $this->dispatch($command);
        return redirect()->route('home');
    }

    /**
     * Update User Profile.
     *
     * @param UserEdition $request
     * @return \Illuminate\Http\Response
     */
    public function update(UserEdition $request)
    {
        $command = new UpdateUserCommand($request->user(), $request->all());
        $this->dispatch($command);
        return redirect()->back();
    }

}
