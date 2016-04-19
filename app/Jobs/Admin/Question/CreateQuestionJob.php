<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question;

/**
 * Class CreateQuestionJob
 *
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
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @param Question $question
     * @return Question
     */
    public function handle(Question $question)
    {
        $question = $question->create($this->request);

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($question));

        return $question;
    }

}
