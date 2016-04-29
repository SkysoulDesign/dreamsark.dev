<?php

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Models\User\Role;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateUserJobTest
 */
class CreateUserJobTest extends TestCase
{

    use DatabaseTransactions, FakerTrait, UserTrait, RoleTrait;

    /**
     * Every user should have a default
     * settings table linked to his account
     *
     * @test
     */
    public function user_should_comes_with_default_settings()
    {

        $roles = Role::all();

        $roles->each(function ($role) {
            $user = $this->createUser([], $role);
            $this->assertNotEmpty($user->settings);
        });

    }

    /**
     * After Creation an empty bag should be assigned to the user
     *
     * @test
     */
    public function user_should_comes_with_a_bag()
    {

        $user = $this->createUser();
        $this->assertEquals(0, $user->bag->coins);

    }

    /**
     * Test if user is created
     *
     * @test
     * @return \DreamsArk\Models\User\User
     */
    public function it_creates_a_new_user_on_the_database()
    {

        $data = [
            'username' => $this->faker->userName,
            'email'    => $this->faker->email,
            'password' => $this->faker->password(6, 6),
        ];

        /** @var DreamsArk\Models\User\User $user */
        dispatch(new CreateUserJob($data, 'user'));

        $this->seeInDatabase('users', array_except($data, 'password', 'role'));

    }

    /**
     * Check if user has the role $user
     *
     * @test
     */
    public function user_should_have_a_role_assigned_to_his_account()
    {

        $roles = Role::all();

        $roles->each(function ($role) {
            $user = $this->createUser([], $role);
            $this->assertTrue($user->hasRole($role->name));
        });

    }

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {
        $this->expectsEvents(UserWasCreated::class);
        $this->createUser();
    }

}
