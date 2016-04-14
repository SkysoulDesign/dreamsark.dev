<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class QuestionnaireTableSeeder extends Seeder
{
    use DispatchesJobs;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $profileArr = ['question 1' => ['category' => 'general', 'type' => 'text', 'is_primary' => 1], 'question 2' => ['category' => 'task', 'type' => 'text']];
        foreach ($profileArr as $key => $data) {
            $request = array_merge(['question' => studly_case($key)], $data);
            $this->dispatch(new CreateQuestionJob($request));
        }
    }
}
