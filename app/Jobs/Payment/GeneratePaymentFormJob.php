<?php

namespace DreamsArk\Jobs\Payment;

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

        /**
         * @TODO: need to use $this->paymentData['pay_method'] and get the object on relevant Payment Service
         * every payment service should have doPaymentForm() to receive transaction details
         */
        $payment = PaymentGateway::alipayDirect();

        $getForm = $payment->doPaymentForm([
            "out_trade_no" => $outTradeNo,
            "subject"      => trans('payment.subject'),
            "total_fee"    => $this->paymentData['amount']/20,
            "body"         => trans('payment.description'),
            'transaction_id' => $this->paymentData['transaction_id']
        ]);

        return $getForm;
    }
}
