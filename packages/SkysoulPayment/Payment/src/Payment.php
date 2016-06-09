<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Exceptions\DriverNotFoundException;

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
     * @var PaymentGateway
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
     * @param Transaction $transaction
     * @throws DriverNotFoundException
     * @return $this
     */
    public function forTransaction(Transaction $transaction)
    {
//        dd($this);
        /**
         * Get Payment Driver
         */
        $gateway = $transaction->getAttribute('method');

        if (!in_array($gateway, config('payment.drivers'))) {
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
        $final = '';
        foreach ($this->gateway->getPostData() as $key => $data) {
            $final = $final . "&$key=$data";
        }

        return redirect($this->gateway::GATEWAY_URL.$final);

        $client = new Client();
        $res = $client->request('POST', $this->gateway::GATEWAY_URL, $this->gateway->getPostData());

        echo $res->getBody();
    }

    /**
     * @return PaymentGateway
     * @throws DriverNotFoundException
     */
    protected function gateway() : PaymentGateway
    {

        if ($this->driver === null)
            throw new DriverNotFoundException('payment gateway was not set');

        return $this->driver;
    }

}