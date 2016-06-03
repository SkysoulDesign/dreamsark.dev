@extends('layouts.master-user')

@section('content')
    {{--<pre>--}}
    {{--{{ print_r($wechatData) }}--}}
    {{--</pre>--}}
    <div class="ui container">
        <h2 class="ui block header">
            <img class="ui image" src="{{ asset('dreamsark-assets/coin.png') }}">
            <div class="content" style="border: 0px;">
                @lang('payment.scan-and-pay-to-complete-purchase')
            </div>
            <div class="ui right aligned bottom attached">@lang('payment.amount'): {{ $transaction->amount }}</div>
        </h2>
        <div class="qrPayContainer">
            <h2><img src="{{ asset('img/logos/payment/wechat-logo.png') }}"
                     style="width: 90px; height: 80px; padding: 5px;"/>@lang('payment.wechat-pay')</h2>
            <div style="margin-left: 10px;color:#556B2F;font-size:20px;font-weight: bolder;">@lang('payment.wechat-scan-code')
            </div>
            <br>
            <img alt="@lang('payment.wechat-scan-code')" src="{{ $wechatData['qr_get_url'].$wechatData['code_url'] }}"
                 style="width:200px;height:200px;"/>
            <br/>
            <img src="{{ asset('img/logos/payment/wechat-scan-text.png') }}"/>
        </div>
    </div>
    {{--<form class="ui form" action="{{ route('payment.wechat.scan_code.event') }}" method="post">
        <input type="hidden" name="unique_no" value="{{ $transaction->unique_no }}">
        <input type="hidden" name="invoice_no" value="{{ $transaction->invoice_no }}">
        <input type="text" readonly style="width: 300px;" name="pay_status" id="pay_status" value="">
    </form>--}}
@endsection

@section('pos-scripts')
    <script type="text/javascript">
        $(document).ready(function () {
            var payStatusUrls = {
                'success': "{{ route('payment.status', 'success') }}",
                'pending': "{{ route('payment.status', 'pending') }}",
                'fail':    "{{ route('payment.status', 'error') }}"
            };
            var loop          = 1, limit = 5;
            var source        = new EventSource("{{ route('payment.wechat.scan_code.event') }}?unique_no={{ $transaction->unique_no }}");
            source.onmessage  = function (event) {
                if (event.data == 1) {
                    source.close();
                    window.location = payStatusUrls.success;
                } else {
                    /*if (loop >= limit)
                     window.location = payStatusUrls.pending;*/
                    $('#pay_status').val(event.data);
                    loop++;
                }
            };
        });
    </script>
@endsection