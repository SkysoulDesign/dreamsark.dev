<?php

namespace DreamsArk\Http\Controllers\User\Bag;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use DreamsArk\Http\Requests\Bag\CoinWithdrawRequest;
use DreamsArk\Jobs\Payment\CreateTransactionJob;

/**
 * Class CoinController
 *
 * @package DreamsArk\Http\Controllers\User\Bag
 */
class CoinController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('user.payment.coin.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CoinCreation $request
     * @return \Illuminate\Http\Response
     */
    public function store(CoinCreation $request)
    {

        $transaction = dispatch(new CreateTransactionJob(
            $request->user(),
            $request->input('amount'),
            $request->input('payment_method'),
            'pay'
        ));

        return response()->json($transaction->payment->getResponse());

    }

    /**
     * @param CoinWithdrawRequest $request
     * @return mixed
     */
    public function withdrawCoins(CoinWithdrawRequest $request)
    {
        /**
         * @todo: need to create event for refund coin to User as money
         * @todo process initiated; need to complete and do DeductCoinJob in PaymentController's status/notify actions
         */
        $transaction = dispatch(new CreateTransactionJob(
            $request->user(),
            $request->input('batch_fee'),
            $request->input('payment_method'),
            'withdraw'
        ));

        return response()->json($transaction->payment->getWithdrawResponse($request->all()));

    }

}
