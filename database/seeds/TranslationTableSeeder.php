<?php

use DreamsArk\Models\Translation\Group;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;
use SkysoulDesign\I18n\Jobs\CreateTranslationJob;
use SkysoulDesign\I18n\Models\Language;

class TranslationTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $translation = [
            'key' => 'email',
            'value' => 'Email'
        ];

        $this->dispatch(new CreateTranslationJob(Language::first(), Group::first(), $translation));
    }
}
