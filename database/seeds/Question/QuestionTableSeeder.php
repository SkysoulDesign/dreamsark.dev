<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Database\Seeder;

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
            $type = Type::whereNotIn('name', ['checkbox', 'select', 'radio', 'file', 'video', 'image', 'color'])->orderBy(DB::raw('RAND()'))->limit(1)->get();
            dispatch(new CreateQuestionJob($question, $type[0]));
        }

    }

}
