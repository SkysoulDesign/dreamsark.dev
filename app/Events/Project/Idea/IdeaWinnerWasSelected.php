<?php

namespace DreamsArk\Events\Project\Idea;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Idea;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class IdeaWinnerWasSelected extends Event
{
    use SerializesModels;

    /**
     * @var Idea
     */
    public $idea;

    /**
     * Create a new event instance.
     *
     * @param Idea $idea
     */
    public function __construct(\DreamsArk\Models\Project\Stages\Idea $idea)
    {
        $this->idea = $idea;
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
