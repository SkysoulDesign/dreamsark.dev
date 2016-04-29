<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class ProjectWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var User
     */
    public $user;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var array
     */
    public $fields;

    /**
     * @var array
     */
    public $rewards;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param Project $project
     * @param Collection $fields
     * @param array $rewards
     */
    public function __construct(User $user, Project $project, Collection $fields, array $rewards)
    {
        $this->user = $user;
        $this->project = $project;
        $this->fields = $fields;
        $this->rewards = $rewards;
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
