<?php

namespace DreamsArk\Events\Project\Fund;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class EnrollerReceivedVote extends Event
{
    use SerializesModels;
    /**
     * @var Enroller
     */
    public $enroller;
    /**
     * @var User
     */
    public $user;
    /**
     * @var
     */
    public $amount;

    /**
     * Create a new event instance.
     *
     * @param Enroller $enroller
     * @param User $user
     * @param $amount
     */
    public function __construct(Enroller $enroller, User $user, $amount)
    {
        $this->enroller = $enroller;
        $this->user = $user;
        $this->amount = $amount;
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
