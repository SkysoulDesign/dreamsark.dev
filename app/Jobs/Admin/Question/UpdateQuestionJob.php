<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class UpdateQuestionJob
 *
 * @package DreamsArk\Jobs\Admin\Question
 */
class UpdateQuestionJob extends Job
{

    /**
     * @var Question
     */
    private $question;

    /**
     * @var string
     */
    private $field;

    /**
     * @var Type|int
     */
    private $type;

    /**
     * @var array
     */
    private $options;

    /**
     * Create a new job instance.
     *
     * @param Question $question
     * @param string $field
     * @param Type|int $type
     * @param array $options
     */
    public function __construct(Question $question, $field, $type, $options = [])
    {
        $this->question = $question;
        $this->field = $field;
        $this->type = $type;
        $this->options = $options;
    }

    /**
     * Execute the job.
     *
     * @return Question
     * @todo Implement Repository
     */
    public function handle()
    {

        $this->question->type()
            ->associate($this->type)
            ->fill([
                'question' => $this->field
            ]);

        $this->question->save();

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasUpdated($this->question, $this->type, $this->options));

        return $this->question;

    }

}
