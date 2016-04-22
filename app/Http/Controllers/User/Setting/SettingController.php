<?php

namespace DreamsArk\Http\Controllers\User\Setting;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Setting\SettingEdition;
use DreamsArk\Jobs\Setting\UpdateSettingJob;

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
     * @param SettingEdition $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(SettingEdition $request)
    {
        /**
         * Update Settings
         */
        $this->dispatch(new UpdateSettingJob($request->user()->settings, $request->all()));

        return redirect()->back();

    }

}
