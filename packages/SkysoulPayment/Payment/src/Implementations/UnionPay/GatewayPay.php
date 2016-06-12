<?php

namespace SkysoulDesign\Payment\Implementations\Unionpay;

/**
 * Class GatewayPay
 *
 * @package SkysoulDesign\Payment\Implementations\Unionpay
 */
class GatewayPay extends UPHelper
{
    protected $config = [];
    protected $log;

    /**
     * GatewayPay constructor.
     */
    public function __construct()
    {
        $this->config = $this->getUnionpayConfig();
        $this->log = new PhpLog (SDK_LOG_FILE_PATH, "PRC", SDK_LOG_LEVEL);
    }

    /**
     * @param $params
     * @return string
     */
    public function doPaymentForm($params)
    {
        $transaction_id = $params['transaction_id'];
        unset($params['transaction_id']);

        $requestParams = $this->config;
        $requestParams['orderId'] = $params["out_trade_no"];
        $requestParams['txnTime'] = date('YmdHis');
        $requestParams['txnAmt'] = $params["total_fee"] * UP_CENT_CONVERT_RATE;
        $this->buildSign($requestParams);

        $this->updateTransactionMessage($transaction_id, ['request' => $this->createLinkString($params)]);

        return $this->createAutoFormHtml($requestParams, SDK_FRONT_TRANS_URL);
    }

    public function orderQuery($params)
    {
        $requestParams = $this->config;
        $requestParams['txnType'] = '00';
        $requestParams['txnSubType'] = '00';
//        $requestParams['channelType'] = '07';

        $requestParams['orderId'] = $params["out_trade_no"];
        $requestParams['txnTime'] = $params["order_date"];
        $this->buildSign($requestParams);

        return $this->postQuery($requestParams, SDK_SINGLE_QUERY_URL);

    }

    public function doWithdrawalForm($params){
        /** Withdrawal Event; Refer 6.3.3	请求报文 in technical specification DOC
         * not tested
         */
        $requestParams = $this->config;
        $requestParams['txnType'] = '31';
        $requestParams['txnSubType'] = '00';
        $requestParams['orderId'] = $params["out_trade_no"];
        $requestParams['origQryId'] = '201605311633003379058';
        $requestParams['txnTime'] = date('YmdHis');
        $requestParams['txnAmt'] = $params["total_fee"] * UP_CENT_CONVERT_RATE;
        $this->buildSign($requestParams);
        return $this->createAutoFormHtml($requestParams, SDK_FRONT_TRANS_URL);
    }

    protected function buildSign(&$params, $cert_path = SDK_SIGN_CERT_PATH, $cert_pwd = SDK_SIGN_CERT_PWD)
    {
        $params ['certId'] = $this->getSignCertId($cert_path, $cert_pwd); //证书ID
        $this->sign($params, $cert_path, $cert_pwd);
    }

    protected function postQuery($params, $url)
    {
        $opts = $this->createLinkString($params, false, true);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSLVERSION, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-type:application/x-www-form-urlencoded;charset=UTF-8'
        ));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $opts);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($curl);

        if (curl_errno($curl)) {
            $errmsg = curl_error($curl);
            curl_close($curl);

            return null;
        }
        if (curl_getinfo($curl, CURLINFO_HTTP_CODE) != "200") {
            $errmsg = "http=" . curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            return null;
        }
        curl_close($curl);
        $result_arr = $this->convertStringToArray($html);

        return $result_arr;
    }

    protected function getQuery($params, $url)
    {
        $opts = $this->createLinkString($params, false, true);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSLVERSION, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-type:application/x-www-form-urlencoded;charset=UTF-8'
        ));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $opts);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($curl);
        if (curl_errno($curl)) {
            $errmsg = curl_error($curl);
            curl_close($curl);

            return null;
        }
        if (curl_getinfo($curl, CURLINFO_HTTP_CODE) != "200") {
            $errmsg = "http=" . curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            return null;
        }
        curl_close($curl);

        return $html;
    }

    protected function createAutoFormHtml($params, $reqUrl)
    {//
        $encodeType = isset ($params ['encoding']) ? $params ['encoding'] : 'UTF-8';
        $html = <<<eot
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset={$encodeType}" />
</head>
<body onload="javascript:document.pay_form.submit();">
    <form id="pay_form" name="pay_form" action="{$reqUrl}" method="post">
	
eot;
        foreach ($params as $key => $value) {
            $html .= "<input type=\"hidden\" name=\"{$key}\" id=\"{$key}\" value=\"{$value}\" />\n";
        }
        $html .= <<<eot
    </form>
</body>
</html>
eot;

        return $html;
    }

}