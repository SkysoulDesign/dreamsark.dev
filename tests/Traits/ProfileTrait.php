<?php

use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;

/**
 * Class ProfileTrait
 */
trait ProfileTrait
{

    /**
     * Create a user
     *
     * @param array $fields
     * @return \DreamsArk\Models\Master\Profile
     */
    public function createProfile(array $fields = [])
    {

        /** @var Faker\Generator $faker */
        $faker = app(Faker\Generator::class);

        $fields = array_merge($fields, $data = [
            'name'         => $faker->name,
            'display_name' => $faker->name,
            'description'  => $faker->sentence
        ]);

        return dispatch(new CreateProfileJob($fields));

    }

}