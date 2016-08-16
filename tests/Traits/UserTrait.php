<?php
use DreamsArk\Jobs\Session\CreateUserJob;

/**
 * Class UserTrait
 */
trait UserTrait
{

    /**
     * Create a user
     *
     * @param array $params
     * @param string $role
     * @return \DreamsArk\Models\User\User $user
     */
    public function createUser($params = [], $role = 'user')
    {

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'username' => $faker->userName,
            'name' => $faker->name,
            'email' => $faker->email,
            'password' => 123456,
        ], $params);

        return dispatch(new CreateUserJob($data, $role));
    }
}
