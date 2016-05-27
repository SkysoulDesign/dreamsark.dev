<?php

namespace DreamsArk\Http\Controllers\User\Bag;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use DreamsArk\Http\Requests\Bag\CoinWithdrawRequest;
use DreamsArk\Jobs\Payment\CreateTransactionJob;
use DreamsArk\Jobs\Payment\GeneratePaymentFormJob;
use DreamsArk\Jobs\User\Bag\DeductCoinJob;

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
        $transactionData = dispatch(new CreateTransactionJob($request));
        $getForm = dispatch(new GeneratePaymentFormJob($transactionData));
        return response($getForm);
        //die($getForm);

        /* handled in PaymentController
         * $command = new PurchaseCoinJob($request->user(), $request->get('amount'));
        dispatch($command);
        return redirect()->back();
        */
    }

    /**
     * @param CoinWithdrawRequest $request
     * @return mixed
     */
    public function withdrawCoins(CoinWithdrawRequest $request)
    {
        /**
         * @todo: need to create event for refund coin to User as money
         */
        dispatch(new DeductCoinJob($request->user()->id, $request->get('withdraw_amount')));

        return redirect()->back()->withSuccess('Coins withdrawn to your account successfully');
    }

}
