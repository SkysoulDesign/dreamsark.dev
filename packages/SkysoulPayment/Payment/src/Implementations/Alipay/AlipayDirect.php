<?php

namespace SkysoulDesign\Payment\Implementations\Alipay;


use SkysoulDesign\Payment\PaymentBuilder;

/**
 * Class AlipayDirect
 *
 * @package SkysoulDesign\Payment\Implementations
 */
class AlipayDirect extends PaymentBuilder
{

    /**
     * @var array
     */
    protected $config = [];
    /**
     * @var string
     */
    protected $keyPath;

    /**
     * AlipayDirect constructor.
     */
    public function __construct()
    {
        $this->config = $this->getAlipayConfig();
    }

    /**
     * @param $params
     * @return string
     */
    public function doPaymentForm($params)
    {
        $transaction_id = $params['transaction_id'];
        unset($params['transaction_id']);

        if (isset($params['return_url']))
            $this->config['return_url'] = $params['return_url'];
        else
            $params['return_url'] = $this->config['return_url'];

        if (isset($params['notify_url']))
            $this->config['notify_url'] = $params['notify_url'];
        else
            $params['notify_url'] = $this->config['notify_url'];

        $params['anti_phishing_key'] = ''; //$this->query_timestamp();

        $params['_input_charset'] = trim(strtolower($this->config['input_charset']));
        $params['partner'] = $this->config['partner'];
        $params['seller_id'] = $this->config['seller_id'];
        $params['payment_type'] = $this->config['payment_type'];
        $params['service'] = $this->config['service'];


        $this->updateTransactionMessage($transaction_id, ['request' => $this->buildRequestParaToString($params, false)]);

        return $this->buildRequestForm($params, "post", "DreamsArk Alipay Direct Pay - Test ENV");
    }

    /**
     * @param $para_sort
     * @return string
     */
    protected function buildRequestMysign($para_sort)
    {
        $mySign = "";
        $preStr = $this->createLinkstring($para_sort);
//        $preStr = $this->createLinkstringUrlencode($para_sort);

        switch (strtoupper(trim($this->config['sign_type']))) {
            case "RSA" :
                $mySign = $this->rsaSign($preStr, $this->config['private_key_path']);
                break;
            default :
                $mySign = "";
        }

        return $mySign;
    }


    /**
     * @param $para_temp
     * @return mixed
     */
    protected function buildRequestPara($para_temp)
    {
        $para_filter = $this->paraFilter($para_temp);
        $para_sort = $this->argSort($para_filter);
        $mysign = $this->buildRequestMysign($para_sort);
        $para_sort['sign'] = $mysign;
        $para_sort['sign_type'] = strtoupper(trim($this->config['sign_type']));

        return $para_sort;
    }


    /**
     * @param $para_temp
     * @param bool $urlEncode
     * @return string
     */
    protected function buildRequestParaToString($para_temp, $urlEncode = true)
    {
        $para = $this->buildRequestPara($para_temp);
        if ($urlEncode)
            $request_data = $this->createLinkstringUrlencode($para);
        else
            $request_data = $this->createLinkstring($para);

        return $request_data;
    }


    /**
     * @param $para_temp
     * @param $method
     * @param $button_name
     * @return string
     */
    public function buildRequestForm($para_temp, $method, $button_name)
    {
        $para = $this->buildRequestPara($para_temp);
        $sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='" . $this->config['gatewayUrl'] . "_input_charset=" . trim(strtolower($this->config['input_charset'])) . "' method='" . $method . "'>";
        while (list ($key, $val) = each($para)) {
            $sHtml .= "<input type='hidden' name='" . $key . "' value='" . $val . "'/>";
        }

        $sHtml = $sHtml . "<input type='submit' style='display:none;'  value='" . $button_name . "'></form>";
        $sHtml = $sHtml . "<script>document.forms['alipaysubmit'].submit();</script>";

        return $sHtml;
    }

}