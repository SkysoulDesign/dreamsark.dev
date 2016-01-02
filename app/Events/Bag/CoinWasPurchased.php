<?php

namespace DreamsArk\Events\Bag;

use DreamsArk\Events\Event;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class CoinWasPurchased extends Event
{
    use SerializesModels;

    /**
     * @var
     */
    public $amount;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param $amount
     */
    public function __construct(User $user, $amount)
    {
        $this->amount = $amount;
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
