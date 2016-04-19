<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class CreateProfileJob
 *
 * @package DreamsArk\Jobs\Admin\Profile
 */
class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $request;

    /**
     * @var array
     */
    private $questions;

    /**
     * Create a new job instance.
     *
     * @param array $request
     * @param array $questions
     */
    public function __construct(array $request, array $questions = [])
    {
        $this->request = $request;
        $this->questions = $questions;
    }

    /**
     * Execute the job.
     *
     * @param Profile $profile
     * @return \DreamsArk\Models\Master\Profile
     */
    public function handle(Profile $profile)
    {

        $profile = $profile->create($this->request);
        $profile->questions()->sync($this->questions);

        return $profile;

        /**
         * $questions = '';
         * if (@$this->request['question'])
         * $questions = $questionnaire->whereIn('id', $this->request['question'])->get();
         * //        dd($questions);
         * $object =
         * if ($object->id) {
         * if ($questions)
         * $object->questions()->attach($questions);
         * return true;
         * }
         * return false;
         * */
    }
}
