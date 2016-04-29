<?php

use DreamsArk\Jobs\Admin\Question\Option\CreateOptionJob;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class OptionTrait
 */
trait OptionTrait
{

    /**
     * Create a new Option for Question
     *
     * @param array $params
     * @return Type
     */
    public function createOption($params = [])
    {

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'name' => $faker->word
        ], $params);

        return dispatch(new CreateOptionJob($data['name']));

    }

}