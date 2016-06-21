<?php

namespace DreamsArk\Listeners\User\Payment;

use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Jobs\User\Bag\DeductCoinJob;

/**
 * Class DeductCoinsFromUser
 *
 * @package DreamsArk\Listeners\User\Payment
 */
class DeductCoinsFromUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PaymentWasConfirmed $event
     * @return void
     */
    public function handle(PaymentWasConfirmed $event)
    {
        if ($event->transaction->type == 'withdraw') {
            /**
             * Deduct Coins from User
             */
            dispatch(new DeductCoinJob(
                    $event->transaction->user,
                    $event->transaction->payment->getPrice()
                )
            );
        }
    }
}
