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
                'required' => [
                    'text' => [
                        1 => 'Question 1 Answer',
                    ],
                    'select' => [
                        3 => 'Question 9 Answer',
                    ],
                ],
                'general' => [
                    'date' => [
                        3 => '2014-06-05',
                    ],
                ]
            ]
        ];

        $user = $this->createUser();
        $profile = $this->createProfile();

        /** @var User $user */
        $user = dispatch(new CreateProfileJob($data, $user, $profile));

        $this->assertInstanceOf(Profile::class, $user->profiles->where('id', 1)->first());

    }

    /**
     * @test
     */
    public function it_answer_some_questions()
    {

        $data = [
            'questions' => [
                'required' => [
                    'text' => [
                        1 => 'Question 1 Answer',
                    ],
                    'select' => [
                        3 => 'Question 9 Answer',
                    ],
                    'textarea' => [
                        5 => 'Question 9 Answer',
                    ],
                ],
            ]
        ];

        $profile = $this->createProfile();

        /** @var User $user */
        $user = dispatch(new CreateProfileJob($data, $this->createUser(), $profile));

        $this->assertCount(3, $user->profiles->first()->answer->questions);

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

        $data = [
            'questions' => [
                'required' => [
                    'text' => [
                        1 => 'Question 1 Answer',
                    ],
                    'select' => [
                        3 => 'Question 9 Answer',
                    ],
                    'textarea' => [
                        5 => 'Question 9 Answer',
                    ],
                ],
            ]
        ];

        /** @var User $userOne */
        /** @var User $userTwo */
        $userOne = dispatch(new CreateProfileJob($data, $this->createUser(), $profile));
        $userTwo = dispatch(new CreateProfileJob($data, $this->createUser(), $profile));

        /**
         * Two User having the same profile, fetching answer for each profiles should be respective to user
         */
        $this->assertNotEquals(
            $userOne->profiles->first()->answer->id,
            $userTwo->profiles->first()->answer->id
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
