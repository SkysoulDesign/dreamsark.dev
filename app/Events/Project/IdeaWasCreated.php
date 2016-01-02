<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Idea;
use Illuminate\Queue\SerializesModels;

class IdeaWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Idea
     */
    public $model;

    /**
     * @var string
     */
    public $voting_date;

    /**
     * Create a new event instance.
     *
     * @param Idea $idea
     * @param string $voting_date
     */
    public function __construct(Idea $idea, $voting_date)
    {
        $this->model = $idea;
        $this->voting_date = $voting_date;
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
