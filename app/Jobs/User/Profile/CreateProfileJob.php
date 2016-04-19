<?php

namespace DreamsArk\Jobs\User\Profile;

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
     * @var \DreamsArk\Models\User\User
     */
    private $user;

    /**
     * @var \DreamsArk\Models\Master\Profile
     */
    private $profile;

    /**
     * Create a new job instance.
     *
     * @param array $request
     * @param \DreamsArk\Models\User\User $user
     * @param \DreamsArk\Models\Master\Profile $profile
     */
    public function __construct(array $request, User $user, Profile $profile)
    {
        $this->request = $request;
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\Master\Answer $answer
     */
    public function handle(Answer $answer)
    {

        /** @var Answer $answer */
        $answer = $answer->create([]);

        foreach ($this->request['questions'] as $id => $reply) {

            $answer->questions()->attach($id, [
                'content' => $reply
            ]);

        }

        $this->user->profiles()->attach($this->profile->id, [
            'answer_id' => $answer->id
        ]);

    }

}
