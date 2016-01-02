<?php

namespace DreamsArk\Events\Translation;

use DreamsArk\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Collection;

class GroupsWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Collection
     */
    public $groups;

    /**
     * Create a new event instance.
     *
     * @param Collection $groups
     */
    public function __construct(Collection $groups)
    {
        $this->groups = $groups;
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
