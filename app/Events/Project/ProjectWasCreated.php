<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProjectWasCreated
 *
 * @package DreamsArk\Events\Project
 */
class ProjectWasCreated extends Event
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
     * @var array
     */
    public $fields;

    /**
     * @var int
     */
    public $amount;

    /**
     * @var string
     */
    public $stage;

    /**
     * Create a new event instance.
     *
     * @param Project $project
     * @param User $user
     * @param array $fields
     * @param int $amount
     * @param string $stage
     */
    public function __construct(Project $project, User $user, array $fields, int $amount, string $stage)
    {
        $this->project = $project;
        $this->user = $user;
        $this->fields = $fields;
        $this->amount = $amount;
        $this->stage = $stage;
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
