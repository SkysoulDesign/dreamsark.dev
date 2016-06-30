<?php

namespace SkysoulDesign\SMS\Interfaces;


/**
 * Class Payment
 *
 * @package SkysoulDesign\Payment
 */
interface SMSInterface
{

    /**
     * Sign the request
     *
     * @param string $key
     * @param array  $data
     *
     * @return string
     *
     */
    public function sign(string $key, array $data) : string;

}
