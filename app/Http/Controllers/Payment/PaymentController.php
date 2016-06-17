<?php

namespace DreamsArk\Http\Controllers\Payment;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\Payment\ConfirmPaymentJob;
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


    /**
     * Status
     */
    public function index()
    {

    }

    /**
     * Payment Callback
     *
     * @param Request $request
     * @param Transaction $transaction
     * @return mixed
     */
    public function callback(Request $request, Transaction $transaction)
    {

        if (!$transaction->payment->verify($request->all()))
            return redirect()->route('user.purchase.index')->withErrors(trans('payment.trade-status-error'));

        //dispatch(new UpdateTransactionJob($transaction, $request->toArray()));

        // maybe do something if request verification fails, but in general
        // its bad if user payed and get redirected to this page and on our side we show
        // some error occur / payment couldn't be verified and he sees a negative
        // message, he might think the website cheat him and he probably will contact
        // immediately dreamsark.. saying: "i bought.. alipay said i bought but it shows i didn't"..
        if ($transaction->is_payment_done)
            return redirect()->route('user.purchase.index')->withSuccess('Your Purchase has been made');
        /**
         * Confirm Payment
         */
        $this->dispatch(new ConfirmPaymentJob($transaction, $request->toArray()));


        return redirect()->route('user.purchase.index')->withStatus('Your Purchase has been made');

    }

    /**
     * Url hit by the payment gateway
     *
     * @param Request $request
     * @param Transaction $transaction
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function notify_callback(Request $request, Transaction $transaction)
    {
//        \Log::info(file_get_contents("php://input"));
        \Log::info($request->all());

        if (!$transaction->payment->verify($request->all())) {
            return response('failed');
        }

        /**
         * Confirm Payment
         */
        $this->dispatch(new ConfirmPaymentJob($transaction, $request->toArray()));

        return response($transaction->payment->getConfirmationResponse());

    }

    protected $defaultRoute = 'payment . status';
    protected $responseData;

    /**
     * @param Request $request
     * @return
     */
    public function paymentStatus(Request $request)
    {
        return view('payment . status');
    }


    /**
     * @param Request $request
     * @return mixed
     */
    public function alipayNotifications(Request $request)
    {

        return response('');

        // SAMPLE URL: http://dreamsark.dev/payment/alipay/status?is_success=T&sign_type=&sign=&trade_status=TRADE_FINISHED&trade_no=&out_trade_no=
        $paymentResult = PaymentGateway::alipayNotify()->verifyNotify();

        $responseText = "fail";
        if ($paymentResult) {
            $trade_status = $request->get('trade_status');
            if ($trade_status == 'TRADE_FINISHED' || $trade_status == 'TRADE_SUCCESS') {
                $responseText = $this->triggerAddCoinJob($request, 'notify');
            } else {
                /**
                 * @TODO: can update failure event of Transaction
                 */
            }
        }

        return response($responseText);
    }

    /** UnionPay Methods */
    protected function prepareUPResponseData(Request $request)
    {
        /**
         *  [
         * version, encoding, certId, signature, signMethod, txnType, txnSubType, bizType, accessType, merId, orderId,
         * txnTime, txnAmt, currencyCode, reqReserved, queryId, respCode, respMsg
         * ]
         */
        $this->responseData = $request;
        $out_trade_no = $this->responseData->get('orderId');
        $trade_no = $this->responseData->get('queryId');
        $this->responseData->merge(compact('out_trade_no', 'trade_no'));
    }

    protected function validateUPResponse()
    {
        $status = 'fail';
        if ($this->responseData->get('respMsg', '') == 'success') {
            $respCode = $this->responseData->get("respCode");
            if ($respCode == "00")
                $status = 'success';
            else if ($respCode == "03" || $respCode == "04" || $respCode == "05")
                $status = 'process';
        }

        return $status;
    }

    public function uPStatus(Request $request)
    {
        if ($request->has('signature')) {
            $paymentResult = PaymentGateway::unionPayNotify()->validate($request->all());
            if (!$paymentResult)
                return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment . no - response - received'));

            $this->prepareUPResponseData($request);
            $upStatus = $this->validateUPResponse();
            if ($upStatus == 'success')
                return $this->triggerAddCoinJob($this->responseData);
            else if ($upStatus == 'process')
                return redirect()->route($this->defaultRoute, 'processing')->withSuccess(trans('payment . in - process'));
            else {
                /**
                 * @TODO: can update failure event of Transaction
                 */
            }
        }

        return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment . trade - status - error'));
    }

    public function uPNotifications(Request $request)
    {
        $responseText = 'NO_SIGNATURE';
        if ($request->has('signature')) {

            $paymentResult = PaymentGateway::unionPayNotify()->validate($request->all());
            if ($paymentResult) {
                $this->prepareUPResponseData($request);
                $upStatus = $this->validateUPResponse();
                if ($upStatus == 'success')
                    $responseText = $this->triggerAddCoinJob($this->responseData, 'notify');
                else if ($upStatus == 'process')
                    $responseText = $upStatus;
                else {
                    /**
                     * @TODO: can update failure event of Transaction
                     */
                    $responseText = 'PAYMENT_FAIL';
                }
            } else
                $responseText = 'DATA_INVALID';
        }

        return response($responseText);
    }

    public function uPOrderEnquiry(Request $request)
    {
        $responseText = 'not - valid';
        $requestParams = $request->all();
        if (empty($requestParams)) {
            $requestParams = ['out_trade_no' => rand(1, 10000), 'order_date' => date('YmdHis')];
        }

        $orderData = PaymentGateway::unionPayInstant()->orderQuery($requestParams);

        if (!empty($orderData)) {
            if ($orderData["respCode"] == "00") {
                if ($orderData["origRespCode"] == "00") {
                    //TODO
                    $responseText = "Trade success<br>\n";
                } else if ($orderData["origRespCode"] == "03" || $orderData["origRespCode"] == "04" || $orderData["origRespCode"] == "05") {
                    //Follow-up initiated transaction status query transaction transaction state
                    //TODO
                    $responseText = "Transaction processing, please query<br>\n";
                } else {
                    //Other response code failure processing
                    //TODO
                    $responseText = "Transaction Failed：" . $orderData["origRespMsg"] . "。<br>\n";
                }
            } else if ($orderData["respCode"] == "03"
                || $orderData["respCode"] == "04"
                || $orderData["respCode"] == "05"
            ) {
                //Follow-up initiated transaction status query transaction transaction state
                //TODO
                $responseText = "Processing timeout, please query<br>\n";
            } else {
                //Other response code failure processing
                //TODO
                $responseText = "Failed：" . $orderData["respMsg"] . "。<br>\n";
            }
        }

        return response($responseText);
    }

    protected function triggerAddCoinJob($request, $event = '')
    {
        $out_trade_no = $request->out_trade_no;
        $trade_no = $request->trade_no ?: '';
        /**
         * TODO: need to get data from DB through out_trade_no and process addCoinJob using params stored in new Target table for Transactions
         * get user_id & amount w.r.t to out_trade_no and process AddCoin event
         */
        $transaction = Transaction::where('unique_no', $out_trade_no)->where('is_canceled', 0)->get();
        if ($transaction->isEmpty()) {
            if ($event == 'notify')
                return 'fail';
            else
                return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment . no - transaction - match'));
        }

        if (!$transaction[0]->is_payment_done) {
//            dd($transaction[0]->user);
            $transactResponse = $request->getMethod() == 'POST' ? urldecode(http_build_query($request->all())) : $request->getQueryString();
            dispatch(new ConfirmPaymentJob(
                $transaction[0],
                array_merge($request->all(), ['invoice_no' => $trade_no, 'response' => $transactResponse]
                )));

            $command = new PurchaseCoinJob($transaction[0]->user, $transaction[0]->amount);
            dispatch($command);

            if ($event == 'notify')
                return 'success';
            else
                return redirect()->route('payment . status', 'success')->withSuccess(trans('payment . success'));
        } else {
            if ($event == 'notify')
                return 'success';
            else
                return redirect()->route($this->defaultRoute, 'error')->withErrors(trans('payment . payment - already - done'));
        }
    }
}
