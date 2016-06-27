<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;
use DreamsArk\Models\User\User;

/**
 * Class CreateTransactionJob
 *
 * @package DreamsArk\Jobs\Payment
 */
class CreateTransactionJob extends Job
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var int
     */
    private $amount;

    /**
     * @var string
     */
    private $method;
    /**
     * @var string
     */
    private $type;

    /**
     * Create a new job instance.
     *
     * @param User $user
     * @param float $amount
     * @param string $method
     * @param string $type
     */
    public function __construct(User $user, float $amount, string $method, string $type)
    {
        $this->user = $user;
        $this->amount = $amount;
        $this->method = $method;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @param Transaction $transaction
     * @return Transaction
     */
    public function handle(Transaction $transaction) : Transaction
    {
        /**
         * Associate User with transaction
         */
        $transaction->user()->associate($this->user);

        /**
         * Manually set those values to avoid mass-assignment
         */
        $transaction->setAttribute('unique_no', $this->generateUniqueTransactionID());
        $transaction->setAttribute('amount', $this->amount);
        $transaction->setAttribute('method', $this->method);
        $transaction->setAttribute('type', $this->type);

        $transaction->save();

        return $transaction;

    }

    /**
     * @return string
     */
    public function generateUniqueTransactionID() : string
    {
        return md5(uniqid($this->user->id, true));
    }

}
