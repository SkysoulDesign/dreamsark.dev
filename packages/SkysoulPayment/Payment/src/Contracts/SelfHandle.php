<?php

namespace SkysoulDesign\Payment\Contracts;

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
    public function prepareData(array $data): string;

    /**
     * Parse Response Received from Vendor API
     *
     * @param string $response
     * @param string $key
     * @return array
     */
    public function parseResponse(string $response, string $key): array;

    /**
     * Check Signature of Response Data
     *
     * @param array $response
     * @param string $sign
     * @return bool
     */
    public function checkSign(array $response, string $sign) : bool;

    public function parseRawRequest($key, $checkSign = false) : array;

}