<?php

namespace DreamsArk\Events\User\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProjectWasUpdated
 *
 * @package DreamsArk\Events\User\Project
 */
class ProjectWasUpdated extends Event
{

    use SerializesModels;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var \DreamsArk\Events\User\Project\Vote
     */
    public $vote;

    /**
     * Create a new event instance.
     *
     * @param Project $project
     * @param Vote $vote
     */
    public function __construct(Project $project, Vote $vote)
    {
        $this->project = $project;
        $this->vote = $vote;
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
