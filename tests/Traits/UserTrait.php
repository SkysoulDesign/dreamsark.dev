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
     * @param string $role
     * @return \DreamsArk\Models\User\User $user
     */
    public function createUser($role = 'user')
    {

        $faker = app(Faker\Generator::class);

        $data = [
            'username' => $faker->userName,
            'email'    => $faker->email,
            'password' => $faker->password(6, 6),
        ];

        return dispatch(new CreateUserJob($data, $role));

    }

}