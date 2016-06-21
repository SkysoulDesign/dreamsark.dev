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
     * @var bool
     */
    private $cancelTransaction;

    /**
     * Create a new job instance.
     *
     * @param Transaction $transaction
     * @param array $request
     * @param bool $cancelTransaction
     */
    public function __construct(Transaction $transaction, array $request, bool $cancelTransaction = false)
    {
        $this->transaction = $transaction;
        $this->request = $request;
        $this->cancelTransaction = $cancelTransaction;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->transaction->setAttribute('invoice_no', $this->request['invoice_no']);
        if ($this->cancelTransaction) {
            $this->transaction->setAttribute('paid', false);
            $this->transaction->setAttribute('is_canceled', true);
        } else
            $this->transaction->setAttribute('paid', true);

        $this->transaction->save();

        dispatch(new UpdateTransactionMessageJob($this->transaction, ['response' => json_encode($this->request)]));

        /**
         * Announce Payment was Confirmed
         */
        event(new PaymentWasConfirmed($this->transaction));
    }
}
