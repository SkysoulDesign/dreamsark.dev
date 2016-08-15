<?php

namespace DreamsArk\Events\Admin\Question;

use DreamsArk\Events\Event;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class QuestionWasCreated
 *
 * @package DreamsArk\Events\Admin\Question
 */
class QuestionWasCreated extends Event
{
    /**
     * @var Question
     */
    public $question;

    /**
     * @var Type
     */
    public $type;

    /**
     * @var array
     */
    public $options;

    /**
     * Create a new event instance.
     *
     * @param Question $question
     * @param Type $type
     * @param array $options
     */
    public function __construct(Question $question, Type $type, array $options)
    {
        $this->question = $question;
        $this->type = $type;
        $this->options = $options;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
    
}
