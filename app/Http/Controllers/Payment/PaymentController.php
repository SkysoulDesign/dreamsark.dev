<?php

namespace DreamsArk\Http\Controllers\Payment;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\Payment\UpdateTransactionJob;
use DreamsArk\Jobs\User\Bag\PurchaseCoinJob;
use DreamsArk\Models\Payment\Transaction;
use Illuminate\Http\Request;
use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class PaymentController
 *
 * @package DreamsArk\Http\Controllers\Payment
 */
class PaymentController extends Controller
{
    protected $defaultRoute = 'payment.status';

    /**
     * @param Request $request
     * @return
     */
    public function paymentStatus(Request $request)
    {
        return view('payment.status');
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function alipayStatus(Request $request)
    {
        // SAMPLE URL: http://dreamsark.dev/payment/alipay/status?is_success=T&sign_type=&sign=&trade_status=TRADE_FINISHED&trade_no=&out_trade_no=
        $paymentResult = PaymentGateway::alipayNotify()->verifyReturn();
        if (!$paymentResult)
            return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment.no-response-received'));

        $trade_status = $request->get('trade_status');
        if ($trade_status == 'TRADE_FINISHED' || $trade_status == 'TRADE_SUCCESS') {
            return $this->triggerAddCoinJob($request);
        } else {
            return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment.trade-status') . ' ' . $trade_status);
        }

    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function alipayNotifications(Request $request)
    {
        // SAMPLE URL: http://dreamsark.dev/payment/alipay/status?is_success=T&sign_type=&sign=&trade_status=TRADE_FINISHED&trade_no=&out_trade_no=
        $paymentResult = PaymentGateway::alipayNotify()->verifyNotify();

        $responseText = "fail";
        if ($paymentResult) {
            $trade_status = $request->get('trade_status');
            if ($trade_status == 'TRADE_FINISHED' || $trade_status == 'TRADE_SUCCESS') {
                $responseText = $this->triggerAddCoinJob($request, 'notify');
            }
        }

        return response($responseText);
    }

    protected function triggerAddCoinJob($request, $event = '')
    {
        $out_trade_no = $request->get('out_trade_no');
        $trade_no = $request->get('trade_no');
        /**
         * TODO: need to get data from DB through out_trade_no and process addCoinJob using params stored in new Target table for Transactions
         * get user_id & amount w.r.t to out_trade_no and process AddCoin event
         */
        $transaction = Transaction::where('unique_no', $out_trade_no)->where('is_canceled', 0)->get();
        if ($transaction->isEmpty()) {
            if ($event == 'notify')
                return 'fail';
            else
                return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment.no-transaction-match'));
        }

        if (!$transaction[0]->is_payment_done) {
//            dd($transaction[0]->user);
            dispatch(new UpdateTransactionJob(
                $transaction[0],
                array_merge($request->all(), ['invoice_no' => $trade_no, 'response' => $request->getQueryString()]
                )));

            $command = new PurchaseCoinJob($transaction[0]->user, $transaction[0]->amount);
            dispatch($command);

            if ($event == 'notify')
                return 'success';
            else
                return redirect()->route('payment.status', 'success')->withSuccess(trans('payment.success'));
        } else {
            if ($event == 'notify')
                return 'success';
            else
                return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment.payment-already-done'));
        }
    }
}
