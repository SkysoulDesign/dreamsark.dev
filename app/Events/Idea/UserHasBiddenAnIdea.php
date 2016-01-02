<?php

namespace DreamsArk\Events\Idea;

use DreamsArk\Events\Event;
use DreamsArk\Models\Idea\Idea;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserHasBiddenAnIdea extends Event
{
    use SerializesModels;

    /**
     * @var Idea
     */
    public $idea;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param Idea $idea
     */
    public function __construct(User $user, Idea $idea)
    {
        $this->idea = $idea;
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
