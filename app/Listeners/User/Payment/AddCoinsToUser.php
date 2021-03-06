<?php

namespace DreamsArk\Listeners\User\Payment;

use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Jobs\User\Bag\PurchaseCoinJob;

/**
 * Class AddCoinsToUser
 *
 * @package DreamsArk\Listeners\User\Payment
 */
class AddCoinsToUser
{
    /**
     * Handle the event.
     *
     * @param PaymentWasConfirmed $event
     */
    public function handle(PaymentWasConfirmed $event)
    {
        if ($event->transaction->type == 'pay') {
            /**
             * Give Coins to User
             */
            dispatch(new PurchaseCoinJob(
                    $event->transaction->user,
                    $event->transaction->payment->getPrice()
//                $event->transaction->getAttribute('amount')
                )
            );
        }
    }
}
