<?php
namespace SkysoulDesign\Payment\Implementations\Unionpay;

use SkysoulDesign\Payment\PaymentBuilder;

/**
 * Class UPHelper
 *
 * @package SkysoulDesign\Payment\Implementations\Unionpay
 */
class UPHelper extends PaymentBuilder
{
    /** Common Utils */
    /**
     * key1=value1&key2=value2转array
     *
     * @param $str
     * @param $needUrlDecode
     * @return array
     */
    protected function parseQString($str, $needUrlDecode=false){
        $result = array();
        $len = strlen($str);
        $temp = "";
        $curChar = "";
        $key = "";
        $isKey = true;
        $isOpen = false;
        $openName = "\0";

        for($i=0; $i<$len; $i++){
            $curChar = $str[$i];
            if($isOpen){
                if( $curChar == $openName){
                    $isOpen = false;
                }
                $temp = $temp . $curChar;
            } elseif ($curChar == "{"){
                $isOpen = true;
                $openName = "}";
                $temp = $temp . $curChar;
            } elseif ($curChar == "["){
                $isOpen = true;
                $openName = "]";
                $temp = $temp . $curChar;
            } elseif ($isKey && $curChar == "="){
                $key = $temp;
                $temp = "";
                $isKey = false;
            } elseif ( $curChar == "&" && !$isOpen){
                $this->putKeyValueToDictionary($temp, $isKey, $key, $result, $needUrlDecode);
                $temp = "";
                $isKey = true;
            } else {
                $temp = $temp . $curChar;
            }
        }
        $this->putKeyValueToDictionary($temp, $isKey, $key, $result, $needUrlDecode);
        return $result;
    }


    protected function putKeyValueToDictionary($temp, $isKey, $key, &$result, $needUrlDecode) {
        if ($isKey) {
            $key = $temp;
            if (strlen ( $key ) == 0) {
                return false;
            }
            $result [$key] = "";
        } else {
            if (strlen ( $key ) == 0) {
                return false;
            }
            if ($needUrlDecode)
                $result [$key] = urldecode ( $temp );
            else
                $result [$key] = $temp;
        }
    }

    /**
     * @param $str
     * @return array
     */
    protected function convertStringToArray($str) {
        return $this->parseQString($str);
    }

    /**
     * @param $params
     */
    protected function deflate_file(&$params) {
        foreach ( $_FILES as $file ) {
            // ( "---------processing files---------" );
            if (file_exists ( $file ['tmp_name'] )) {
                $params ['fileName'] = $file ['name'];

                $file_content = file_get_contents ( $file ['tmp_name'] );
                $file_content_deflate = gzcompress ( $file_content );

                $params ['fileContent'] = base64_encode ( $file_content_deflate );
                // ( "compressed file contents>" . base64_encode ( $file_content_deflate ) );
            } else {
                // ( ">>>>file upload failed<<<<<" );
            }
        }
    }

    /** Secure Utils */
    /**
     * @param $params
     * @param $cert_path
     * @param $cert_pwd
     */
    protected function sign(&$params, $cert_path, $cert_pwd)
    {
        if (isset($params['signature'])) {
            unset($params['signature']);
        }
        // 转换成key=val&串
        $params_str = $this->createLinkString($params, true, false);

        $params_sha1x16 = sha1($params_str, false);

        $private_key = $this->getPrivateKey($cert_path, $cert_pwd);
        // 签名
        $sign_falg = openssl_sign($params_sha1x16, $signature, $private_key, OPENSSL_ALGO_SHA1);
        if ($sign_falg) {
            $signature_base64 = base64_encode($signature);
            $params ['signature'] = $signature_base64;
        } else {
            // ">>>>>签名失败<<<<<<<";
        }
//        '=====签名报文结束======';
    }

    /**
     * @param $params
     * @return int
     */
    protected function verify($params)
    {
        $public_key = $this->getPulbicKeyByCertId($params ['certId']);
        $signature_str = $params ['signature'];
        unset ($params ['signature']);
        $params_str = $this->createLinkString($params, true, false);
        $signature = base64_decode($signature_str);
        $params_sha1x16 = sha1($params_str, false);
        $isSuccess = openssl_verify($params_sha1x16, $signature, $public_key, OPENSSL_ALGO_SHA1);

        return $isSuccess;
    }

    /**
     * 根据证书ID 加载 证书
     *
     * @param $certId
     * @return string NULL
     */
    protected function getPulbicKeyByCertId($certId)
    {

        // 证书目录
        $cert_dir = SDK_VERIFY_CERT_DIR;
//        '验证签名证书目录 :>' . $cert_dir;
        $handle = opendir($cert_dir);
        if ($handle) {
            while ($file = readdir($handle)) {
                clearstatcache();
                $filePath = $cert_dir . '/' . $file;
                if (is_file($filePath)) {
                    if (pathinfo($file, PATHINFO_EXTENSION) == 'cer') {
                        if ($this->getCertIdByCerPath($filePath) == $certId) {
                            closedir($handle);

                            return $this->getPublicKey($filePath);
                        }
                    }
                }
            }
        } else {
//            '证书目录 ' . $cert_dir . '不正确';
        }
        closedir($handle);

        return null;
    }

    /**
     * @param $cert_path
     * @param $cert_pwd
     * @return mixed
     */
    protected function getSignCertId($cert_path, $cert_pwd)
    {
        $pkcs12certdata = file_get_contents($cert_path);
        openssl_pkcs12_read($pkcs12certdata, $certs, $cert_pwd);
        $x509data = $certs ['cert'];
        openssl_x509_read($x509data);
        $certdata = openssl_x509_parse($x509data);
        $cert_id = $certdata ['serialNumber'];

        return $cert_id;
    }

    /**
     * @param $cert_path
     * @return mixed
     */
    protected function getCertIdByCerPath($cert_path)
    {
        $x509data = file_get_contents($cert_path);
        openssl_x509_read($x509data);
        $certdata = openssl_x509_parse($x509data);
        $cert_id = $certdata ['serialNumber'];

        return $cert_id;
    }

    /**
     * @param $cert_path
     * @return string
     */
    protected function getPublicKey($cert_path)
    {
        return file_get_contents($cert_path);
    }

    /**
     * @param $cert_path
     * @param $cert_pwd
     * @return mixed
     */
    protected function getPrivateKey($cert_path = SDK_SIGN_CERT_PATH, $cert_pwd = SDK_SIGN_CERT_PWD)
    {
        $pkcs12 = file_get_contents($cert_path);
        openssl_pkcs12_read($pkcs12, $certs, $cert_pwd);

        return $certs ['pkey'];
    }

    /**
     * @param $sPin
     * @return array
     */
    protected function Pin2PinBlock(&$sPin)
    {
        $iTemp = 1;
        $sPinLen = strlen($sPin);
        $sBuf = array();
        $sBuf[0] = intval($sPinLen, 10);

        if ($sPinLen % 2 == 0) {
            for ($i = 0; $i < $sPinLen;) {
                $tBuf = substr($sPin, $i, 2);
                $sBuf[$iTemp] = intval($tBuf, 16);
                unset($tBuf);
                if ($i == ($sPinLen - 2)) {
                    if ($iTemp < 7) {
                        $t = 0;
                        for ($t = ($iTemp + 1); $t < 8; $t++)
                            $sBuf[$t] = 0xff;
                    }
                }
                $iTemp++;
                $i = $i + 2;    //linshi
            }
        } else {
            for ($i = 0; $i < $sPinLen;) {
                if ($i == ($sPinLen - 1)) {
                    $mBuf = substr($sPin, $i, 1) . "f";
                    $sBuf[$iTemp] = intval($mBuf, 16);
                    unset($mBuf);
                    if (($iTemp) < 7) {
                        $t = 0;
                        for ($t = ($iTemp + 1); $t < 8; $t++)
                            $sBuf[$t] = 0xff;
                    }
                } else {
                    $tBuf = substr($sPin, $i, 2);
                    $sBuf[$iTemp] = intval($tBuf, 16);
                    unset($tBuf);
                }
                $iTemp++;
                $i = $i + 2;
            }
        }

        return $sBuf;
    }

    /**
     * @param $sPan
     * @return array
     */
    protected function FormatPan(&$sPan)
    {
        $iPanLen = strlen($sPan);
        $iTemp = $iPanLen - 13;
        $sBuf = array();
        $sBuf[0] = 0x00;
        $sBuf[1] = 0x00;
        for ($i = 2; $i < 8; $i++) {
            $tBuf = substr($sPan, $iTemp, 2);
            $sBuf[$i] = intval($tBuf, 16);
            $iTemp = $iTemp + 2;
        }

        return $sBuf;
    }

    /**
     * @param $sPin
     * @param $sCardNO
     * @return int|string
     */
    protected function Pin2PinBlockWithCardNO(&$sPin, &$sCardNO)
    {
        $sPinBuf = $this->Pin2PinBlock($sPin);
        $iCardLen = strlen($sCardNO);
        if ($iCardLen <= 10) {
            return (1);
        } elseif ($iCardLen == 11) {
            $sCardNO = "00" . $sCardNO;
        } elseif ($iCardLen == 12) {
            $sCardNO = "0" . $sCardNO;
        }
        $sPanBuf = $this->FormatPan($sCardNO);
        $sBuf = array();

        for ($i = 0; $i < 8; $i++) {
            $sBuf[$i] = vsprintf("%c", ($sPinBuf[$i] ^ $sPanBuf[$i]));
        }
        unset($sPinBuf);
        unset($sPanBuf);
        $sOutput = implode("", $sBuf);

        return $sOutput;
    }

}