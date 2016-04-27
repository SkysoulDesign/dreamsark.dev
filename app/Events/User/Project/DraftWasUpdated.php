<?php

namespace DreamsArk\Events\User\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Draft;
use Illuminate\Queue\SerializesModels;

class DraftWasUpdated extends Event
{
    use SerializesModels;
    /**
     * @var Draft
     */
    private $draft;

    /**
     * Create a new event instance.
     *
     * @param Draft $draft
     */
    public function __construct(Draft $draft)
    {
        //
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
