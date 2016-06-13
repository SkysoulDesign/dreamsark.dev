<?php

namespace DreamsArk\Http\Controllers\Admin\Payment;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Repositories\Payment\TransactionRepository;

/**
 * Class TransactionController
 *
 * @package DreamsArk\Http\Controllers\Admin\Payment
 */
class TransactionController extends Controller
{

    /**
     * @param TransactionRepository $transaction
     * @return mixed
     */
    public function getPurchaseList(TransactionRepository $transaction)
    {
        $purchases = $transaction->purchases();

        return view('admin.payment.transaction.purchases-list', compact('purchases'));
    }

    /**
     * @param TransactionRepository $transaction
     * @return mixed
     */
    public function getWithdrawList(TransactionRepository $transaction)
    {
        $withdrawals = $transaction->withdrawals();

        return view('admin.payment.transaction.withdraw-list', compact('withdrawals'));
    }

}
