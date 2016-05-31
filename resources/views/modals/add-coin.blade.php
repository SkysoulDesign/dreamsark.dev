<div id="purchase-coin-modal" class="ui modal">
    <div class="header">
        @lang('profile.add-coin-to-bag')
    </div>
    <div class="content">
        <form id="purchase-coin-form" class="ui form error" action="{{ route('user.purchase.coin.store') }}" method="post">

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
            {{--<button class="ui olive button" type="submit">@lang('forms.process')</button>--}}

        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.submit')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>