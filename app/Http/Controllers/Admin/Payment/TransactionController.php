<?php

namespace DreamsArk\Http\Controllers\Admin\Payment;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Repositories\Payment\TransactionRepository;

class TransactionController extends Controller
{
    private $transaction;

    public function __construct(TransactionRepository $transaction)
    {
        $this->transaction = $transaction;
    }

    public function getPurchaseList()
    {
        $purchases = $this->transaction->purchases();

        return view('admin.payment.transaction.purchases-list', compact('purchases'));
    }

    public function getWithdrawList()
    {
        $withdrawals = $this->transaction->withdrawals();

        return view('admin.payment.transaction.withdraw-list', compact('withdrawals'));
    }

}
