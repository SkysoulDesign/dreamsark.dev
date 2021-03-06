<form class="ui form error" action="{{ route('user.purchase.coin.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'amount', 'label'=> trans('payment.coins'), 'type' => 'number'])

    @include('partials.select-with-icon',
    [
        'name' => 'payment_method',
        'placeholder' => trans('payment.select-payment-method'),
        'collection' => [
            'alipay' => [trans('payment.alipay'), 'stripe icon'],
            'wechat' => [trans('payment.wechat'), 'wechat icon'],
            'unionpay' => [trans('payment.union-pay'), 'payment icon'],
        ]
    ])
    {{--'qq' => [trans('payment.qq'), 'qq icon']--}}

    <button class="ui olive button" type="submit">@lang('forms.process')</button>

</form>