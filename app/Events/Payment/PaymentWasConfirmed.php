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
     * @var array
     */
    public $response;

    /**
     * Create a new event instance.
     *
     * @param Transaction $transaction
     * @param array $response
     */
    public function __construct(Transaction $transaction, array $response)
    {
        $this->transaction = $transaction;
        $this->response = $response;
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
