<?php

namespace DreamsArk\Jobs\User\Profile;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question;
use Illuminate\Support\Collection;

class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $request;

    /**
     * @var \DreamsArk\Models\Master\Profile
     */
    private $profile;

    /**
     * Create a new job instance.
     *
     * @param array $request
     * @param \DreamsArk\Models\Master\Profile $profile
     */
    public function __construct(array $request, Profile $profile)
    {
        $this->request = $request;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\Master\Profile $profile
     */
    public function handle()
    {

        /** @var Collection $questions */
        $questions = $this->profile->questions;

        foreach ($this->request['questions'] as $id => $answer) {

            /** @var Question $question */
            $question = $questions->where('id', $id)->first();

            dd($question->answer()->create(['user_id' => 1]));

            dd($question->answer()->attach(1, ['content' => 'hello world']));

        }

//        $user->profile[0]->questions->answers

        $this->profile->questions[0]->answer();
    }

}
