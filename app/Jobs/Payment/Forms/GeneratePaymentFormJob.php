<?php

namespace DreamsArk\Jobs\Payment\Forms;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class GeneratePaymentFormJob
 *
 * @package DreamsArk\Jobs\Payment\Forms
 */
class GeneratePaymentFormJob extends Job
{
    /**
     * @var array
     */
    private $transaction;

    /**
     * Create a new job instance.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     *
     * @param Client $client
     * @return string
     */
    public function handle(Client $client)
    {

        $payment = new Payment($this->transaction);

//        $response = $client->request($payment->method, $payment->url, $payment->data);

        return $payment->getResponse();

        dd($this->transaction);

//        $outTradeNo = $this->transaction['unique_no'];
//
//        $payment = '';
//        $getForm = '';
//
//        $this->transaction->pay();


//        $gateway->alipayDirect();

        /**
         * @TODO: need to use $this->transaction['method'] and get the object on relevant Payment Service
         * every payment service should have doPaymentForm() to receive transaction details
         */
        switch ($this->transaction['method']) {

            case 'alipay':
//                $this->transaction['amount'] = $this->transaction['amount'] / 20;
                $payment = PaymentGateway::alipayDirect();
                break;
            case 'wechat':
                break;
            case 'unionpay':
                $payment = PaymentGateway::unionPayInstant();
                break;
            default:
                break;
        }

        if (is_object($payment))
            $getForm = $payment->doPaymentForm([
                "out_trade_no" => $outTradeNo,
                "subject" => trans('payment.subject'),
                "total_fee" => $this->transaction['amount'],
                "body" => trans('payment.description'),
                'transaction_id' => $this->transaction['id']
            ]);


        dd($payment);
        dd($getForm);

        return $getForm;
    }
}
