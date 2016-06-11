<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use Illuminate\Database\Eloquent\Model;
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
     * Init Class based on a Transaction
     *
     * @param Model $transaction
     * @return Payment
     * @throws DriverNotFoundException
     */
    public function boot(Model $transaction) : Payment
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
     * Set name of the current gateway
     *
     * @param string $name
     */
    private function setGatewayName(string $name)
    {
        $this->gatewayName = $name;
    }

    /**
     * Sign and return the final data to be sent to the gateway API
     *
     * @return array
     */
    public function getResponse() : array
    {

        $data = $this->getPostData();
        $data[$this->gateway->signKey] = $this->sign($data);
        $data['sign_type'] = 'RSA';

        return $data;
    }

    /**
     * Prepares the post data to be sent to the gateway API
     *
     * @return array
     */
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
            [$this->gateway->priceKey => ($this->transaction->getAttribute('amount') / config('payment.base'))]
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
     * Sign the request to be sent to the gateway API
     *
     * @param array $data
     * @return mixed|string
     */
    public function sign(array $data) : string
    {
        /**
         * According with alipay Api the keys should
         * be ordered in ascending order
         */
        ksort($data);

        $key = file_get_contents(
            $this->getConfig('private_key_path')
        );

        $response = openssl_get_privatekey($key);

        openssl_sign($this->buildQueryString($data), $sign, $response);
        openssl_free_key($response);

        return base64_encode($sign);
    }

    /**
     * Verifies already signed query request
     *
     * @param array $request
     * @return bool
     */
    public function verify(array $request) : bool
    {

        $data = array_except($request, [
            $this->gateway->signKey,
            'sign_type'
        ]);

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
     * Shortcut for getting the configs for $this gateway
     *
     * @param null $value
     * @return mixed|array
     */
    private function getConfig($value = null)
    {
        $base = "payment.drivers.$this->gatewayName";
        return $value ? config("$base.$value") : config($base);
    }

    /**
     * Get response to be sent back to gateway API once verifies is okay
     *
     * @return string
     */
    public function getConfirmationResponse()
    {
        return $this->gateway->getConfirmationResponse();
    }
}