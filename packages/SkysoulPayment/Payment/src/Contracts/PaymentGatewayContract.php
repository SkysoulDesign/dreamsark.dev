<?php

namespace SkysoulDesign\Payment\Contracts;

/**
 * Interface PaymentGatWayContract
 *
 * @package SkysoulDesign\Payment\Contracts
 */
interface PaymentGatewayContract
{
//    const GATEWAY_URL = 'http://gateway.com/pay.do';
//
    public function getAdditionalPostData() : array;

    /**
     * Gets Payment Confirmation response
     *
     * @return string
     */
    public function getConfirmationResponse() : string;

}