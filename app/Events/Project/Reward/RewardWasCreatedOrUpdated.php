<?php

namespace DreamsArk\Events\Project\Reward;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Reward;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class RewardWasCreated
 *
 * @package DreamsArk\Events\Project
 */
class RewardWasCreatedOrUpdated extends Event
{

    use SerializesModels;

    /**
     * @var Reward
     */
    public $reward;

    /**
     * @var User
     */
    public $user;

    /**
     * @var int
     */
    public $amount;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Reward $reward
     * @param \DreamsArk\Models\User\User $user
     */
    public function __construct(Reward $reward, User $user)
    {
        $this->reward = $reward;
        $this->amount = $reward->getAttribute('amount');
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
