<?php
namespace SkysoulDesign\Payment\Implementations\Wechat\Lib;

class WxPayConfig
{
	const APPID = 'wx426b3015555a46be';
	const MCHID = '1225312702';
	const KEY = 'e10adc3949ba59abbe56e057f20f883e';
	const APPSECRET = '01c6d59a3f9024db6336662ac95c8e74';
	
	const SSLCERT_PATH = '../cert/apiclient_cert.pem';
	const SSLKEY_PATH = '../cert/apiclient_key.pem';
	
	const CURL_PROXY_HOST = "0.0.0.0";//"10.152.18.220";
	const CURL_PROXY_PORT = 0;//8080;
	
	const REPORT_LEVENL = 1;
}
