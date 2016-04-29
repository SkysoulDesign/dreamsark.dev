<?php

use DreamsArk\Models\User\Role;
use DreamsArk\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class UserControllerTest
 */
class UserControllerTest extends TestCase
{

    use DatabaseTransactions, UserTrait, RoleTrait;

    /**
     * It Displays the Index page
     *
     * @test
     */
    public function it_displays_the_index_page()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $this->route('GET', 'admin.user.index');
        $this->assertResponseOk();
        $this->assertViewHasAll([
            'users' => User::all(),
        ]);

    }

    /**
     * Test if create User Page is being displayed correctly
     *
     * @test
     */
    public function it_displays_the_create_user_page()
    {
        $this->actingAs($this->createUser([], 'admin'));

        $this->route('GET', 'admin.user.create');

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'roles' => Role::all(),
        ]);
    }

    /**
     * @test
     */
    public function it_creates_a_new_user()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $data = [
            'role_id'               => $this->createRole()->getAttribute('id'),
            'name'                  => "Super Man",
            'username'              => "superman",
            'password'              => "123456",
            'password_confirmation' => "123456",
            'email'                 => "superman@supermail.com",
        ];

        $this->route('POST', 'admin.user.store', $data);
        $this->assertRedirectedToRoute('admin.user.index');

    }

    /**
     * Test if its showing the Editing View Correctly
     *
     * @test
     */
    public function it_displays_the_edit_page()
    {
        $this->actingAs($this->createUser([], 'admin'));
        $user = $this->createUser();

        $this->route('GET', 'admin.user.edit', $user);

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'user'  => $user->fresh()->load('roles'),
            'roles' => Role::all()
        ]);
    }

    /**
     * It test if the user can be updated
     *
     * @test
     */
    public function it_updates_a_question_with_options()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $user = $this->createUser(['name' => 'Old Name']);

        $data = [
            'name' => 'New Name',
            'username' => $user->getAttribute('username'),
            'email' => $user->getAttribute('email')
        ];

        $this->route('PATCH', 'admin.user.update', $user, $data);

        $this->assertEquals('New Name', $user->fresh()->getAttribute('name'));
        $this->assertRedirectedToRoute('admin.user.index');

    }

    /**
     * Test deleting a user
     *
     * @test
     */
    public function it_deletes_a_user()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $user = $this->createUser();

        $this->route('DELETE', 'admin.user.destroy', $user);

        $this->dontSeeInDatabase('users', $user->toArray());
        $this->assertRedirectedToRoute('admin.user.index');

    }

}
