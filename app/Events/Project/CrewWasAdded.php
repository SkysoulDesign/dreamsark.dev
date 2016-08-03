<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Project;
use Illuminate\Queue\SerializesModels;

/**
 * Class CrewWasAdded
 *
 * @package DreamsArk\Events\Project
 */
class CrewWasAdded extends Event
{
    use SerializesModels;

    /**
     * @var Crew
     */
    private $crew;

    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new event instance.
     *
     * @param Crew $crew
     * @param Project $project
     */
    public function __construct(Crew $crew, Project $project)
    {
        $this->crew = $crew;
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
