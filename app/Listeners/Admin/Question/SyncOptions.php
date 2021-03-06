<?php

namespace DreamsArk\Listeners\Admin\Question;

use DreamsArk\Events\Admin\Question\QuestionWasCreated;
use DreamsArk\Events\Admin\Question\QuestionWasUpdated;
use DreamsArk\Events\Event;
use DreamsArk\Jobs\Admin\Question\Option\CreateOptionJob;
use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class SyncOptions
 *
 * @package DreamsArk\Listeners\Admin\Question
 */
class SyncOptions
{
    /**
     * @var Option
     */
    private $option;

    /**
     * @var Type
     */
    private $type;

    /**
     * Create the event listener.
     *
     * @param Option $option
     * @param Type $type
     * @todo Implement Repository
     */
    public function __construct(Option $option, Type $type)
    {
        $this->option = $option;
        $this->type = $type;
    }

    /**
     * Handle the event.
     *
     * @param QuestionWasCreated|QuestionWasUpdated|Event $event
     * @return void
     */
    public function handle(Event $event)
    {

        /**
         * If Type is one of those which requires Option
         */
        if (in_array($event->type->getAttribute('name'), ['radio', 'checkbox', 'select'])) {

            $database = $this->option->whereIn('name', $event->options)->get(['id', 'name']);

            /**
             * For each new Key create a new Object
             */
            foreach (array_diff($event->options, $database->pluck('name')->toArray()) as $option) {
                $database->push(dispatch(new CreateOptionJob($option)));
            }

            /**
             * Sync options to the model
             */
            $event->question->options()->sync($database->pluck('id')->toArray());

        } else {

            $event->question->options()->sync([]);

        }
    }
}
