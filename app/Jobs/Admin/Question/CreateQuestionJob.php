<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class CreateQuestionJob
 *
 * @package DreamsArk\Jobs\Admin\Question
 */
class CreateQuestionJob extends Job
{
    /**
     * @var string
     */
    private $question;

    /**
     * @var Type
     */
    private $type;

    /**
     * @var array
     */
    private $options;

    /**
     * Create a new job instance.
     *
     * @param string $question
     * @param Type $type
     * @param array $options
     */
    public function __construct(string $question, Type $type, $options = [])
    {
        $this->question = $question;
        $this->type = $type;
        $this->options = $options;
    }

    /**
     * Execute the job.
     *
     * @param Question $question
     * @return Question
     */
    public function handle(Question $question)
    {
        /**
         * Create Question
         *
         * @var Question $question
         */
        $question = $question->type()
            ->associate($this->type)
            ->fill([
                'question' => $this->question
            ]);

        $question->save();

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($question, $this->type, $this->options));

        return $question;
    }
}
