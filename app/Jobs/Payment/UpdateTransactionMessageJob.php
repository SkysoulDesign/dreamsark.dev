<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

class UpdateTransactionMessageJob extends Job
{
    /**
     * @var
     */
    private $transaction_id;
    /**
     * @var
     */
    private $messageArr;

    /**
     * Create a new job instance.
     *
     * @param $transaction_id
     * @param $messageArr
     */
    public function __construct($transaction_id, $messageArr)
    {
        $this->transaction_id = $transaction_id;
        $this->messageArr = $messageArr;
    }

    /**
     * Execute the job.
     *
     * @param Transaction $transaction
     */
    public function handle(Transaction $transaction)
    {
        $transaction = $transaction->find($this->transaction_id);
        if (!isset($transaction->messages->id))
            $transaction->messages()->create($this->messageArr);
        else
            $transaction->messages()->update($this->messageArr);
    }
}
