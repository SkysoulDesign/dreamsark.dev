<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Admin\Question\Option\CreateOptionJob;
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
     * @param Option $option
     * @todo Implement Repository
     * @todo change the is_string part to a better and cleaner way of doing it
     * @return Question
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
        $question = $this->type->questions()->create($this->fields);

        /**
         * Check if Type is radio/checkbox/select
         * sync options
         */
        if (in_array($this->type->getAttribute('name'), ['radio', 'checkbox', 'select'])) {

            /**
             * Get Final Options
             */
            $options = $this->getOptions($option);

            /**
             * Sync Options
             */
            $question->options()->sync($options->pluck('id')->toArray());

        }

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($question));

        return $question;

    }

    /**
     * Diff the Request Options from the Options in database
     *
     * @param Option $option
     * @return Collection
     */
    private function getOptions(Option $option)
    {

        $original = array_get($this->fields, 'options', []);

        /** @var Collection $options */
        $options = $option->whereIn('name', $original)->get(['id', 'name']);

        /**
         * For each new Key create a new Object
         */
        foreach (array_diff($original, $options->pluck('name')->toArray()) as $option) {
            $options->push(dispatch(new CreateOptionJob($option)));
        }

        return $options;

    }

}
