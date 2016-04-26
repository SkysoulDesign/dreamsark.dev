<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Admin\Question\Traits\QuestionTrait;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class CreateQuestionJob
 *
 * @package DreamsArk\Jobs\Admin\Question
 */
class CreateQuestionJob extends Job
{
    use QuestionTrait;
    /**
     * @var array
     */
    private $fields;

    /**
     * @var Type
     */
    private $type;
    /**
     * @var
     */
    private $question;
    /**
     * @var array
     */
    private $options;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param Type|int|string $type
     * @param array $options
     */
    public function __construct(array $fields, $type, array $options = [])
    {
        $this->fields = $fields;
        $this->type = $type;
        $this->options = $options;
    }

    /**
     * Execute the job.
     *
     * @param Type $type
     * @return Question
     * @todo Implement Repository
     * @todo change the is_string part to a better and cleaner way of doing it
     */
    public function handle(Type $type, Option $option)
    {

        /**
         * Check if Type is initialized otherwise init it
         */
        if (!$this->type instanceof Model)
            $this->type = $type->where(((int)$this->type ? 'id' : 'name'), $this->type)->firstOrFail();

        /**
         * Create Question
         *
         * @var Question $question
         */
        $this->question = $this->type->questions()->create($this->fields);

        /**
         * Check if Type is radio/checkbox/select
         * sync options
         */
        $this->doOptionUpdate($option);

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($this->question));

        return $this->question;

    }


}
