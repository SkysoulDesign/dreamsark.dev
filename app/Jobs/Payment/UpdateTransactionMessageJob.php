<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

class UpdateTransactionMessageJob extends Job
{
    /**
     * @var
     */
    private $messageArr;
    /**
     * @var Transaction
     */
    private $transaction;

    /**
     * Create a new job instance.
     *
     * @param Transaction $transaction
     * @param $messageArr
     */
    public function __construct(Transaction $transaction, $messageArr)
    {
        $this->transaction = $transaction;
        $this->messageArr = $messageArr;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        if (!isset($this->transaction->messages->id))
            $this->transaction->messages()->create($this->messageArr);
        else
            $this->transaction->messages()->update($this->messageArr);
    }
}
