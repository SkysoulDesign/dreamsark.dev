<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Events\Payment\PaymentWasConfirmed;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

/**
 * Class UpdateTransactionJob
 *
 * @package DreamsArk\Jobs\Payment
 */
class CancelPaymentJob extends Job
{
    /**
     * @var Transaction
     */
    private $transaction;

    /**
     * @var array
     */
    private $response;
    
    /**
     * Create a new job instance.
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
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->transaction->setAttribute('invoice_no', $this->response['invoice_no']);
        $this->transaction->setAttribute('paid', false);
        $this->transaction->setAttribute('is_canceled', true);
        $this->transaction->save();

        /**
         * Announce Payment was Confirmed
         */
        event(new PaymentWasCanceled($this->transaction, $this->response));
    }
}
