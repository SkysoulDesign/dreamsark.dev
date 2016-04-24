<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Question;

/**
 * Class DeleteQuestionJob
 *
 * @package DreamsArk\Jobs\Admin\Question
 */
class DeleteQuestionJob extends Job
{
    /**
     * @var Question
     */
    private $question;

    /**
     * Create a new job instance.
     *
     * @param Question $question
     */
    public function __construct(Question $question)
    {
        $this->question = $question;
    }

    /**
     * Execute the job.
     *
     * @todo implement Repository
     * @return bool
     * @throws \Exception
     */
    public function handle()
    {
        return $this->question->delete();
    }

}
