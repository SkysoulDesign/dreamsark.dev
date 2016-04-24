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
     * @var array
     */
    private $fields;

    /**
     * @var Type
     */
    private $type;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param Type|int|string $type
     */
    public function __construct(array $fields, $type)
    {
        $this->fields = $fields;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @param Type $type
     * @return Question
     * @todo Implement Repository
     * @todo the is_string part to a better way of doing it
     */
    public function handle(Type $type)
    {

        /**
         * @todo Allow ID or Name to be passed in a cleaner way
         */
        if (is_string($this->type))
            $this->type = $type->whereId($this->type)->first();

        /**
         * Create Question
         *
         * @var Question $question
         */
        $question = $this->type->questions()->create($this->fields);

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($question));

        return $question;

    }

}
