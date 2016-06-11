<?php

namespace DreamsArk\Listeners\User\Payment;

use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Jobs\User\Bag\PurchaseCoinJob;
use DreamsArk\Models\Payment\Transaction;

/**
 * Class AddCoinsToUser
 *
 * @package DreamsArk\Listeners\User\Payment
 */
class AddCoinsToUser
{

    /**
     * @var AuthManager
     */
    private $transaction;

    /**
     * Create the event listener.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->auth = $transaction;
    }

    /**
     * Handle the event.
     *
     * @param PaymentWasConfirmed $event
     */
    public function handle(PaymentWasConfirmed $event)
    {
        /**
         * Give Coins to User
         */
        dispatch(new PurchaseCoinJob(
                $event->transaction->user,
                $event->transaction->getAttribute('amount'))
        );
    }
}
