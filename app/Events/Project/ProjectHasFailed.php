<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectHasFailed extends Event
{
    use SerializesModels;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var
     */
    public $amount;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Project $project
     * @param $user
     * @param $amount
     */
    public function __construct(Project $project, User $user, $amount)
    {
        $this->project = $project;
        $this->amount = $amount;
        $this->user = $user;
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
