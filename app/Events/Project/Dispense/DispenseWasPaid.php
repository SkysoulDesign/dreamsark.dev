<?php

namespace DreamsArk\Events\Project\Dispense;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Dispense;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class DispenseWasPaid
 *
 * @package DreamsArk\Events\Project\Dispense
 */
class DispenseWasPaid extends Event
{

    use SerializesModels;

    /**
     * @var Dispense
     */
    public $dispense;

    /**
     * @var int
     */
    public $amount;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Dispense $dispense
     */
    public function __construct(Dispense $dispense)
    {
        $this->dispense = $dispense;
        $this->amount = $dispense->getAttribute('paid');
        $this->user = $dispense->getAttribute('crew')->enroller->user;
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
