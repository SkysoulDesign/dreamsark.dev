<?php

use DreamsArk\Commands\Translation\CreateLanguageCommand;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class LanguageTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = collect(['en', 'cn']);

        $languages->each(function ($language) {
            $this->dispatch(new CreateLanguageCommand($language));
        });

    }
}
