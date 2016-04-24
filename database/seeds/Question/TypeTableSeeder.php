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
            ['name' => 'number', 'display_name' => 'Number'],
            ['name' => 'date', 'display_name' => 'Date'],
            ['name' => 'datetime', 'display_name' => 'Datetime'],
            ['name' => 'email', 'display_name' => 'E-mail'],
            ['name' => 'checkbox', 'display_name' => 'Checkbox'],
        ];

        foreach ($types as $type) {
            dispatch(new CreateTypeJob($type));
        };

    }

}
