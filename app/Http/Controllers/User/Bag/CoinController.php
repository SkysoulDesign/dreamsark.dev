<?php

namespace DreamsArk\Http\Controllers\User\Bag;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use DreamsArk\Http\Requests\Bag\CoinWithdrawRequest;
use DreamsArk\Jobs\Payment\CreateTransactionJob;
use DreamsArk\Jobs\Payment\Forms\GeneratePaymentFormJob;
use DreamsArk\Jobs\Payment\Forms\GenerateWithdrawFormJob;

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
        $getFormData = dispatch(new GeneratePaymentFormJob($transactionData));
        if (is_null($getFormData))
            return redirect()->back()->withErrors(trans('payment.invalid-method-selected'));
        else if ($getFormData == 'fail')
            return redirect()->back()->withErrors(trans('payment.error-occurred-unable-to-process'));

        if ($request->get('payment_method') == 'wechat') {
            $request->session()->put('wechatData', $getFormData);
            return redirect()->route('payment.wechat.scan_code');
        }


        return response($getFormData);
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
         * @todo process initiated; need to complete and do DeductCoinJob in PaymentController's status/notify actions
         */
        $transactionData = dispatch(new CreateTransactionJob($request, 'withdraw'));
        $getForm = dispatch(new GenerateWithdrawFormJob($transactionData));
        if (is_null($getForm))
            return redirect()->back()->withErrors(trans('payment.invalid-method-selected'));

        return redirect()->back()->withErrors(trans('payment.withdraw-event-not-available'));
//        return response($getForm);

        /*
         * dispatch(new DeductCoinJob($request->user()->id, $request->get('amount')));

        return redirect()->back()->withSuccess('Coins withdrawn to your account successfully');
        */
    }

}
