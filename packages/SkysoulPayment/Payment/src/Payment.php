<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Exceptions\DriverNotFoundException;
use SkysoulDesign\Payment\Implementations\Alipay\Alipay;

/**
 * Class Payment
 *
 * @package SkysoulDesign\Payment
 */
class Payment
{

    /**
     * @var PaymentGatewayContract
     */
    protected $drivers;

    /**
     * @var Alipay|PaymentGateway
     */
    protected $gateway;

    /**
     * Payment constructor.
     *
     * @param array $drivers
     */
    public function __construct(array $drivers)
    {
        $this->drivers = $drivers;
    }

    /**
     * Set Payment Gateway
     *
     * @param PaymentGateway|string $gateway
     * @param $payload
     */
    public function setGateway($gateway, $payload)
    {

        if (!$gateway instanceof PaymentGateway)
            $gateway = new $this->drivers[$gateway](
                $payload
            );

        $this->gateway = $gateway;
    }

    /**
     * Init Class based on a Transaction
     *
     * @param Transaction $transaction
     * @throws DriverNotFoundException
     * @return $this
     */
    public function forTransaction(Transaction $transaction)
    {
        /**
         * Get Payment Driver
         */
        $gateway = $transaction->getAttribute('method');

        if (!array_has(config('payment.drivers'), $gateway)) {
            throw new DriverNotFoundException("There is no driver available with the name of $gateway.");
        }

        $this->setGateway($gateway, $transaction);

        return $this;
    }

    /**
     * Get Response
     */
    public function getResponse()
    {

        $data = $this->gateway->getPostData();
        $data['sign'] = $this->gateway->sign($data);
        $data['sign_type'] = 'RSA';

        return $data;

    }

}