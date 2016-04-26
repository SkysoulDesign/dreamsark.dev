<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasUpdated;
use DreamsArk\Jobs\Admin\Question\Traits\QuestionTrait;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UpdateQuestionJob
 *
 * @package DreamsArk\Jobs\Admin\Question
 */
class UpdateQuestionJob extends Job
{
    use QuestionTrait;
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
     * @var array
     */
    private $options;

    /**
     * Create a new job instance.
     *
     * @param Question $question
     * @param array $fields
     * @param Type|int|string $type
     * @param array $options
     */
    public function __construct(Question $question, array $fields, $type, array $options)
    {
        $this->question = $question;
        $this->fields = $fields;
        $this->type = $type;
        $this->options = $options['options'];
    }

    /**
     * Execute the job.
     *
     * @param Type $type
     * @param Option $option
     * @return Question
     * @todo Broke, its not updating the type
     * @todo Implement Repository
     */
    public function handle(Type $type, Option $option)
    {
        /**
         * Check if Type is initialized otherwise init it
         */
        if (!$this->type instanceof Model)
            $this->type = $type->where(((int)$this->type ? 'id' : 'name'), $this->type)->firstOrFail();
//        dd($this->type);

        $this->question->update($this->fields);

        $this->question->type()->associate($this->type)->save();

        /**
         * Check if Type is radio/checkbox/select
         * sync options
         */
        $this->doOptionUpdate($option);

        /** @var Question $question */
        $this->question = $this->question->fresh();

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasUpdated($this->question));

        return $this->question;

    }

}
