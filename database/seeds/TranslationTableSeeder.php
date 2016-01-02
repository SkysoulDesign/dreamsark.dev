<?php

use DreamsArk\Commands\Translation\CreateTranslationCommand;
use DreamsArk\Models\Translation\Group;
use DreamsArk\Models\Translation\Language;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

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

        $this->dispatch(new CreateTranslationCommand(Language::first(), Group::first(), $translation));
    }
}
