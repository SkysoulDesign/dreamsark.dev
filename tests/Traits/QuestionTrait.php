<?php

use DreamsArk\Jobs\Admin\Question\CreateQuestionJob;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class QuestionTrait
 */
trait QuestionTrait
{

    /**
     * Create a Question
     *
     * @param array $params
     * @param int|string $type
     * @param array $options
     * @return \DreamsArk\Models\Master\Question\Question
     */
    public function createQuestion($params = [], $type = 1, $options = [])
    {

        if (is_int($type)) {
            $type = Type::first();
        }

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'question' => $faker->sentence,
        ], $params);

        return dispatch(new CreateQuestionJob($data['question'], $type, $options));

    }

}
