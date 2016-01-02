<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class UserHasEnrolledToCrew extends Event
{
    use SerializesModels;

    /**
     * @var \DreamsArk\Models\Project\Expenditures\Crew
     */
    public $crew;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param \DreamsArk\Models\Project\Expenditures\Crew $crew
     */
    public function __construct(User $user, Crew $crew)
    {
        $this->crew = $crew;
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
