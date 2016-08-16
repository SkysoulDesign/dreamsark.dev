<?php

use DreamsArk\Events\Session\UserWasUpdated;
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
     */
    public function user_should_be_able_to_update_his_basic_information()
    {

        $user = dispatch(new UpdateUserJob($this->createUser(), [
            'email' => $email = 'hello@world.com'
        ]));

        $this->assertEquals($email, $user->getAttribute('email'));
    }

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {
        $this->expectsEvents(UserWasUpdated::class);
        $this->user_should_be_able_to_update_his_basic_information();
    }
}
