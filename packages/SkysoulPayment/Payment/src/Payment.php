<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use Illuminate\Database\Eloquent\Model;
use SkysoulDesign\Payment\Exceptions\DriverNotFoundException;

/**
 * Class Payment
 *
 * @package SkysoulDesign\Payment
 */
class Payment
{
    /**
     * @var array
     */
    protected $drivers;

    /**
     * @var PaymentGateway
     */
    protected $gateway;

    /**
     * Gateway name
     *
     * @var string
     */
    protected $gatewayName;

    /**
     * @var Transaction
     */
    protected $transaction;

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
     * Init Class
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

        $this->setGateway($gateway);
        $this->setGatewayName($gateway);
        $this->transaction = $transaction;

        return $this;
    }

    /**
     * Set Payment Gateway
     *
     * @param PaymentGateway|string $gateway
     */
    public function setGateway($gateway)
    {

        if (!$gateway instanceof PaymentGateway)
            $gateway = $this->drivers[$gateway];

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
        $data[$this->gateway->signTypeKey] = $this->getConfig('sign_type');

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

            /**
             * Gets The callbacks
             */
            $this->parseCallback([
                $this->gateway->callbackKey => config('payment.callback_url')
            ]),
            $this->parseCallback([
                $this->gateway->notifyCallbackKey => config('payment.notify_callback_url')
            ]),

            /**
             * Gets The Unique Service ID
             */
            array(
                $this->gateway->serviceIdKey => $this->getConfig('service_id')
            ),

            /**
             * Gets the Transaction unique ID
             */
            array(
                $this->gateway->uniqueIdentifierKey => $this->transaction->getAttribute('unique_no')
            ),

            /**
             * Prepare the price to be sent to the gateway API
             */
            array(
                $this->gateway->priceKey => $this->gateway->getPrice(
                    $this->transaction->getAttribute('amount'), config('payment.base')
                )
            )
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
     * Shortcut for getting the configs for $this gateway
     *
     * @param null|string $value
     * @return mixed|string
     */
    private function getConfig(string $value) : string
    {
        return config("payment.drivers.$this->gatewayName.$value");
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
     * Verifies already signed query request
     *
     * @param array $request
     * @return bool
     */
    public function verify(array $request) : bool
    {

        $data = array_except($request, [
            $this->gateway->signKey,
            $this->gateway->signTypeKey
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
     * Get response to be sent back to gateway API once verifies is okay
     *
     * @return mixed
     */
    public function getConfirmationResponse()
    {
        return $this->gateway->getConfirmationResponse();
    }
}