<?php

namespace DreamsArk\Jobs\User\Profile;

use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;

class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $request;

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
     * @param array $request
     * @param User|int $user
     * @param Profile|int $profile
     */
    public function __construct(array $request, $user, $profile)
    {
        $this->request = $request;
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\Master\Answer $answer
     * @param User $user
     * @param Profile $profile
     * @return User
     */
    public function handle(Answer $answer, User $user, Profile $profile)
    {

        /**
         * Retrieve Model
         */
        if (!is_object($this->user))
            $this->user = $user->findOrFail($this->user);

        /**
         * Retrieve Model
         */
        if (!is_object($this->profile))
            $this->profile = $profile->findOrFail($this->profile);

        /** @var Answer $answer */
        $answer = $answer->create(['profile_id' => $this->profile->id]);

        foreach ($this->request['questions'] as $id => $reply) {

            $answer->questions()->attach($id, [
                'content' => $reply
            ]);

        }

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
