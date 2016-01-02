<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Cast;
use DreamsArk\Models\Project\Project;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CastWasAdded extends Event
{
    use SerializesModels;

    /**
     * @var Cast
     */
    private $cast;

    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Cast $cast
     * @param Project $project
     */
    public function __construct(Cast $cast, Project $project)
    {
        $this->cast = $cast;
        $this->project = $project;
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
