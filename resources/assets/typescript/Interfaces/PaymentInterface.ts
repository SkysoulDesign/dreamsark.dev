export interface PaymentInterface {
    gateway:string;
    result:string;
    target:string;
    method:string;
    data:{};
}

export interface AlipayInterface extends PaymentInterface {

    data:{
        _input_charset:string,
        body:string,
        notify_url:string,
        out_trade_no:string,
        partner:string,
        payment_type:string,
        return_url:string,
        seller_id:string,
        service:string,
        sign:string,
        sign_type:string,
        subject:string,
        total_fee:string,
    }

}

export interface UnionPayInterface extends PaymentInterface {

    data:{
        _input_charset:string
        body:string
        notify_url:string
        out_trade_no:string
        partner:string
        payment_type:string
        return_url:string
        seller_id:string
        service:string
        sign:string
        sign_type:string
        subject:string
        total_fee:string
    }
}

export interface WechatInterface extends PaymentInterface {

    data:{
        appid:string
        code_url:string
        mch_id:string
        nonce_str:string
        prepay_id:string
        qr_url:string
        result_code:string
        return_code:string
        return_msg:string
        sign:string
        trade_type:string
    }

}
