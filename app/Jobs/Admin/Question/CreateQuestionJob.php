<?php

namespace DreamsArk\Jobs\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Jobs\Admin\Question\Option\CreateOptionJob;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
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

        $original = array_get($this->fields, 'options', []);

        /** @var Collection $options */
        $options = $option->whereIn('name', $original)->get();
        $flattened = array_flatten($options->toArray());

        /**
         * For each new Key create a new Object
         */
        foreach (array_diff($original, $flattened) as $option) {
            $options->push(dispatch(new CreateOptionJob($option)));
        }

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
        $question->options()->sync($options->pluck('id')->toArray());

        /**
         * Announce QuestionWasCreated
         */
        event(new QuestionWasCreated($question));

        return $question;

    }

}
