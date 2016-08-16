<?php

use DreamsArk\Events\RoleWasCreated;
use DreamsArk\Jobs\User\Role\CreateRoleJob;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateRoleJobTest
 */
class CreateRoleJobTest extends TestCase
{

    use DatabaseTransactions;

    /**
     * @var array
     */
    private $data = [
        'name',
        'description'
    ];

    /**
     * A basic test example.
     *
     * @test
     */
    public function it_should_create_a_new_role_in_the_database()
    {

        $role = dispatch(new CreateRoleJob(
            extract($this->data)
        ));

        $this->seeInDatabase('roles', $role->toArray());
    }

    /**
     * @test
     */
    public function it_should_fail_if_role_already_exists_on_database()
    {
        //@todo implement this method
    }

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {

        $this->expectsEvents(RoleWasCreated::class);

        dispatch(new CreateRoleJob(
            extract($this->data)
        ));
    }
}
