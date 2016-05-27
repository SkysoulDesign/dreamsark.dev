<?php

namespace SkysoulDesign\Payment;


use DOMDocument;
use DreamsArk\Jobs\Payment\UpdateTransactionMessageJob;

/**
 * Class PaymentBuilder
 *
 * @package SkysoulDesign\Payment
 */
abstract class PaymentBuilder
{

    protected function getAlipayConfig()
    {

        $keyPath = dirname(__FILE__) . '/Implementations/Key/Alipay/';

        return [
            'gatewayUrl'          => "https://mapi.alipay.com/gateway.do?",
            'partner'             => config('defaults.payment_credentials.alipay.partner_id'),
            'seller_id'           => config('defaults.payment_credentials.alipay.partner_id'),
            'private_key_path'    => $keyPath . 'rsa_private_key.pem',
            'ali_public_key_path' => $keyPath . 'alipay_public_key.pem',
            'notify_url'          => route('payment.alipay.notify'),
            'return_url'          => route('payment.alipay.status'),
            'sign_type'           => strtoupper('RSA'),
            'input_charset'       => strtolower("utf-8"),
            'cacert'              => $keyPath . 'cacert.pem',
            'transport'           => "http",
            'payment_type'        => "1",
            'service'             => "create_direct_pay_by_user",
            'anti_phishing_key'   => "",
            'exter_invoke_ip'     => "",
        ];
    }

    /**
     * @param $property
     * @param null $default
     * @return null
     */
    protected function getProp($property, $default = null)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }

        return $default;
    }

    public function updateTransactionMessage($transaction_id, $messageArr)
    {
        dispatch(new UpdateTransactionMessageJob($transaction_id, $messageArr));
    }

    /** Core Methods for Alipay */
    /**
     * @param $para
     * @return string
     */
    protected function createLinkstring($para)
    {
        $arg = "";
        while (list ($key, $val) = each($para)) {
            $arg .= $key . "=" . $val . "&";
        }
        $arg = substr($arg, 0, count($arg) - 2);
        if (get_magic_quotes_gpc()) {
            $arg = stripslashes($arg);
        }

        return $arg;
    }

    /**
     * @param $para
     * @return string
     */
    protected function createLinkstringUrlencode($para)
    {
        $arg = "";
        while (list ($key, $val) = each($para)) {
            $arg .= $key . "=" . urlencode($val) . "&";
        }
        $arg = substr($arg, 0, count($arg) - 2);
        if (get_magic_quotes_gpc()) {
            $arg = stripslashes($arg);
        }

        return $arg;
    }

    /**
     * @param $para
     * @return array
     */
    protected function paraFilter($para, $urlDecode = false)
    {
        $para_filter = array();
        while (list ($key, $val) = each($para)) {
            if ($key == "sign" || $key == "sign_type" || $val == "") continue;
            else    $para_filter[$key] = ($urlDecode ? urldecode($para[$key]) : $para[$key]);
        }

        return $para_filter;
    }

    /**
     * @param $para
     * @return mixed
     */
    protected function argSort($para)
    {
        ksort($para);
        reset($para);

        return $para;
    }

    /**
     * @param string $word
     */
    protected function logResult($word = '')
    {
        $fp = fopen("log.txt", "a");
        flock($fp, LOCK_EX);
        fwrite($fp, "执行日期：" . strftime("%Y%m%d%H%M%S", time()) . "\n" . $word . "\n");
        flock($fp, LOCK_UN);
        fclose($fp);
    }


    /**
     * @param $url
     * @param $cacert_url
     * @param $para
     * @param string $input_charset
     * @return mixed
     */
    protected function getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '')
    {
        if (trim($input_charset) != '') {
            $url = $url . "_input_charset=" . $input_charset;
        }
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);//SSL证书认证
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);//严格认证
        curl_setopt($curl, CURLOPT_CAINFO, $cacert_url);//证书地址
        curl_setopt($curl, CURLOPT_HEADER, 0); // 过滤HTTP头
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);// 显示输出结果
        curl_setopt($curl, CURLOPT_POST, true); // post传输数据
        curl_setopt($curl, CURLOPT_POSTFIELDS, $para);// post传输数据
        $responseText = curl_exec($curl);
        //var_dump( curl_error($curl) );//如果执行curl过程中出现异常，可打开此开关，以便查看异常内容
        curl_close($curl);

        return $responseText;
    }


    /**
     * @param $url
     * @param $cacert_url
     * @return mixed
     */
    protected function getHttpResponseGET($url, $cacert_url)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, 0); // 过滤HTTP头
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);// 显示输出结果
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);//SSL证书认证
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);//严格认证
        curl_setopt($curl, CURLOPT_CAINFO, $cacert_url);//证书地址
        $responseText = curl_exec($curl);
        curl_close($curl);

        return $responseText;
    }


    /**
     * @param $input
     * @param $_output_charset
     * @param $_input_charset
     * @return mixed|string
     */
    protected function charsetEncode($input, $_output_charset, $_input_charset)
    {
        $output = "";
        if (!isset($_output_charset)) $_output_charset = $this->getProp('config')['input_charset'];
        if ($_input_charset == $_output_charset || $input == null) {
            $output = $input;
        } elseif (function_exists("mb_convert_encoding")) {
            $output = mb_convert_encoding($input, $_output_charset, $_input_charset);
        } elseif (function_exists("iconv")) {
            $output = iconv($_input_charset, $_output_charset, $input);
        } else die("sorry, you have no libs support for charset change.");

        return $output;
    }

    /**
     * @param $input
     * @param $_input_charset
     * @param $_output_charset
     * @return mixed|string
     */
    protected function charsetDecode($input, $_input_charset, $_output_charset)
    {
        $output = "";
        if (!isset($_input_charset)) $_input_charset = $this->getProp('config')['input_charset'];
        if ($_input_charset == $_output_charset || $input == null) {
            $output = $input;
        } elseif (function_exists("mb_convert_encoding")) {
            $output = mb_convert_encoding($input, $_output_charset, $_input_charset);
        } elseif (function_exists("iconv")) {
            $output = iconv($_input_charset, $_output_charset, $input);
        } else die("sorry, you have no libs support for charset changes.");

        return $output;
    }

    /**
     * @return string
     */
    protected function query_timestamp()
    {
        $url = $this->getProp('config')['gatewayUrl'] . "service=query_timestamp&partner=" . trim(strtolower($this->getProp('config')['partner'])) . "&_input_charset=" . trim(strtolower($this->getProp('config')['input_charset']));
        $encrypt_key = "";
        $doc = new DOMDocument();
        $doc->load($url);
        $itemEncrypt_key = $doc->getElementsByTagName("encrypt_key");
        $encrypt_key = $itemEncrypt_key->item(0)->nodeValue;

        return $encrypt_key;
    }

    /** RSA related methods */
    protected function rsaSign($data, $private_key_path)
    {
        $priKey = file_get_contents($private_key_path);
        $res = openssl_get_privatekey($priKey);
        openssl_sign($data, $sign, $res);
        openssl_free_key($res);
        $sign = base64_encode($sign);

        return $sign;
    }

    /**
     * @param $data
     * @param $ali_public_key_path
     * @param $sign
     * @return bool
     */
    protected function rsaVerify($data, $ali_public_key_path, $sign)
    {
        $pubKey = file_get_contents($ali_public_key_path);
        $res = openssl_get_publickey($pubKey);
        $result = (bool)openssl_verify($data, base64_decode($sign), $res);
        openssl_free_key($res);

        return $result;
    }

    /**
     * @param $content
     * @param $private_key_path
     * @return string
     */
    protected function rsaDecrypt($content, $private_key_path)
    {
        $priKey = file_get_contents($private_key_path);
        $res = openssl_get_privatekey($priKey);
        $content = base64_decode($content);
        $result = '';
        for ($i = 0; $i < strlen($content) / 128; $i++) {
            $data = substr($content, $i * 128, 128);
            openssl_private_decrypt($data, $decrypt, $res);
            $result .= $decrypt;
        }
        openssl_free_key($res);

        return $result;
    }
}