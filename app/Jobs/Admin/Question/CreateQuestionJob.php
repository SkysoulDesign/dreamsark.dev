<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Questionnaire;

/**
 * Class CreateQuestionJob
 * @package DreamsArk\Jobs\Admin\Question
 */
class CreateQuestionJob extends Job
{
    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     *
     * @param array $request
     */
    public function __construct(array $request)
    {
        //
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @param Questionnaire $questionnaire
     * @return bool
     */
    public function handle(Questionnaire $questionnaire)
    {
        $object = $questionnaire->create($this->request);
        if ($object->id)
            return true;
        return false;
    }
}
