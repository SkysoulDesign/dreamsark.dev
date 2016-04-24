<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use DreamsArk\Models\Master\Questionnaire;

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
     * @var array
     */
    private $fields;

    /**
     * @var Type|int|string
     */
    private $type;

    /**
     * Create a new job instance.
     *
     * @param Question $question
     * @param array $fields
     * @param Type|int|string $type
     */
    public function __construct(Question $question, array $fields, $type)
    {
        $this->question = $question;
        $this->fields = $fields;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @param Type $type
     * @return Question
     * @todo Broke, its not updating the type
     * @todo Implement Repository
     */
    public function handle(Type $type)
    {
        /**
         * @todo Allow ID or Name to be passed in a cleaner way
         */
        if (is_string($this->type))
            $this->type = $type->whereId($this->type)->first();

        $this->type->questions()->update($this->fields);

        /** @var Question $question */
        $question = $this->question->fresh();

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasUpdated($question));

        return $question;

    }

}
