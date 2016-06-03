<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;

use SkysoulDesign\Payment\Implementations\Wechat\Lib\WxPayResults;

/**
 * Class WpQRPay
 *
 * @package SkysoulDesign\Payment\Implementations\Wechat
 */
class WpQRPay extends WPHelper
{
    protected $config;

    protected $defaultParams = ['appid', 'mch_id', 'device_info', 'nonce_str', 'body', 'detail', 'attach', 'out_trade_no', 'fee_type', 'total_fee',
        'spbill_create_ip', 'time_start', 'time_expire', 'goods_tag', 'notify_url', 'trade_type', 'product_id', 'openid'];

    /**
     * WpQRPay constructor.
     */
    public function __construct()
    {
        $this->config = $this->getWechatConfig();
        $this->config['trade_type'] = 'NATIVE';
    }

    /**
     * @param $params
     * @return string
     */
    public function doPaymentForm($params)
    {
        $transaction_id = $params['transaction_id'];
        unset($params['transaction_id']);

        foreach ($this->defaultParams as $input)
            $requestParams[$input] = (isset($params[$input]) ? $params[$input] : (isset($this->config['defaults'][$input]) ? $this->config['defaults'][$input] : ''));

        $requestParams['out_trade_no'] = $this->getWechatOutTradeNo($params["out_trade_no"]);
        $requestParams['total_fee'] = $params["total_fee"];
        $requestParams['body'] = $params["subject"];
        $requestParams['detail'] = $params["body"];
        $requestParams['attach'] = $params["body"];

        $requestParams['time_start'] = date('YmdHis');
        $requestParams['time_expire'] = date("YmdHis", time() + 600);
        $requestParams['notify_url'] = $this->config['url']['notify'];
        $requestParams['trade_type'] = $this->config['trade_type'];
        $requestParams['spbill_create_ip'] = $_SERVER['REMOTE_ADDR'];
        $requestParams['nonce_str'] = $this->getNonceStr();

        $url = $this->config['url']['unified'];
//        $result = $this->GetPayUrl($requestParams, $this->config['url']['unified'], $this->config['defaults']['timeout']);
        $requestParams['sign'] = $this->MakeSign($requestParams);

        $this->updateTransactionMessage($transaction_id, ['request' => $this->createLinkString($requestParams)]);

        $xml = $this->ToXml($requestParams);

        $startTimeStamp = $this->getMillisecond();
        $response = $this->postXmlCurl($xml, $url, false, $this->config['defaults']['timeout']);
        $result = WxPayResults::Init($response);
        $this->reportCostTime($url, $startTimeStamp, $result);

        if (empty($result) || (strtolower($result['result_code']) == 'fail' || is_null($result["code_url"])))
            return 'fail';

//        return $this->generateQRImageTag($result["code_url"]);
        $result['qr_get_url'] = $this->config['url']['qr_url'];
        $result['transaction_id'] = $transaction_id;

        return $result;

    }

    protected function generateQRImageTag($requestString)
    {
        return '<img alt="Wechat Pay" src="' . $this->config['url']['qr_url'] . urlencode($requestString) . '" style="width:150px;height:150px;"/>';
    }

}