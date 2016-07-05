<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class AuthControllerTest
 */
class AuthControllerTest extends TestCase
{

    use DatabaseTransactions, UserTrait, RoleTrait;

    /**
     * Users should be able to go to login page
     *
     * @test
     */
    public function it_returns_the_login_page()
    {
        $response = $this->route('GET', 'login');
        $this->assertTrue($response->isOk());
    }

    /**
     * Users should not be able to see login page if they are already logged in
     *
     * @test
     */
    public function it_redirects_to_home_page_if_user_already_logged_in()
    {
        $this->actingAs($this->createUser());
        $this->route('GET', 'login');
        $this->assertRedirectedToRoute('home');
    }

    /**
     * Ensure the user after login is the same as the authenticated one
     *
     */
    public function it_logs_the_user_in_to_the_app()
    {

        $this->withoutMiddleware();
        $this->withoutEvents();
        $user = $this->createUser(['password' => '123456']);

        $this->route('POST', 'login.store', [
            'login'    => $user->username,
            'password' => '123456'
        ]);

        $this->assertSame($user->getAuthIdentifier(), auth()->user()->getAuthIdentifier());
        $this->assertRedirectedToRoute('home');

    }

    /**
     * Wrong password should redirect back to login screen with errors messages
     *
     */
    public function it_redirect_to_login_if_credentials_are_wrong()
    {

        $this->withoutMiddleware();
        $user = $this->createUser(['password' => '123456']);

        $response = $this->route('POST', 'login.store', [
            'login'    => $user->email,
            'password' => 'wrong_password'
        ]);

        $this->assertRedirectedToRoute('login');
        $this->assertSessionHasErrors();
        $this->assertTrue($response->isRedirection());

    }

    /**
     * Admin should be redirect to admin area after login
     *
     */
    public function it_redirects_to_admin_section_if_user_is_an_admin()
    {

        $this->withoutMiddleware();
        $user = $this->createUser(['password' => $password = '123456'], 'admin');

        $response = $this->route('POST', 'login.store', [
            'login'    => $user->getAttribute('email'),
            'password' => $password
        ]);

        $this->assertRedirectedToRoute('admin.index');
        $this->assertTrue($response->isRedirection());

    }

    /**
     * An Authenticated user should be able to access LOGOUT and exit the app
     *
     * @test
     */
    public function it_log_the_user_out_from_the_system()
    {

        $user = $this->createUser();
        $this->actingAs($user);

        $this->route('GET', 'logout');
        $this->assertRedirectedToRoute('login');

        $this->dontSeeIsAuthenticated();

    }

}
