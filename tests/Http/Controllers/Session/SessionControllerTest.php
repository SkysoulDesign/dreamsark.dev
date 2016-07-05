<?php

use DreamsArk\Jobs\Session\CreateUserJob;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class SessionControllerTest
 */
class SessionControllerTest extends TestCase
{

    use DatabaseTransactions, UserTrait;

    /**
     * Any Authenticated User Should be able to see his account page
     *
     * @test
     */
    public function should_display_account_page()
    {
        $this->actingAs($this->createUser());

        $response = $this->route('GET', 'user.account');
        $this->assertTrue($response->isOk());

    }

    /**
     * Only Logged-in users should be able to go to account page
     *
     * @test
     */
    public function only_authenticated_user_should_be_able_to_see_account_page()
    {
        $this->route('GET', 'user.account');
        $this->assertRedirectedToRoute('login');
    }

    /**
     * After Registration every user should be redirect to his account page
     *
     */
    public function user_should_be_redirected_to_account_after_registration()
    {

        $this->route('POST', 'register', [
            'username' => 'demo_user_test',
            'email'    => 'test@demo.com',
            'password' => '123456',
        ]);

        $this->seeIsAuthenticated();
        $this->assertRedirectedToRoute('user.account');

    }

    /**
     * When Registering a new user an job should be fired
     *
     */
    public function expects_jobs_to_be_fired_when_registering_a_user()
    {
        $this->expectsJobs(CreateUserJob::class)->route('POST', 'register', [
            'username' => 'demo_user_test',
            'email'    => 'test@demo.com',
            'password' => '123456',
        ]);
    }

    /**
     * User should be able to update their profiles
     *
     * @test
     */
    public function registered_user_should_be_able_to_update_his_profile()
    {

        $user = $this->createUser(['name' => 'Some Name']);
        $this->actingAs($user);

        $response = $this->route('PATCH', 'user.account.update', [
            'name' => $name = 'Batman'
        ]);

        $this->assertTrue($response->isRedirection());
        $this->assertEquals($user->fresh()->getAttribute('name'), $name);

    }

    /**
     * Only Authenticated users should be able to update their profile
     *
     * @test
     */
    public function users_should_be_able_to_update_their_profile_if_they_are_not_logged_in()
    {

        $this->route('PATCH', 'user.account.update', [
            'name' => 'Batman'
        ]);

        $this->assertRedirectedToRoute('login');

    }

}
