<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProjectWasBacked
 *
 * @package DreamsArk\Events\Project
 */
class ProjectWasBacked extends Event
{

    use SerializesModels;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var User
     */
    public $user;

    /**
     * @var int
     */
    public $amount;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param User $user
     * @param $amount
     */
    public function __construct(Project $project, User $user, int $amount)
    {
        $this->project = $project;
        $this->user = $user;
        $this->amount = $amount;
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
