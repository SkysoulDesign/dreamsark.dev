<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use SkysoulDesign\Payment\Contracts\SelfHandle;
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
     * @var string
     */
    protected $privateKey;

    /**
     * @var string
     */
    protected $publicKey;

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

        if (!array_has(config('payment.drivers'), $gateway) || !config('payment.drivers.' . $gateway . '.enabled', false)) {
            throw new DriverNotFoundException("There is no driver available with the name of $gateway.");
        }

        $this->setGateway($gateway);
        $this->setGatewayName($gateway);
        $this->setPrivateKey();
        $this->setPublicKey();
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

        $data = $this->gateway->prepare(
            $this->getPostData(),
            $this->getPrivateKey(),
            $this->getPrivateKeyPassword()
        );
        $data[$this->gateway->signKey] = $this->sign($data);

        if ($key = $this->gateway->signTypeKey)
            $data[$key] = $this->getConfig('sign_type');

        $buildForm = true;
        if ($this->gateway instanceof SelfHandle) {

            $data = $this->post(
                $this->getConfig('gateway_url'),
                $this->gateway->prepareData($data)
            );
            $data['qr_url'] = $this->getConfig('qr_url');
            $buildForm = false;

            if ($data['result_code'] == 'SUCCESS') {
                $this->transaction->setAttribute('invoice_no', $data[$this->gateway->uniqueInvoiceNoKey]);
                $this->transaction->save();
            }
            unset($data[$this->gateway->serviceIdKey], $data[$this->gateway->uniqueInvoiceNoKey], $data[$this->gateway->signKey]);
//            $this->transaction->fresh();

        }

        return [
            'data'      => $data,
            'target'    => $this->getConfig('gateway_url'),
            'buildForm' => $buildForm
        ];
    }

    private function post($url, $postData)
    {
//        die($postData);
        $client = new Client();

        $response = $client->post($url, ['body' => $postData]);

        return $this->gateway->parseResponse($response->getBody(), $this->getPrivateKey());
    }

    /**
     * Prepares the post data to be sent to the gateway API
     *
     * @return array
     */
    private function getPostData() : array
    {
        return array_filter(array_merge(

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
                $this->gateway->uniqueIdentifierKey => $this->gateway->getUniqueNo($this->transaction->getAttribute('unique_no'))
            ),

            /**
             * Prepare the price to be sent to the gateway API
             */
            array(
                $this->gateway->priceKey => $this->gateway->getPrice(
                    $this->transaction->getAttribute('amount'), config('payment.base')
                )
            )
        ), function ($k) {
            return $k;
        }, ARRAY_FILTER_USE_KEY);
    }

    /**
     * Parse the callback url route
     *
     * @param array $url
     * @return array
     */
    private function parseCallback(array $url) : array
    {

        if (filter_var($value = implode($url), FILTER_VALIDATE_URL) === false)
            return [
                key($url) => route($value)
            ];

        return $url;
    }

    /**
     * Sign the request to be sent to the gateway API
     *
     * @param array $data
     * @return array
     */
    public function sign($data)
    {
        /**
         * According with alipay Api the keys should
         * be ordered in ascending order
         */
        ksort($data);

        return $this->gateway->sign(
            $this->buildQueryString($data),
            $this->getPrivateKey(),
            $this->getPrivateKeyPassword()
        );

    }

    /**
     * Shortcut for getting the configs for $this gateway
     *
     * @param null|string $value
     * @return mixed|string
     */
    private function getConfig(string $value)
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
            ($this->gateway instanceof SelfHandle ? $this->getPrivateKey() : $this->getPublicKey() )
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

    /**
     * Set Private Key
     */
    private function setPrivateKey()
    {
        $this->privateKey = $this->getConfig('private_key') ?: file_get_contents($this->getConfig('private_key_path'));
    }

    /**
     * Key private key
     *
     * @return string
     */
    private function getPrivateKey() : string
    {
        return $this->privateKey;
    }

    /**
     * Set Public Key
     */
    private function setPublicKey()
    {
        $this->publicKey = $this->getConfig('public_key_path') ? file_get_contents(
            $this->getConfig('public_key_path')
        ) : '';
    }

    /**
     * Key Public key
     *
     * @return string
     */
    private function getPublicKey() : string
    {
        return $this->publicKey;
    }

    /**
     * Get password
     *
     * @return mixed|string
     */
    private function getPrivateKeyPassword()
    {
        return $this->getConfig('private_key_password');
    }
}