<?php

namespace DreamsArk\Jobs\Payment\Forms;

use DreamsArk\Jobs\Job;
use SkysoulDesign\Payment\PaymentGateway;

class GenerateWithdrawFormJob extends Job
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
     *
     */
    public function handle()
    {
        $outTradeNo = $this->paymentData['unique_no'];

        $payment = '';
        $getForm = '';

        switch ($this->paymentData['pay_method']) {
            case 'alipay':
                $this->paymentData['amount'] = $this->paymentData['amount'] / 20;
                $payment = PaymentGateway::alipayDirect();
                break;
            case 'wechat':
            case 'unionpay':
                break;
            default:
                break;
        }

        if (is_object($payment))
            $getForm = $payment->doWithdrawalForm(
                [
                    "out_trade_no"   => $outTradeNo,
                    "total_fee"      => $this->paymentData['amount'],
                    'transaction_id' => $this->paymentData['transaction_id']
                ]
            );

        return $getForm;
    }
}
