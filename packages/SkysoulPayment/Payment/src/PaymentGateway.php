<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;

/**
 * Class PaymentGateway
 *
 * @package SkysoulDesign\Payment
 */
abstract class PaymentGateway implements PaymentGatewayContract
{

    /**
     * Callback key
     *
     * @var string
     */
    public $callbackKey;

    /**
     * Notify callback key
     *
     * @var string
     */
    public $notifyCallbackKey;

    /**
     * Name of the unique key identifier on the gateway Api
     * Ex: out_trade_no for Alipay
     *
     * @var string
     */
    public $uniqueIdentifierKey;

    /**
     * Name of the invoice_no
     * Ex: trade_no for Alipay
     *
     * @var string
     */
    public $uniqueInvoiceNoKey = 'invoice_no';

    /**
     * Name of the invoice_no
     * Ex: trade_no for Alipay
     *
     * @var string
     */
    public $uniqueNotifyKey = 'notify_type';

    /**
     * Name of the sign key on the gateway API
     *
     * @var string
     */
    public $signKey;

    /**
     * Name of the type of signature defined by the gateway API
     *
     * @var string
     */
    public $signTypeKey;

    /**
     * Key which identifies the amount payed for the product
     *
     * @var string
     */
    public $priceKey;

    /**
     * Get the service key name
     *
     * @var string
     */
    public $serviceIdKey;

    /**
     * Key of the error message in case of failure
     *
     * @var string
     */
    public $errorMessageKey;

    /**
     * flag to do/skip withdraw event
     * @var bool
     */
    public $isWithdrawAvail = false;

    /**
     * Append Any necessary data before signing the request
     *
     * @param Transaction $transaction
     * @param array $request
     * @param string $key
     * @param string $password
     * @return array
     */
    public function appendDataToRequestBeforeSign(Transaction $transaction, array $request, string $key, string $password = null) : array
    {
        return [];
    }

    /**
     * in TransactionMiddleware
     * overwrite keys like uniqueNoKey, priceKey, etc. on "notify_type=batch_trans_notify"
     *
     * @param string $notify_type
     */
    public function prepareInternalKeys(string $notify_type)
    {
        // TODO: Implement prepareInternalKeys() method.
    }
}