<?php

use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;

/**
 * Class ProfileTrait
 */
trait ProfileTrait
{

    use QuestionTrait, SectionTrait;

    /**
     * Create a user
     *
     * @param array $fields
     * @param int $numberOfQuestions
     * @return \DreamsArk\Models\Master\Profile
     */
    public function createProfile(array $fields = [], $numberOfQuestions = 5)
    {

        /** @var Faker\Generator $faker */
        $faker = app(Faker\Generator::class);

        $fields = array_merge($data = [
            'name' => $faker->name,
            'display_name' => $faker->name,
        ], $fields);

        /**
         * Create Questions
         */
        $questions = [];
        foreach (range(1, $numberOfQuestions) as $index) {
            array_push($questions, $this->createQuestion()->getKey());
        }

        /**
         * Create Section
         * Randomly creates required questions
         */
        $sections = [];
        $required = [];
        foreach ($questions as $id) {
            array_set($sections, $id, $this->createSection()->id);
            (boolean)rand(0, 1) ?: array_push($required, $id);
        }

        return dispatch(new CreateProfileJob($fields, $questions, $sections, $required));

    }

}
