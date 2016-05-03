<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

/**
 * Class QuestionTableSeeder
 */
class QuestionTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $questions = [
            'whats your nickname?',
            'How old are you?',
            'What is your nationality?',
            'What is your occupation?',
            'What is your Gender?',
            'How Could i call you?',
        ];

        foreach ($questions as $question) {
            $question = dispatch(new CreateQuestionJob($question, Type::all()->random()));
        }

    }

}
