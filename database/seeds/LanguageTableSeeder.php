<?php

use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;
use SkysoulDesign\I18n\Jobs\CreateLanguageJob;

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
            $this->dispatch(new CreateLanguageJob($language));
        });

    }
}
