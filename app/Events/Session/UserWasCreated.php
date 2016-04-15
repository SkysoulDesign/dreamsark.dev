<?php

namespace DreamsArk\Events\Session;

use DreamsArk\Events\Event;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class UserWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var User
     */
    public $user;

    /**
     * @var
     */
    public $role;
    /**
     * @var
     */
    public $event_type;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param string $role
     * @param $event_type
     */
    public function __construct(User $user, $role, $event_type)
    {
        $this->user = $user;
        $this->role = $role;
        $this->event_type = $event_type;
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
