<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

/**
 * Class UpdateOrCreateTransactionMessageJob
 *
 * @package DreamsArk\Jobs\Payment
 */
class UpdateOrCreateTransactionMessageJob extends Job
{
    /**
     * @var Transaction
     */
    private $transaction;

    /**
     * @var array
     */
    private $data;

    /**
     * Create a new job instance.
     *
     * @param Transaction $transaction
     * @param array $data
     */
    public function __construct(Transaction $transaction, array $data)
    {
        $this->transaction = $transaction;
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        /**
         * Update Or Create the message object
         */
        $this->transaction->message()->updateOrCreate(
            ['transaction_id' => $this->transaction->getKey()], $this->data
        );
    }
}
