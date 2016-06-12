<?php
namespace SkysoulDesign\Payment\Implementations\Wechat\Lib;

use Exception;

class WxPayException extends Exception {
	public function errorMessage()
	{
		return $this->getMessage();
	}
}
