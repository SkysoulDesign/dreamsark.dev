<?php

namespace DreamsArk\Events\Session;

use DreamsArk\Events\Event;
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
     * Create a new event instance.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
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
