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
     *
     * @param int $amount
     * @param int $base
     * @return int
     */
    public function getPrice(int $amount, int $base) : int;

}