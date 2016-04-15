<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Questionnaire;

/**
 * Class CreateProfileJob
 * @package DreamsArk\Jobs\Admin\Profile
 */
class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     * @param array|Request $request
     */
    public function __construct(array $request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @param Profile $profile
     * @param Questionnaire $questionnaire
     * @return bool
     */
    public function handle(Profile $profile, Questionnaire $questionnaire)
    {
        $questions = '';
        if (@$this->request['question'])
            $questions = $questionnaire->whereIn('id', $this->request['question'])->get();
//        dd($questions);
        $object = $profile->create($this->request);
        if ($object->id) {
            if ($questions)
                $object->questions()->attach($questions);
            return true;
        }
        return false;
    }
}
