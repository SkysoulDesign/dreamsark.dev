<?php

use DreamsArk\Jobs\Session\UpdateUserJob;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateUserJobTest
 */
class UpdateUserJobTest extends TestCase
{

    use DatabaseTransactions, UserTrait;

    /**
     * Test if user is created
     *
     * @test
     * @return \DreamsArk\Models\User\User
     */
    public function user_should_be_able_to_update_his_basic_information()
    {

        $user = $this->createUser();
        $status = dispatch(new UpdateUserJob($user, [
            'email' => 'hello@world.com'
        ]));

        $this->assertTrue($status);

        return $user;

    }

}
