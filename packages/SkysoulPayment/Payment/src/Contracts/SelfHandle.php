<?php

namespace SkysoulDesign\Payment\Contracts;

use DreamsArk\Models\Payment\Transaction;

/**
 * Interface SelfHandle
 *
 * @package SkysoulDesign\Payment\Contracts
 */
interface SelfHandle
{
    /**
     * Prepare data to be post to gateway API
     *
     * @param array $data
     * @return string
     */
    public function prepareData(array $data) : string;

    /**
     * Parse Response Received from Vendor API
     *
     * @param string $response
     * @return array
     */
    static function parseResponse(string $response) : array;

    /**
     * Check Signature of Response Data
     *
     * @param array $response
     * @param string $sign
     * @return bool
     */
    public function checkSign(array $response, string $sign) : bool;

    /**
     * Determine if request has failed or not
     *
     * @param array $response
     * @return bool
     */
    public function checkFailure(array $response) : bool;

//    /**
//     * Update Transaction with vendor invoice Number
//     *
//     * @param Transaction $transaction
//     * @param array $response
//     * @return bool
//     */
//    public function updateTransaction(Transaction $transaction, array $response) : bool;

//    public function parseRawRequest($key, $checkSign = false) : array;

}