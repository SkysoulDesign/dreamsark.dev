<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Jobs\Payment\UpdateOrCreateTransactionMessageJob;
use DreamsArk\Models\Payment\Transaction;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use SkysoulDesign\Payment\Contracts\SelfHandle;
use SkysoulDesign\Payment\Exceptions\DriverNotFoundException;
use SkysoulDesign\Payment\Exceptions\InvalidKeysException;
use SkysoulDesign\Payment\Exceptions\InvalidResponseException;
use SkysoulDesign\Payment\Exceptions\InvalidSignature;

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

        if (!array_has(config('payment.drivers'), $gateway) || !config("payment.drivers.$gateway.enabled", false)) {
            throw new DriverNotFoundException("There is no driver available with the name of $gateway.");
        }

        $this->setGateway($gateway);
        $this->setGatewayName($gateway);
        $this->initPublicAndPrivateKeys();
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
     * Init Public and private Keys
     */
    private function initPublicAndPrivateKeys()
    {

        $config = $this->getConfig();

        foreach (['private', 'public'] as $key) {

            if (array_has($config, $key = "{$key}_key")) {
                $this->{camel_case($key)} = $config[$key];
                continue;
            }

            if (array_has($config, $path = "{$key}_path")) {
                $this->{camel_case($key)} = file_get_contents(
                    $config[$path]
                );
                continue;
            }

            /**
             * Throw Exception in case Keys were not set
             */
            throw new InvalidKeysException(
                "Neither '$key' nor '$path' has been specified in the configuration file for $this->gatewayName."
            );
        }
    }

    /**
     * Shortcut for getting the configs for $this gateway
     *
     * @param null|string $value
     * @param null $default
     * @return array|string
     */
    private function getConfig(string $value = null, $default = null)
    {
        return config(
            "payment.drivers.$this->gatewayName" . ($value ? ".$value" : ''), $default
        );
    }

    /**
     * Sign and return the final data to be sent to the gateway API
     *
     * @return array
     * @throws InvalidResponseException
     * @throws InvalidSignature
     */
    public function getResponse() : array
    {
        /**
         * Prepare Data before sign
         */
        $data = $this->gateway->appendDataToRequestBeforeSign(
            $this->transaction,
            $request = $this->getPostData(),
            $this->getPrivateKey(),
            $this->getPrivateKeyPassword()
        );

        /**
         * Merge Result
         */
        $data = array_merge($request, $data);

        $data[$this->gateway->signKey] = $this->sign($data);

        /**
         * Set sign Key Type example: MD5, RSA
         */
        if ($key = $this->gateway->signTypeKey)
            $data[$key] = $this->getConfig('sign_type');

        /**
         * Update Message with request data
         */
        dispatch(new UpdateOrCreateTransactionMessageJob(
            $this->transaction, ['request' => $data]
        ));

        /**
         * If implementation implements SelfHandle then we will
         * directly dispatch the request to the vendor API
         */
        if ($buildForm = $this->gateway instanceof SelfHandle) {

            $data = $this->post(
                $this->getConfig('gateway_url'),
                $this->gateway->prepareData($data)
            );

            if ($response = $this->gateway->checkFailure($data)) {
                throw new InvalidSignature(
                    "The request failed. {$data[$this->gateway->errorMessageKey]}."
                );
            }

            if (!$this->gateway->checkSign($data, $sign = $this->sign($data))) {
                throw new InvalidSignature(
                    "The response has a signature mismatch. expected '$sign' got '{$data['sign']}'"
                );
            }

            $data['qr_url'] = $this->getConfig('qr_url');

        }

        return [
            'result'    => 'ok',
            'data'      => $data,
            'target'    => $this->getConfig('gateway_url'),
            'buildForm' => !$buildForm
        ];
    }

    public function getWithdrawResponse(array $formData) : array
    {
        $buildForm = true;

        if (!$this->gateway->isWithdrawAvail)
            return [
                'result'  => 'fail',
                'message' => trans('payment.withdraw-not-avail-in') . ' ' . $this->gatewayName
            ];

        /*$this->gateway->uniqueIdentifierKey = 'batch_no';
        $this->gateway->priceKey = 'batch_fee';*/
        $this->gateway->prepareInternalKeys('batch_trans_notify');

        /**
         * Prepare Data before sign
         */
        $data = $this->gateway->appendDataToRequestBeforeSign(
            $this->transaction,
            $request = $this->getPostData(),
            $this->getPrivateKey(),
            $this->getPrivateKeyPassword()
        );

        /**
         * Merge Result
         */
        $data = array_merge($request, $data);

        unset($data['seller_id'], $data[$this->gateway->callbackKey], $data['service'], $data['body'], $data['subject'], $data['payment_type']);

        $data = array_merge($data, [
            "service"        => "batch_trans_notify",
            "email"          => $this->getConfig('service_email'),
            "account_name"   => $this->getConfig('service_name'),
            /**
             * "detail_data" sample
             * SERIAL_NUMBER^RECEIVER_ALIPAY_MOBILE_NUMBER^RECEIVER_REAL_NAME^AMOUNT^REMARKS
             */
            "detail_data"    => (('1' . str_pad($this->transaction->id, 10, '0', STR_PAD_LEFT)) . '^'
                . $formData['mobile_number'] . '^' . $formData['real_name']
                . '^' . $this->gateway->getPrice(
                    $this->transaction->getAttribute('amount'), config('payment.base')
                )
                . '^withdraw-' . $formData['mobile_number']),
            "pay_date"       => date('Ymd'),
            "batch_num"      => 1,
            "_input_charset" => trim(strtolower('utf-8')),
        ]);

        $data[$this->gateway->signKey] = $this->md5Sign($data);

        if ($key = $this->gateway->signTypeKey)
            $data[$key] = strtoupper(trim('MD5')); // $this->getConfig('sign_type');

        dispatch(new UpdateOrCreateTransactionMessageJob($this->transaction, ['request' => $data]));

        return [
            'result'    => 'ok',
            'data'      => $data,
            'target'    => $this->getConfig('gateway_url'),
            'buildForm' => $buildForm
        ];
    }

    private function md5Sign($data)
    {
        ksort($data);
        $sign = $this->buildQueryString($data);
        $sign = $sign . $this->getConfig('md5_key');

        return md5($sign);
    }

    private function md5Verify($prestr, $sign, $key)
    {
        $prestr = $prestr . $key;
        $mysgin = md5($prestr);

        if ($mysgin == $sign) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Prepares the post data to be sent to the gateway API
     *
     * @return array
     */
    private function getPostData() : array
    {

        return $this->sanitize(array_merge(

            $this->gateway->getAdditionalPostData(
                $this->getConfig()
            ),

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
        ));
    }

    /**
     * Clean Up all empty keys on an array
     *
     * @param array $data
     * @return array
     */
    public function sanitize(array $data) : array
    {
        return array_filter($data, function ($key) {
            return $key;
        }, ARRAY_FILTER_USE_KEY);
    }

    /**
     * Parse the callback url route
     * ['url' => http://... or name_of_route]
     *
     * @param array $url
     * @return array
     */
    private function parseCallback(array $url) : array
    {

        if (filter_var($value = implode($url), FILTER_VALIDATE_URL) === false)
            return [
                key($url) => route($value, $this->gatewayName)
            ];

        return $url;
    }

    /**
     * Get private key
     *
     * @return string
     */
    private function getPrivateKey() : string
    {
        return $this->privateKey;
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

        /**
         * Remove sign keys from array
         */
        array_forget($data, [
            $this->gateway->signKey,
            $this->gateway->signTypeKey,
        ]);

        return $this->gateway->sign(
            $this->buildQueryString($data),
            $this->getPrivateKey(),
            $this->getPrivateKeyPassword()
        );

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
     * Post data to Vendor API
     *
     * @param $url
     * @param $postData
     * @return array|mixed
     * @throws InvalidResponseException
     */
    private function post($url, $postData) : array
    {

        $response = (new Client())->post($url, [
            'body' => $postData
        ]);

        /**
         * Throw Exception if response is other than what expected
         */
        if (($code = $response->getStatusCode()) != 200) {
            throw new InvalidResponseException(
                "Invalid Response received from $this->gatewayName. Received: $code, Expected: 200"
            );
        }

        return $this->gateway->parseResponse(
            $response->getBody()->getContents()
        );
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
            ($this->gateway instanceof SelfHandle ? $this->getPrivateKey() : $this->getPublicKey())
        );
    }

    /**
     * Get Public key
     *
     * @return string
     */
    private function getPublicKey() : string
    {
        return $this->publicKey;
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
     * to get original price internal use (website)
     *
     * @return float|int
     */
    public function getPrice()
    {
        return $this->transaction->getAttribute('amount') / config('payment.base');
    }
}