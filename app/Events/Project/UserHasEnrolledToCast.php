<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Cast;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class UserHasEnrolledToCast extends Event
{
    use SerializesModels;

    /**
     * @var \DreamsArk\Models\Project\Expenditures\Cast
     */
    public $cast;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param \DreamsArk\Models\Project\Expenditures\Cast $cast
     */
    public function __construct(User $user, \DreamsArk\Models\Project\Expenditures\Cast $cast)
    {
        $this->cast = $cast;
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
