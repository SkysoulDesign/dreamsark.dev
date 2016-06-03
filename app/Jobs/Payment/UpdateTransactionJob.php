<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

class UpdateTransactionJob extends Job
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
        $this->transaction->update([
            'invoice_no'      => $this->request['invoice_no'],
            'is_payment_done' => 1,
            'attempts'        => ($this->transaction->attempts + 1)
        ]);
        if (isset($this->request['response']))
            dispatch(new UpdateTransactionMessageJob($this->transaction->id, ['response' => $this->request['response']]));
    }
}
