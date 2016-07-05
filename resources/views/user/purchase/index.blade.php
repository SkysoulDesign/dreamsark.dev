@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">
        <div class="small-12 columns">
            <header class="header --full">
                Purchases
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam aliquid aspernatur autem
                    beatae culpa dolor dolore dolorem doloribus fugit illum iusto mollitia natus non, odit provident
                    quisquam ratione.</p>
                <div class="divider --straight"></div>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="section__nav --right">
                <li class="section__nav__item --active">
                    <a href="#">Purchase</a>
                </li>
                <li class="section__nav__item --active">
                    <a href="#">Withdraw</a>
                </li>
                <li class="section__nav__item --as-button">
                    <a href="#" data-modal-trigger="add-coin">Add Coins</a>
                </li>
                <li class="section__nav__item --as-button">
                    <a href="#" data-modal-trigger="withdraw-coin">Withdraw Coins</a>
                </li>
            </ul>
        </div>

        <div class="small-12 columns">
            @if($transactions->isEmpty())

                <div>
                    There isn't anything here, please make a purchase first to see some history
                </div>

            @else
                <table class="table --stack">
                    <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th class="--compact +center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($transactions as $transaction)
                        <tr>
                            <td>{{ $transaction->method }}</td>
                            <td>{{ $transaction->payment->getPrice() }}</td>
                            <td>{{ $transaction->getStatus() }}</td>
                            <td>{{ $transaction->created_at }}</td>
                            <td class="table__action">
                                <button class="button --small --primary">Details</button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
        </div>

    </div>

    <ark-modal trigger="add-coin">

        <form class="row align-center" method="post" action="{{ route('user.purchase.coin.store') }}">

            {{ csrf_field() }}

            <div class="small-12 columns form__content --rounded">

                <div class="row">

                    <h3 class="small-12 columns form__step">
                        <span>1</span>
                        Choose your favorite payment method
                    </h3>

                    <div class="small-12 columns form__field">
                        <select name="payment_method">
                            <option value="alipay">Alipay</option>
                            <option value="unionpay">UnionPay</option>
                            <option value="wechat">Wechat</option>
                        </select>
                    </div>

                    <h3 class="small-12 columns form__step">
                        <span>2</span>
                        Amount
                    </h3>

                    <div class="small-12 columns form__field">
                        <input type="number" name="amount" placeholder="Amount in yuan">
                    </div>

                    <div class="small-12 columns divider --simple"></div>

                    <div class="small-12 columns form__field +align-right +center-on-mobile">
                        <button type="submit" class="button --success --fit">Buy</button>
                    </div>

                    <div class="small-12 columns form__description +center-on-mobile">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto consequuntur
                        deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat, quas
                        sapiente similique, tempora! Aperiam, tempore!
                    </div>

                </div>

            </div>

        </form>

    </ark-modal>

@endsection

{{--<script>--}}
{{--var payStatusUrls = {--}}
{{--'purchase': "{{ route('user.purchase.index') }}"--}}
{{--};--}}
{{--$(document).ready(function () {--}}

{{--$('.item.view-modal').each(function () {--}}
{{--var id = $(this).attr('id');--}}
{{--$('#' + id + '-modal')--}}
{{--.modal({--}}
{{--blurring:  true,--}}
{{--closable:  false,--}}
{{--onApprove: function () {--}}
{{--let form = $('#' + id + '-form');--}}
{{--form.api({--}}
{{--action:     form.action,--}}
{{--method:     'POST',--}}
{{--on:         'now',--}}
{{--data:       form.serialize(),--}}
{{--onError:    function (errorMessage) {--}}
{{--showNotification(errorMessage);--}}
{{--},--}}
{{--onResponse: function (response) {--}}

{{--let message = '{{ trans('payment.error-occurred-unable-to-process') }}';--}}
{{--if (!validateDataIsNull(response.message))--}}
{{--message = response.message;--}}

{{--if (response.result == 'ok') {--}}

{{--if (response.buildForm) {--}}

{{--let $form = document.createElement('form');--}}
{{--$form.setAttribute('id', 'doPayment');--}}

{{--for (let item in response.data) {--}}
{{--let input  = document.createElement('input');--}}
{{--input.name = item;--}}
{{--input.setAttribute('value', response.data[item]);--}}

{{--$form.appendChild(input);--}}

{{--}--}}

{{--$form.action = response.target;--}}
{{--if (response.data['_input_charset'] != undefined && response.data['_input_charset'] != '')--}}
{{--$form.action += '?_input_charset=' + response.data['_input_charset'];--}}
{{--$form.method = 'post';--}}
{{--if (navigator.userAgent.indexOf("Firefox") != -1) {--}}
{{--$(document.body).append($form);--}}
{{--$('#doPayment').submit()--}}
{{--} else {--}}
{{--$form.submit();--}}
{{--}--}}
{{--console.log($form);--}}

{{--} else {--}}
{{--//                                            console.log(response)--}}
{{--if (response.data != undefined && response.data != '' && response.data['result_code'] == 'SUCCESS') {--}}
{{--let $form = '<div class="ui card centered">' +--}}
{{--'<div class="content">' +--}}
{{--'<span class="header" style="margin: auto;"><img src="{{ asset('img/logos/payment/wechat-logo.png') }}"' +--}}
{{--'style="width: 90px; height: 80px; padding: 5px;"/>{{ trans('payment.wechat-pay') }}' +--}}
{{--'</span>' +--}}
{{--'<div class="description">{{ trans('payment.wechat-scan-code') }}' +--}}
{{--'</div>' +--}}
{{--'</div>' +--}}
{{--'<div class="centered">' +--}}
{{--'<img alt="{{ trans('payment.wechat-scan-code') }}"' +--}}
{{--'src="' + response.data['qr_url'] + response.data['code_url'] + '"' +--}}
{{--'style="width:200px;height:200px;"/>' +--}}
{{--'</div>' +--}}
{{--'<div class="extra content">' +--}}
{{--'<img src="{{ asset('img/logos/payment/wechat-scan-text.png') }}"/>' +--}}
{{--'</div></div>';--}}
{{--$("#popup-modal .content").html($form);--}}
{{--$('#popup-modal').modal('show');--}}
{{--//                                                triggerEvent(response.data['unique_no']);--}}
{{--} else {--}}
{{--showNotification(message);--}}
{{--window.location = window.location.href;--}}
{{--}--}}

{{--}--}}
{{--} else {--}}
{{--showNotification(message)--}}
{{--}--}}

{{--}--}}
{{--})--}}

{{--//                                $('#' + id + '-form').submit();--}}
{{--}--}}
{{--})--}}
{{--.modal('attach events', '#' + id, 'show')--}}
{{--;--}}
{{--});--}}

{{--});--}}
{{--function showNotification(message) {--}}
{{--$('.notifyContainer .message').html(message)--}}
{{--$('.notifyContainer').fadeToggle(500);--}}
{{--}--}}
{{--function triggerEvent(unique_no) {--}}
{{--var loop         = 1, limit = 15;--}}
{{--var source       = new EventSource("{{ route('payment.enquiry_event') }}?unique_no=" + unique_no);--}}
{{--source.onmessage = function (event) {--}}
{{--if (event.data == 1) {--}}
{{--redirectPage(source, 'success')--}}
{{--} else {--}}
{{--if (loop >= limit) {--}}
{{--redirectPage(source, 'pending')--}}
{{--}--}}
{{--$('#pay_status').val(event.data);--}}
{{--loop++;--}}
{{--}--}}
{{--};--}}
{{--}--}}
{{--function redirectPage(source, status) {--}}
{{--var queryStr = '?status=' + status;--}}
{{--source.close();--}}
{{--window.location = payStatusUrls.purchase + queryStr;--}}
{{--}--}}
{{--</script>--}}
