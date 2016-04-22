<?php

namespace DreamsArk\Events\User\Profile;

use DreamsArk\Events\Event;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class UserProfileWasUpdated
 *
 * @package DreamsArk\Events\User\Profile
 */
class UserProfileWasUpdated extends Event
{
    use SerializesModels;
    /**
     * @var User
     */
    private $user;
    /**
     * @var Profile
     */
    private $profile;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param Profile $profile
     */
    public function __construct(User $user, Profile $profile)
    {
        $this->user = $user;
        $this->profile = $profile;
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
