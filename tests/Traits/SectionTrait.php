<?php

use DreamsArk\Jobs\Admin\Question\Section\CreateSectionJob;

/**
 * Class SectionTrait
 */
trait SectionTrait
{

    /**
     * Create a Section
     *
     * @param array $params
     * @return \DreamsArk\Models\Master\Question\Question
     */
    public function createSection($params = [])
    {

        /** @var Faker\Generator $faker */
        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'name' => $faker->userName,
        ], $params);

        return dispatch(new CreateSectionJob($data['name']));
    }
}
