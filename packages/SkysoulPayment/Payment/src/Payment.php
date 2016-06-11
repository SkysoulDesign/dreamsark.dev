<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
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
     * @var Transaction
     */
    protected $transaction;

    /**
     * Gateway name
     *
     * @var string
     */
    protected $gatewayName;

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
     * Build URL Query string
     *
     * @param array $data
     * @param bool $encoded
     * @return string
     */
    public function buildQueryString(array $data, bool $encoded = false) : string
    {
        $query = http_build_query($data);

        if ($encoded)
            return $query;

        return urldecode($query);
    }

//    /**
//     * Alipay constructor.
//     *
//     * @param Transaction $transaction
//     */
//    public function __construct(Transaction $transaction)
//    {
//        $this->transaction = $transaction;
//    }

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
        $this->setGatewayName($gateway);
        $this->transaction = $transaction;

        return $this;
    }

    /**
     * Set name of the current gateway
     *
     * @param string $name
     */
    private function setGatewayName(string $name)
    {
        $this->gatewayName = $name;
    }

    /**
     * Get Response
     */
    public function getResponse() : array
    {

        $data = $this->getPostData();
        $data[$this->gateway->signKey] = $this->sign($data);
        $data['sign_type'] = 'RSA';

        dd($data);

        return $data;
    }

    private function getPostData() : array
    {
        return array_merge(
            $this->gateway->getAdditionalPostData(),
            $this->parseCallback([
                $this->gateway->callbackKey => config('payment.callback_url')
            ]),
            $this->parseCallback([
                $this->gateway->notifyCallbackKey => config('payment.notify_callback_url')
            ]),
            [$this->gateway->uniqueIdentifierKey => $this->transaction->getAttribute('unique_no')],
            [$this->gateway->priceKey => $this->transaction->getAttribute('amount')]
        );
    }

    /**
     * Parse the callback url route
     *
     * @param array $url
     * @return array
     */
    private function parseCallback(array $url) : array
    {

        if (filter_var($value = implode($url), FILTER_VALIDATE_URL) === FALSE)
            return [
                key($url) => route($value)
            ];

        return $url;
    }

    /**
     * @param array $data
     * @return mixed|string
     */
    private function sign(array $data) : string
    {
        /**
         * According with alipay Api the keys should
         * be ordered in ascending order
         */
        ksort($data);

        $data = $this->buildQueryString($data);;

        $key = file_get_contents(
            config("payment.drivers.$this->gatewayName.private_key_path")
        );

        $response = openssl_get_privatekey($key);

        openssl_sign($data, $sign, $response);
        openssl_free_key($response);

        return base64_encode($sign);
    }

    public function verify(array $request) : bool
    {

        $data = array_except($request, [
            $this->gateway->signKey,
            'sign_type'
        ]);
//dd($this)

        ksort($data);

        return $this->gateway->validate(
            $this->buildQueryString($data),
            array_get($request, $this->gateway->signKey),
            file_get_contents(
                $this->getConfig('public_key_path')
            )
        );

    }

    /**
     * @param null $value
     * @return mixed|array
     */
    private function getConfig($value = null)
    {
        $base = "payment.drivers.$this->gatewayName";
        return $value ? config("$base.$value") : config($base);
    }

    /**
     * Confirm Payment
     *
     * @param Request $request
     * @return ConfirmTransactionJob
     */
    public function confirm(array $request)
    {
        $this->verify($request);

//        return new ConfirmTransactionJob($request, $this->gateway->transaction);
    }

    public function getConfirmationResponse()
    {
        return $this->gateway->getConfirmationResponse();
    }


}