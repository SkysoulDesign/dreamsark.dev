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
            ['question' => 'whats your nickname?'],
            ['question' => 'How old are you?'],
            ['question' => 'What is your nationality?'],
            ['question' => 'What is your occupation?'],
            ['question' => 'What is your Gender?'],
            ['question' => 'How Could i call you?'],
        ];

        foreach ($questions as $question) {
            $question = dispatch(new CreateQuestionJob($question, Type::all()->random()));
        }

    }

}
