<?php

use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Section;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class ProfileControllerTest
 */
class ProfileControllerTest extends TestCase
{

    use DatabaseTransactions, UserTrait, ProfileTrait;

    /**
     * It Displays the Index page
     *
     * @test
     */
    public function it_displays_the_index_page()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $this->route('GET', 'admin.profile.index');

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'profiles' => Profile::all()
        ]);
    }

    /**
     * Test if create Profile Page is being displayed correctly
     *
     * @test
     */
    public function it_displays_the_create_profile_page()
    {
        $this->actingAs($this->createUser([], 'admin'));

        $this->route('GET', 'admin.profile.create');

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'questions' => Question::all(),
            'sections'  => Section::all(),
        ]);
    }

    /**
     * test create a profile
     *
     * @test
     */
    public function it_creates_a_new_profile()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $data = [
            'name'         => 'test_profile',
            'display_name' => 'Test Profile'
        ];

        /**
         * Create Questions
         */
        $questions = [];
        foreach (range(1, 5) as $index) {
            array_push($questions, $this->createQuestion()->id);
        }

        /**
         * Create Section
         * Randomly creates required questions
         */
        $sections = [];
        $required = [];
        foreach ($questions as $id) {
            array_set($sections, $id, $this->createSection()->id);
            (boolean)rand(0, 1) ?: array_push($required, $id);
        }

        array_set($data, 'questions', $questions);
        array_set($data, 'sections', $sections);
        array_set($data, 'required', $required);

        $this->route('POST', 'admin.profile.store', $data);
        $this->assertRedirectedToRoute('admin.profile.index');

        $this->seeInDatabase(app(Profile::class)->getTable(), ['name' => 'test_profile']);

    }

    /**
     * Test if its showing the Editing View Correctly
     *
     * @test
     */
    public function it_displays_the_edit_page()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $profile = $this->createProfile()->fresh(['questions']);

        $this->route('GET', 'admin.profile.edit', $profile);

        $this->assertResponseOk();
        $this->assertViewHasAll([
            'sections' => Section::all()
        ]);

    }

    /**
     * Test if profile is being updated correctly
     *
     * @test
     */
    public function it_updates_a_profile_section()
    {

        $this->actingAs($this->createUser([], 'admin'));

        $profile = $this->createProfile([], 25);

        $data = [
            'name'         => $name = 'NewProfileName',
            'display_name' => 'Beta Test',
            'questions'    => $profile->questions->pluck('id')->toArray(),
        ];

        $this->route('PATCH', 'admin.profile.update', $profile, $data);
        $this->assertRedirectedToRoute('admin.profile.edit', $name);
        $this->assertEquals($name, $profile->fresh()->name);
        $this->assertCount(25, $profile->fresh()->questions);

    }

    /**
     * Test deleting a Profile
     *
     * @test
     */
    public function it_deletes_a_profile()
    {

        $this->actingAs($this->createUser([], 'admin'));
        $profile = $this->createProfile();

        $this->route('DELETE', 'admin.profile.destroy', $profile);

        $this->dontSeeInDatabase(app(Profile::class)->getTable(), $profile->toArray());
        $this->assertRedirectedToRoute('admin.profile.index');

    }

}
