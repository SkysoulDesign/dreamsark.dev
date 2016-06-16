<?php

namespace SkysoulDesign\Payment\Contracts;

/**
 * Interface SelfHandle
 *
 * @package SkysoulDesign\Payment\Contracts
 */
interface SelfHandle
{

    public function prepareData(array $data): string;

    public function parseResponse($response, $key, $checkSign = true): array;

    public function parseRawRequest($key, $checkSign = false) : array;

}