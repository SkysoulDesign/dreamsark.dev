<?php

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Models\User\Role;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class CreateUserJobTest
 */
class CreateUserJobTest extends TestCase
{

    use DatabaseTransactions, DispatchesJobs, FakerTrait;

    /**
     * Check if user has the role $user
     *
     * @test
     */
    public function user_should_comes_with_default_settings()
    {

        /** @var \Illuminate\Support\Collection $roles */
        $roles = app(Role::class)->all();

        $roles->each(function ($role) {
            /** @var \DreamsArk\Models\User\User $user */
            $user = $this->it_creates_a_new_user_on_the_database($role->name);
            $this->assertNotEmpty($user->settings);
        });

    }

    /**
     * Test if user is created
     *
     * @test
     * @param string $role
     * @return \DreamsArk\Models\User\User
     */
    public function it_creates_a_new_user_on_the_database($role = 'user')
    {

        $data = [
            'username' => $this->faker->userName,
            'email'    => $this->faker->email,
            'password' => $this->faker->password(6, 6),
        ];

        /** @var DreamsArk\Models\User\User $user */
        $user = $this->dispatch(new CreateUserJob($data, $role));

        $this->seeInDatabase('users', array_except($data, 'password', 'role'));

        return $user;

    }

    /**
     * Check if user has the role $user
     *
     * @test
     */
    public function user_should_have_a_role_assigned_to_his_account()
    {

        /** @var \Illuminate\Support\Collection $roles */
        $roles = app(Role::class)->all();

        $roles->each(function ($role) {
            $user = $this->it_creates_a_new_user_on_the_database($role->name);
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
        $this->it_creates_a_new_user_on_the_database();
    }

}
