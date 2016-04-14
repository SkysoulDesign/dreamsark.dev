<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Questionnaire;

/**
 * Class UpdateQuestionJob
 * @package DreamsArk\Jobs\Admin\Question
 */
class UpdateQuestionJob extends Job
{
    /**
     * @var Questionnaire
     */
    private $questionnaire;
    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     *
     * @param Questionnaire $questionnaire
     * @param array $request
     */
    public function __construct(Questionnaire $questionnaire, array $request)
    {
        //
        $this->questionnaire = $questionnaire;
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        dd($this->request);
        $this->questionnaire->update($this->request);
        return true;
    }
}
