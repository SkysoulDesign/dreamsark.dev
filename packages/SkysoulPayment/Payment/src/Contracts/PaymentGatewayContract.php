<?php

namespace SkysoulDesign\Payment\Contracts;

/**
 * Interface PaymentGatWayContract
 *
 * @package SkysoulDesign\Payment\Contracts
 */
interface PaymentGatewayContract
{
    /**
     * Returns any extra keyed params that should be sent within the request
     *
     * @return array
     */
    public function getAdditionalPostData() : array;

    /**
     * Gets Payment Confirmation response
     *
     * @return string
     */
    public function getConfirmationResponse() : string;


    /**
     * Sign the request
     *
     * @param string $query
     * @param string $key
     * @param string $password
     * @return string
     */
    public function sign(string $query, string $key, string $password = null) : string;

    /**
     * Prepare the data to be sign
     *
     * @param array $request
     * @param string $key
     * @param string $password
     * @return array
     */
    public function prepare(array $request, string $key, string $password = null) : array;

    /**
     * Logic for validating the sign
     *
     * @param string $query
     * @param string $sign
     * @param string $key
     * @return bool
     */
    public function validate(string $query, string $sign, string $key) : bool;

    /**
     * Should return the price that is sent to the API gateway
     * for example, some gateways might require the price
     * in cents and others in dollar.
     * Attention to the return type, int != float
     * so it might have discrepancy on how the value is parsed on the gateway API
     *
     * @param int $amount
     * @param int $base
     * @return int|float
     */
    public function getPrice(int $amount, int $base);

}