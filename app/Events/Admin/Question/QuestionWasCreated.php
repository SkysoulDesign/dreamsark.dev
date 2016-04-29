<?php

namespace DreamsArk\Events\Admin\Question;

use DreamsArk\Events\Event;
use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Master\Question\Type;
use Illuminate\Queue\SerializesModels;

/**
 * Class QuestionWasCreated
 *
 * @package DreamsArk\Events\Admin\Question
 */
class QuestionWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Question
     */
    public $question;

    /**
     * @var Type|int
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
     * @param Type|int $type
     * @param array $options
     */
    public function __construct(Question $question, $type, array $options)
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
