<?php

namespace DreamsArk\Events\Session;

use DreamsArk\Events\Event;
use DreamsArk\Models\User\Role;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class UserWasUpdated extends Event
{
    use SerializesModels;

    /**
     * @var User
     */
    public $user;

    /**
     * @var Role|int|string
     */
    public $role;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param Role|int|string $role
     */
    public function __construct(User $user, $role)
    {
        $this->user = $user;
        $this->role = $role;
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
