<?php
use DreamsArk\Jobs\User\Role\CreateRoleJob;

/**
 * Class UserTrait
 */
trait RoleTrait
{

    /**
     * Create a user
     *
     * @param array $params
     * @param string $role
     * @return \DreamsArk\Models\User\User $user
     */
    public function createRole($role = null, $params = [])
    {

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'username'     => $role ?: $faker->userAgent,
            'display_name' => studly_case($role ?: $faker->userAgent),
            'description'  => $faker->sentence,
        ], $params);

        return dispatch(new CreateRoleJob($data));

    }

}