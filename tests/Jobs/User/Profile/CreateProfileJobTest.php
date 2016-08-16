<?php

use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class UserCreateProfileJobTest
 */
class UserCreateProfileJobTest extends TestCase
{

    use DatabaseTransactions, UserTrait, ProfileTrait;

    /**
     * A basic test example.
     *
     * @test
     */
    public function it_creates_the_user_profile()
    {

        $this->actingAs($user = $this->createUser());
        $profile = $this->createProfile([
            'name' => 'Scientist'
        ]);

        $answers = [];

        foreach ($profile->getAttribute('questions') as $question) {
            array_set($answers, "question_$question->id", 'hi');
        }

        $user = dispatch(new CreateProfileJob($answers, $user, $profile->fresh()));

        $this->assertTrue($user->hasProfile($profile));

    }

    /**
     * @test
     */
    public function it_answer_some_questions()
    {

        $profile = $this->createProfile();
        $answers = [];

        foreach ($profile->getAttribute('questions') as $question) {
            array_set($answers, "question_$question->id", 'hello world');
        };

        /** @var User $user */
        $user = dispatch(new CreateProfileJob($answers, $this->createUser(), $profile));

        $this->assertCount(5, $user->getAttribute('profiles')->find($profile)->answers);

    }

    /**
     * When Creating an user if it has two or more profiles and another user was also assigned with one of that profile
     * it should get the right answer for the profile
     * Main problem was relating the tables, because the answer_id was not being considered in the relationship
     *
     * @test
     */
    public function answer_id_should_match_answer_id_on_profiles_user()
    {

        $profile = $this->createProfile();

        /** @var User $userOne */
        /** @var User $userTwo */
        $userOne = dispatch(new CreateProfileJob([], $this->createUser(), $profile));
        $userTwo = dispatch(new CreateProfileJob([], $this->createUser(), $profile));

        /**
         * Two User having the same profile, fetching answer for each profiles should be respective to user
         */
        $this->assertNotEquals(
            $userOne->getAttribute('profiles')->first()->answer->id,
            $userTwo->getAttribute('profiles')->first()->answer->id
        );

    }

    /**
     * Expects Events to be fired
     *
     * @test
     */
    public function it_expects_events_to_be_triggered()
    {
        $this->expectsEvents(UserProfileWasCreated::class);
        $this->it_creates_the_user_profile();
    }

}
