<?php

namespace DreamsArk\Http\Controllers\User\Bag;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use DreamsArk\Http\Requests\Bag\CoinWithdrawRequest;
use DreamsArk\Jobs\Payment\CreateTransactionJob;
use DreamsArk\Jobs\Payment\Forms\GeneratePaymentFormJob;
use DreamsArk\Jobs\Payment\Forms\GenerateWithdrawFormJob;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Payment;
use SkysoulDesign\Payment\PaymentGateway;

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
     * @param Payment $payment
     * @return \Illuminate\Http\Response
     * @internal param PaymentGateway $gateway
     */
    public function store(CoinCreation $request, Payment $payment)
    {

        $transaction = dispatch(new CreateTransactionJob(
            $request->user(),
            $request->input('amount'),
            $request->input('payment_method')
        ));

//        $gateway = $gateway->init($transaction);

//        dd(app('ReportAggregator'));

        $payment->forTransaction($transaction);
        $payment->getResponse();

        dd($payment);

//        dd(app('payment.drivers.alipay'));

//        $getForm = dispatch(new GeneratePaymentFormJob($transaction));
//        
//        dd($getForm);
        //$transaction->getPaymentResponse()
        return $gateway->getPaymentResponse();

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
