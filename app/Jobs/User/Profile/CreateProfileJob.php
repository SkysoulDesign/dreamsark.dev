<?php

namespace DreamsArk\Jobs\User\Profile;

use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\User\Traits\ProfileTrait;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Profile\Answer\AnswerRepositoryInterface;

/**
 * Class CreateProfileJob
 *
 * @package DreamsArk\Jobs\User\Profile
 */
class CreateProfileJob extends Job
{
    use ProfileTrait;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * @var Profile
     */
    private $profile;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param User|int $user
     * @param Profile|int $profile
     */
    public function __construct(array $fields, $user, $profile)
    {
        $this->fields = $fields;
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param AnswerRepositoryInterface $answer
     * @param User $user
     * @param Profile $profile
     * @return User
     */
    public function handle(AnswerRepositoryInterface $answer, User $user, Profile $profile)
    {

        $this->createObjectIfNotExists($user, $profile);

        /** @var Answer $answer */
        $answer = $answer->create(['profile_id' => $this->profile->id]);

        /*foreach ($this->request['questions'] as $id => $reply) {

            $answer->questions()->attach($id, [
                'content' => $reply
            ]);

        }*/
        $this->doInsertQuestions('required');
        $this->doInsertQuestions('general');

        $this->user->profiles()->attach($this->profile->id, [
            'answer_id' => $answer->id
        ]);

        /**
         * Announce UserProfileWasCreated
         */
        event(new UserProfileWasCreated($this->user, $this->profile));

        return $this->user;

    }

}
