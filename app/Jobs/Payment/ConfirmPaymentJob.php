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
class ConfirmPaymentJob extends Job
{
    /**
     * @var Transaction
     */
    private $transaction;

    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     *
     * @param Transaction $transaction
     * @param array $request
     */
    public function __construct(Transaction $transaction, array $request)
    {
        $this->transaction = $transaction;
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->transaction->setAttribute('invoice_no', $this->request['invoice_no'] ?? null);
        $this->transaction->setAttribute('is_payment_done', true);

        $this->transaction->save();

        /**
         * Announce Payment was Confirmed
         */
        event(new PaymentWasConfirmed($this->transaction));

    }
}
