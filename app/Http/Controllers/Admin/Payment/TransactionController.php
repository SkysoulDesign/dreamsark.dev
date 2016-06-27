<?php

namespace DreamsArk\Http\Controllers\Admin\Payment;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\Payment\CancelPaymentJob;
use DreamsArk\Models\Payment\Transaction;
use DreamsArk\Repositories\Payment\TransactionRepository;
use Illuminate\Http\Request;

/**
 * Class TransactionController
 *
 * @package DreamsArk\Http\Controllers\Admin\Payment
 */
class TransactionController extends Controller
{

    /**
     * @param Request $request
     * @param TransactionRepository $transaction
     * @return mixed
     */
    public function getPurchaseList(Request $request, TransactionRepository $transaction)
    {
        $purchases = $transaction->purchases($request->trans_status ?: '');

        return view('admin.payment.transaction.purchases-list', compact('purchases'));
    }

    /**
     * @param Request $request
     * @param TransactionRepository $transaction
     * @return mixed
     */
    public function getWithdrawList(Request $request, TransactionRepository $transaction)
    {
        $withdrawals = $transaction->withdrawals($request->trans_status ?: '');

        return view('admin.payment.transaction.withdraw-list', compact('withdrawals'));
    }

    public function updateAndProcess(Request $request, Transaction $transaction)
    {
        $response = ['message' => trans('error-occurred-unable-to-process')];

        $transaction = $transaction->find($request->get('transaction_id'));
        if ($transaction) {
            $transaction->load('message');

            if ($request->new_status == 'cancel') {
                dispatch(new CancelPaymentJob(
                    $transaction, ['invoice_no' => 'NO_DATA']
                ));
                $response = ['message' => trans('payment.transaction-canceled-success')];
            } else if ($request->new_status == 'approve') {
                $response = [
                    'result'    => 'ok',
                    'data'      => $transaction->message->request,
                    'target'    => $transaction->payment->getConfig('gateway_url'),
                    'buildForm' => true
                ];
            }
        }

        return response()->json($response);
    }

}
