<?php

namespace DreamsArk\Events\Admin\Question;

use DreamsArk\Events\Event;
use DreamsArk\Models\Master\Question;
use Illuminate\Queue\SerializesModels;

class QuestionWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Question
     */
    public $question;

    /**
     * Create a new event instance.
     *
     * @param Question $question
     */
    public function __construct(Question $question)
    {
        $this->question = $question;
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
