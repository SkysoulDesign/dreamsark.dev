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
        $data = [
            'username' => 'TestUserName',
            'email'    => 'test@test.com',
            'password' => '123456',
        ];

        return $this->dispatchNow(new CreateUserJob($data, $role));

    }

}