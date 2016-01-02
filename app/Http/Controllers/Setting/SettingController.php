<?php

namespace DreamsArk\Http\Controllers\Setting;

use DreamsArk\Commands\Setting\UpdateSettingCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Setting\SettingEdition;
use DreamsArk\Models\User\Setting;

class SettingController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param SettingEdition $request
     * @param Setting $setting
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(SettingEdition $request, Setting $setting)
    {
        $command = new UpdateSettingCommand($setting->getAttribute('id'), $request->all());
        $this->dispatch($command);

        return redirect()->back();
    }


}
