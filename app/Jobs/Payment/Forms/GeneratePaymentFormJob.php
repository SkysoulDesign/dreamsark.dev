<?php

namespace DreamsArk\Jobs\Payment\Forms;

use DreamsArk\Jobs\Job;
use SkysoulDesign\Payment\PaymentGateway;

class GeneratePaymentFormJob extends Job
{
    /**
     * @var array
     */
    private $paymentData;

    /**
     * Create a new job instance.
     *
     * @param array $paymentData
     */
    public function __construct(array $paymentData)
    {
        $this->paymentData = $paymentData;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $outTradeNo = $this->paymentData['unique_no'];

        $payment = '';
        $getForm = '';
        /**
         * @TODO: need to use $this->paymentData['pay_method'] and get the object on relevant Payment Service
         * every payment service should have doPaymentForm() to receive transaction details
         */
        switch ($this->paymentData['pay_method']) {
            case 'alipay':
//                $this->paymentData['amount'] = $this->paymentData['amount'] / 20;
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
                "out_trade_no"   => $outTradeNo,
                "subject"        => trans('payment.subject'),
                "total_fee"      => $this->paymentData['amount'],
                "body"           => trans('payment.description'),
                'transaction_id' => $this->paymentData['transaction_id']
            ]);

        return $getForm;
    }
}
