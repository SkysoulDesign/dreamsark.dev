<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question;
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
    private $question;
    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     *
     * @param Question $question
     * @param array $request
     */
    public function __construct(Question $question, array $request)
    {
        //
        $this->question = $question;
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
        $this->question->update($this->request);
        return true;
    }
}
