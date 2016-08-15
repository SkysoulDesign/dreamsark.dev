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
            trans('questions.nickname') => 'text',
            trans('questions.age') => 'number',
            trans('questions.nationality') => 'text',
            trans('questions.occupation') => 'text',
            trans('questions.gender') => 'text',
            trans('questions.name') => 'text',
        ];

        foreach ($questions as $question => $type) {
            dispatch(new CreateQuestionJob(
                $question, Type::where('name', $type)->first()
            ));
        }
    }
}
