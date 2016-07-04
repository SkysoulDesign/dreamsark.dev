<?php

namespace DreamsArk\Http\Controllers\User\Setting;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Setting\UpdateUserInfoRequest;
use DreamsArk\Jobs\Session\UpdateUserJob;

/**
 * Class SettingController
 *
 * @package DreamsArk\Http\Controllers\Setting
 */
class SettingController extends Controller
{

    /**
     * SessionController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display User Settings
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('user.settings');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserInfoRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateUserInfoRequest $request)
    {

        dispatch(new UpdateUserJob($request->user(), $request->except('username')));

        return redirect()->back();
    }

}
