<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

class SettingControllerTest extends TestCase
{
    /**
     *
     */
    use DatabaseTransactions, UserTrait;

    /**
     * Area Restricted to authenticated users
     *
     * @test
     */
    public function only_authenticated_users_should_be_able_to_open_settings_page()
    {
        /**
         * Not Authenticated
         */
        $this->route('GET', 'user.settings');
        $this->assertRedirectedToRoute('login');


        /**
         * Authenticated
         */
        $this->actingAs($this->createUser());
        $response = $this->route('GET', 'user.settings');
        $this->assertTrue($response->isOk());

    }

    /**
     * Every authenticated user should be able to update their settings
     *
     * @test
     */
    public function user_should_be_able_to_update_his_settings()
    {

        $user = $this->createUser();
        $this->actingAs($user);
        $this->route('PATCH', $route = 'user.settings.update', [
            'language' => 'en'
        ]);

        $this->assertEquals('en', $user->settings->language);

    }

}
