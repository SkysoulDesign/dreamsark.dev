<?php

namespace DreamsArk\Events\Admin\Profile;

use DreamsArk\Events\Event;
use DreamsArk\Models\Master\Profile;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProfileWasCreated
 *
 * @package DreamsArk\Events\Admin\Profile
 */
class ProfileWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Profile
     */
    public $profile;

    /**
     * Create a new event instance.
     *
     * @param Profile $profile
     */
    public function __construct(Profile $profile)
    {
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
