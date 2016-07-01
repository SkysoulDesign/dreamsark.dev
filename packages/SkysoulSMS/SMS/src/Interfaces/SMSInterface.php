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
     * @param string $phone
     * @return string
     */
    public function sign(string $phone) : string;

}
