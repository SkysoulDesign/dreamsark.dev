<?php
namespace SkysoulDesign\Payment\Implementations\Alipay;

use SkysoulDesign\Payment\PaymentBuilder;

/**
 * Class AlipayNotify
 *
 * @package SkysoulDesign\Payment\Implementations
 */
class AlipayNotify extends PaymentBuilder
{
    /**
     * HTTPS message authentication address
     */
    protected $https_verify_url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&';
    /**
     * HTTP message authentication address
     */
    protected $http_verify_url = 'http://notify.alipay.com/trade/notify_query.do?';
    /**
     * @var array
     */
    protected $config = [];

    /**
     * AlipayNotify constructor.
     */
    public function __construct()
    {
        $this->config = $this->getAlipayConfig();
    }

    /**
     * notify_url process
     *
     * @return bool
     */
    public function verifyNotify()
    {
        if (empty($_POST) || !$this->checkResponseParamCount($_POST)) {
            return false;
        } else {
            $isSign = $this->getSignVerify($_POST, $_POST["sign"]);
            $responseTxt = 'false';
            if (!empty($_POST["notify_id"])) {
                $responseTxt = $this->getResponse($_POST["notify_id"]);
            }

            if (preg_match("/true$/i", $responseTxt) && $isSign) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * return_url process
     *
     * @return bool
     */
    public function verifyReturn()
    {
        if (empty($_GET) || !$this->checkResponseParamCount($_GET)) {
            return false;
        } else {
            $isSign = $this->getSignVerify($_GET, $_GET["sign"]);
            $responseTxt = 'false';
            if (!empty($_GET["notify_id"])) {
                $responseTxt = $this->getResponse($_GET["notify_id"]);
            }

            if (preg_match("/true$/i", $responseTxt) && $isSign) {
                return true;
            } else {
                return false;
            }
        }
    }

    protected function checkResponseParamCount($request, $type = '')
    {
        $paramKeys = array_keys($request);
        /**
         * @var array $defaultParams
         * minimum response params expected to proceed
         */
        $defaultParams = ['is_success', 'sign_type', 'sign', 'out_trade_no', 'trade_status', 'trade_no'];
        if($type=='notify'){
            unset($defaultParams[0]);
            $defaultParams[] = 'notify_time';
            $defaultParams[] = 'notify_type';
            $defaultParams[] = 'notify_id';
        }

        return sizeof(array_intersect($defaultParams, $paramKeys)) == sizeof($defaultParams);
    }

    /**
     * @param $para_temp
     * @param $sign
     * @return bool
     */
    protected function getSignVerify($para_temp, $sign)
    {
        $para_filter = $this->paraFilter($para_temp);
        $para_sort = $this->argSort($para_filter);
        $prestr = $this->createLinkstring($para_sort);

        $isSign = false;
        switch (strtoupper(trim($this->config['sign_type']))) {
            case "RSA" :
                $isSign = $this->rsaVerify($prestr, trim($this->config['ali_public_key_path']), $sign);
                break;
            default :
                $isSign = false;
        }

        return $isSign;
    }

    /**
     * remote server ATN results verify the return URL
     *
     * @param $notify_id
     * @return mixed
     */
    protected function getResponse($notify_id)
    {
        $transport = strtolower(trim($this->config['transport']));
        $partner = trim($this->config['partner']);
        $verify_url = '';
        if ($transport == 'https') {
            $verify_url = $this->https_verify_url;
        } else {
            $verify_url = $this->http_verify_url;
        }
        $verify_url = $verify_url . "partner=" . $partner . "&notify_id=" . $notify_id;
        $responseTxt = $this->getHttpResponseGET($verify_url, $this->config['cacert']);

        return $responseTxt;
    }
}