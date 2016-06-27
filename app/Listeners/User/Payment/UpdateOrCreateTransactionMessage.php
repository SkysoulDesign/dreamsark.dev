<?php

namespace DreamsArk\Listeners\User\Payment;

use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Jobs\Payment\UpdateOrCreateTransactionMessageJob;

/**
 * Class UpdateOrCreateTransactionMessage
 *
 * @package DreamsArk\Listeners\User\Payment
 */
class UpdateOrCreateTransactionMessage
{
    /**
     * Handle the event.
     *
     * @param PaymentWasConfirmed $event
     */
    public function handle(PaymentWasConfirmed $event)
    {
        dispatch(new UpdateOrCreateTransactionMessageJob(
            $event->transaction,
            [
                'response' => $event->response,
            ]
        ));
    }
}
