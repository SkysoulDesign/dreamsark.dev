<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Project;
use Illuminate\Queue\SerializesModels;

class CrewWasAdded extends Event
{
    use SerializesModels;

    /**
     * @var \DreamsArk\Models\Project\Expenditures\Crew
     */
    private $crew;

    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Crew $crew
     * @param Project $project
     */
    public function __construct(\DreamsArk\Models\Project\Expenditures\Crew $crew, Project $project)
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
