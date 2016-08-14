<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProjectWasCompleted
 *
 * @package DreamsArk\Events\Project
 */
class ProjectWasCompleted extends Event
{
    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new event instance.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
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
