<?php

namespace DreamsArk\Events\User\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Draft;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class DraftWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Draft
     */
    public $draft;

    /**
     * Create a new event instance.
     *
     * @param Draft $draft
     */
    public function __construct(\DreamsArk\Models\Project\Stages\Draft $draft)
    {
        $this->draft = $draft;
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
