<?php

use DreamsArk\Jobs\Admin\Question\Type\CreateTypeJob;
use Illuminate\Database\Seeder;

class QuestionTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            ['name' => 'text', 'display_name' => 'Text'],
            ['name' => 'textarea', 'display_name' => 'Content'],
            ['name' => 'email', 'display_name' => 'E-mail'],
            ['name' => 'checkbox', 'display_name' => 'Checkbox'],
            ['name' => 'radio', 'display_name' => 'Radio'],
            ['name' => 'select', 'display_name' => 'Select'],
            ['name' => 'url', 'display_name' => 'URL'],
            ['name' => 'file', 'display_name' => 'File'],
            ['name' => 'image', 'display_name' => 'Image'],
            ['name' => 'video', 'display_name' => 'Video'],
            ['name' => 'number', 'display_name' => 'Number'],
            ['name' => 'tel', 'display_name' => 'Telephone'],
            ['name' => 'datetime-local', 'display_name' => 'Datetime'],
            ['name' => 'date', 'display_name' => 'Date'],
//            ['name' => 'datetime', 'display_name' => 'Datetime'],
            ['name' => 'color', 'display_name' => 'Color'],
            ['name' => 'month', 'display_name' => 'Month'],
            ['name' => 'range', 'display_name' => 'Range'],
            ['name' => 'search', 'display_name' => 'Search'],
            ['name' => 'time', 'display_name' => 'Time'],
            ['name' => 'week', 'display_name' => 'Week'],
        ];

        foreach ($types as $type) {
            dispatch(new CreateTypeJob($type));
        };

    }

}
