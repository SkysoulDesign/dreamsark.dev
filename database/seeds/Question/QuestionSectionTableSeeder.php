<?php

use DreamsArk\Jobs\Admin\Question\Section\CreateSectionJob;
use Illuminate\Database\Seeder;

/**
 * Class QuestionSectionTableSeeder
 */
class QuestionSectionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sections = [
            'general',
            'image',
            'video',
            'personal',
            'optional',
        ];

        foreach ($sections as $section) {
            $section = dispatch(new CreateSectionJob($section));
        }

    }
    
}
