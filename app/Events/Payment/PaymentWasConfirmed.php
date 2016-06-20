<?php

namespace DreamsArk\Events\Payment;

use DreamsArk\Events\Event;
use DreamsArk\Models\Payment\Transaction;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

/**
 * Class PaymentWasConfirmed
 *
 * @package DreamsArk\Events
 */
class PaymentWasConfirmed extends Event implements ShouldBroadcastNow
{

    use SerializesModels;

    /**
     * @var Transaction
     */
    public $transaction;

    /**
     * Create a new event instance.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['payment'];
    }
}
