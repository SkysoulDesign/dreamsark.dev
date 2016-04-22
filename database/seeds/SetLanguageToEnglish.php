<?php

use DreamsArk\Jobs\Setting\UpdateSettingJob;
use DreamsArk\Models\User\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class SetLanguageToEnglish extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $settings = Setting::all();
        $fields = array('language' => 'en');

        $settings->each(function ($setting) use ($fields) {
            /**
             * Less on dreamsark Account
             */
//            if ($setting->id == 2) return;

            $this->dispatch(new UpdateSettingJob($setting->id, $fields));
        });

    }
}
