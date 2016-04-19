<?php

use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Jobs\User\Profile\CreateProfileJob;
use DreamsArk\Models\Master\Profile;
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

        $data = [
            'questions' => [
                1 => 'Question 1 Answer',
            ]
        ];

        /** @var User $user */
        $user = dispatch(new CreateProfileJob($data, 1, 1));

        $this->assertInstanceOf(Profile::class, $user->profiles->where('id', 1)->first());

    }

    /**
     * @test
     */
    public function it_answer_some_questions()
    {

        $data = [
            'questions' => [
                1 => 'Question 1 Answer',
                4 => 'Question 4 Answer',
                5 => 'Question 5 Answer'
            ]
        ];

        $profile = $this->createProfile();

        /** @var User $user */
        $user = dispatch(new CreateProfileJob($data, $this->createUser(), $profile));

        $this->assertCount(3, $user->profiles->first()->answer->questions);

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
