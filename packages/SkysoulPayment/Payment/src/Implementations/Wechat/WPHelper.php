<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;

use SkysoulDesign\Payment\Implementations\Wechat\Lib\WxPayException;
use SkysoulDesign\Payment\Implementations\Wechat\Lib\WxPayReport;
use SkysoulDesign\Payment\PaymentBuilder;

/**
 * Class WPHelper
 *
 * @package SkysoulDesign\Payment\Implementations\Wechat
 */
class WPHelper extends PaymentBuilder
{
    /*protected function GetPayUrl(array $input, $url, $timeOut = 6)
    {
        if ($input['trade_type'] == "NATIVE") {
            $result = $this->unifiedOrder($input, $url, $timeOut);

            return $result;
        }
    }

    protected function unifiedOrder(array $inputObj, $url, $timeOut = 6)
    {
        $inputObj['sign'] = $this->MakeSign($inputObj);

        $xml = $this->ToXml($inputObj);

        $startTimeStamp = $this->getMillisecond();
        $response = $this->postXmlCurl($xml, $url, false, $timeOut);
        $result = WxPayResults::Init($response);
        $this->reportCostTime($url, $startTimeStamp, $result);

        return $result;
    }*/

    public function MakeSign($array)
    {
        ksort($array);
        $string = $this->ToUrlParams($array);
        $string = $string . "&key=" . WP_KEY;
        $string = md5($string);
        $result = strtoupper($string);

        return $result;
    }

    public function ToUrlParams($array)
    {
        $buff = "";
        foreach ($array as $k => $v) {
            if ($k != "sign" && $v != "" && !is_array($v)) {
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");

        return $buff;
    }

    protected function ToXml($array)
    {
        if (!is_array($array) || count($array) <= 0) {
            throw new WxPayException("NO_INPUT_PARAMETERS！");
        }

        $xml = "<xml>";
        foreach ($array as $key => $val) {
            if (is_numeric($val)) {
                $xml .= "<" . $key . ">" . $val . "</" . $key . ">";
            } else {
                $xml .= "<" . $key . "><![CDATA[" . $val . "]]></" . $key . ">";
            }
        }
        $xml .= "</xml>";

        return $xml;
    }

    protected function report(WxPayReport $inputObj, $timeOut = 1)
    {
        $url = $this->getProp('config')['url']['report'];
        //检测必填参数
        if (!$inputObj->IsInterface_urlSet()) {
            throw new WxPayException("接口URL，缺少必填参数interface_url！");
        }
        if (!$inputObj->IsReturn_codeSet()) {
            throw new WxPayException("返回状态码，缺少必填参数return_code！");
        }
        if (!$inputObj->IsResult_codeSet()) {
            throw new WxPayException("业务结果，缺少必填参数result_code！");
        }
        if (!$inputObj->IsUser_ipSet()) {
            throw new WxPayException("访问接口IP，缺少必填参数user_ip！");
        }
        if (!$inputObj->IsExecute_time_Set()) {
            throw new WxPayException("接口耗时，缺少必填参数execute_time_！");
        }
        $inputObj->SetAppid(WP_APPID);//公众账号ID
        $inputObj->SetMch_id(WP_MCHID);//商户号
        $inputObj->SetUser_ip($_SERVER['REMOTE_ADDR']);//终端ip
        $inputObj->SetTime(date("YmdHis"));//商户上报时间
        $inputObj->SetNonce_str($this->getNonceStr());//随机字符串

        $inputObj->SetSign();//签名
        $xml = $inputObj->ToXml();

        $startTimeStamp = $this->getMillisecond();//请求开始时间
        $response = $this->postXmlCurl($xml, $url, false, $timeOut);

        return $response;
    }

    protected function getNonceStr($length = 32)
    {
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }

        return $str;
    }

    protected function reportCostTime($url, $startTimeStamp, $data)
    {
        if (WP_REPORT_LEVENL == 0) {
            return;
        }
        if (WP_REPORT_LEVENL == 1 &&
            array_key_exists("return_code", $data) &&
            $data["return_code"] == "SUCCESS" &&
            array_key_exists("result_code", $data) &&
            $data["result_code"] == "SUCCESS"
        ) {
            return;
        }

        $endTimeStamp = $this->getMillisecond();
        $objInput = new WxPayReport();
        $objInput->SetInterface_url($url);
        $objInput->SetExecute_time_($endTimeStamp - $startTimeStamp);
        if (array_key_exists("return_code", $data)) {
            $objInput->SetReturn_code($data["return_code"]);
        }
        if (array_key_exists("return_msg", $data)) {
            $objInput->SetReturn_msg($data["return_msg"]);
        }
        if (array_key_exists("result_code", $data)) {
            $objInput->SetResult_code($data["result_code"]);
        }
        if (array_key_exists("err_code", $data)) {
            $objInput->SetErr_code($data["err_code"]);
        }
        if (array_key_exists("err_code_des", $data)) {
            $objInput->SetErr_code_des($data["err_code_des"]);
        }
        if (array_key_exists("out_trade_no", $data)) {
            $objInput->SetOut_trade_no($data["out_trade_no"]);
        }
        if (array_key_exists("device_info", $data)) {
            $objInput->SetDevice_info($data["device_info"]);
        }

        try {
            $this->report($objInput);
        } catch (WxPayException $e) {
        }
    }

    protected function postXmlCurl($xml, $url, $useCert = false, $second = 30)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_TIMEOUT, $second);

        if (WP_CURL_PROXY_HOST != "0.0.0.0"
            && WP_CURL_PROXY_PORT != 0
        ) {
            curl_setopt($ch, CURLOPT_PROXY, WP_CURL_PROXY_HOST);
            curl_setopt($ch, CURLOPT_PROXYPORT, WP_CURL_PROXY_PORT);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);//严格校验
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($useCert == true) {
            curl_setopt($ch, CURLOPT_SSLCERTTYPE, 'PEM');
            curl_setopt($ch, CURLOPT_SSLCERT, WP_SSLCERT_PATH);
            curl_setopt($ch, CURLOPT_SSLKEYTYPE, 'PEM');
            curl_setopt($ch, CURLOPT_SSLKEY, WP_SSLKEY_PATH);
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        $data = curl_exec($ch);
        if ($data) {
            curl_close($ch);

            return $data;
        } else {
            $error = curl_errno($ch);
            curl_close($ch);
            throw new WxPayException("curl error:$error");
        }
    }

    protected function getMillisecond()
    {
        $time = explode(" ", microtime());
        $time = $time[1] . ($time[0] * 1000);
        $time2 = explode(".", $time);
        $time = $time2[0];

        return $time;
    }
}