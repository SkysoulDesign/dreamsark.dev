<?php

namespace DreamsArk\Jobs\Payment;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;

class CreateTransactionJob extends Job
{
    /**
     * @var Request
     */
    private $request;
    /**
     * @var
     */
    private $transactionType;

    /**
     * Create a new job instance.
     *
     * @param Request $request
     * @param $transactionType
     */
    public function __construct(Request $request = null, $transactionType = null)
    {
        $this->request = $request;
        $this->transactionType = $transactionType ? : 'pay';
    }

    /**
     * Execute the job.
     *
     * @param Transaction $transaction
     * @return array
     */
    public function handle(Transaction $transaction)
    {
        /**
         * TODO: need to create table for Transactions Maintenance and use Unique "out_trade_no" in External Payment Gateways
         * table should have user_id, amount fields
         */
        $userId = $this->request->user()->id;
        $out_trade_no = config('defaults.payment.prefix.'.$this->transactionType).md5(uniqid($userId, true));
        $fields = [
            'unique_no' => $out_trade_no, 'pay_method' => $this->request->get('payment_method'),
            'type' => $this->transactionType, 'user_id' => $userId, 'amount' => $this->request->get('amount')
        ];
        /** @var Transaction $transaction */
        $transaction = $transaction->create($fields);

        return [
            'unique_no' => $out_trade_no,
            'transaction_id' => $transaction->id,
            'user_id' => $transaction->user_id,
            'amount' => $transaction->amount,
            'pay_method' => $transaction->pay_method,
        ];
    }
}
