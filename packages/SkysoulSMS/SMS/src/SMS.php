<?php

namespace SkysoulDesign\SMS;

use GuzzleHttp\Client;
use SkysoulDesign\SMS\Interfaces\SMSInterface;

/**
 * Class Payment
 *
 * @package SkysoulDesign\Payment
 */
class SMS
{
    /**
     * @var \SkysoulDesign\SMS\SMSAbstract
     */
    private $driver;

    /**
     * @var \GuzzleHttp\Client
     */
    private $client;

    /**
     * @var array
     */
    private $data = [];

    /**
     * SMS constructor.
     *
     * @param \SkysoulDesign\SMS\Interfaces\SMSInterface $driver
     * @param \GuzzleHttp\Client                         $client
     */
    public function __construct(SMSInterface $driver, Client $client)
    {
        $this->driver = $driver;
        $this->client = $client;
    }

    /**
     * @param array|string|int $number
     * @param string $message
     * @return string
     */
    public function send($number, string $message)
    {

        if (is_array($number)) {
            list($code, $number) = $number;
        }

        /**
         * Do stuff....
         */

        return $this->sendRequest([
            'tel' => [
                "nationcode" => $code ?? '86',
                "phone" => $number
            ],
            "type" => "0",
            "msg" => $message,
            "sig" => $this->driver->sign($number),
            "extend" => "",
            "ext" => ""
        ]);

    }

    /**
     * Send Request to the server
     *
     * @param array $data
     * @return string
     */
    public function sendRequest(array $data = [])
    {

        $response = $this->client->request('POST', $this->composeUrl(), [
            'json' => $data,
        ]);

        return $response->getBody()->getContents();

    }

    /**
     * Get The Composed Url
     *
     * @return mixed
     */
    private function composeUrl() : string
    {
        return preg_replace_callback("~{([^{]+)}~", function ($match) {

            if ($data = array_get($this->data, $match[1]))
                return $data;

            if (method_exists($this->driver, $cased = camel_case($match[1]))) {
                return call_user_func([$this->driver, $cased]);
            }

            dd('throw an exception saying some params on the url coulnt be parsed');

        }, $this->driver->url);

    }

}
