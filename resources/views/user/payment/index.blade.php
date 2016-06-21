@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('user.purchase-history')</h2>
        <div class="ui small menu">
            <div class="right menu">
                {{--<a class="item" href="{{ route('user.purchase.coin.create') }}">
                    <i class="add icon"></i>
                    @lang('profile.add-coin')
                </a>--}}
                <a id="purchase-coin" class="item view-modal" href="javascript:;">
                    <i class="add icon"></i>
                    @lang('profile.add-coin')
                </a>
                <a id="withdraw-coin" class="item view-modal" href="javascript:;">
                    <i class="external share icon"></i>
                    <i class="money icon"></i>
                    @lang('profile.withdraw-money')
                </a>

            </div>

        </div>
        <table class="ui celled table">
            <thead>
            <tr>
                <th colspan="4"></th>
            </tr>
            </thead>
            <tbody>
            @forelse($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->method }}</td>
                    <td>{{ $transaction->payment->getPrice() }}</td>
                    <td>{{ ucwords($transaction->type) }}</td>
                    <td>{{ trans('payment.' . $transaction->getStatus()) }}</td>
                </tr>
            @empty
                <tr>
                    <td>No Purchases</td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>
    @include('modals.withdraw-coin')
    @include('modals.add-coin')
    <div id="popup-modal" class="ui modal">
        <div class="content"></div>
    </div>
@endsection

@section('pos-scripts')
    <script>
        var payStatusUrls = {
            'purchase': "{{ route('user.purchase.index') }}"
        };
        $(document).ready(function () {

            $('.item.view-modal').each(function () {
                var id = $(this).attr('id');
                $('#' + id + '-modal')
                        .modal({
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                let form = $('#' + id + '-form');
                                form.api({
                                    action:     form.action,
                                    method:     'POST',
                                    on:         'now',
                                    data:       form.serialize(),
                                    onError:    function (errorMessage) {
                                        alert(errorMessage);
                                    },
                                    onResponse: function (response) {

                                        let message = '{{ trans('payment.error-occurred-unable-to-process') }}';
                                        if (!validateDataIsNull(response.message))
                                            message = response.message;

                                        if (response.result == 'ok') {

                                            if (response.buildForm) {

                                                let $form = document.createElement('form');

                                                for (let item in response.data) {
                                                    let input  = document.createElement('input');
                                                    input.name = item;
                                                    input.setAttribute('value', response.data[item]);

                                                    $form.appendChild(input);

                                                }

                                                $form.action = response.target;
                                                $form.method = 'post';
                                                $form.submit();
//                                            $(document.body).append($form);
                                                console.log($form);

                                            } else {
//                                            console.log(response)
                                                if (response.data['result_code'] == 'SUCCESS') {
                                                    let $form = '<div class="ui card centered">' +
                                                            '<div class="content">' +
                                                            '<span class="header" style="margin: auto;"><img src="{{ asset('img/logos/payment/wechat-logo.png') }}"' +
                                                            'style="width: 90px; height: 80px; padding: 5px;"/>{{ trans('payment.wechat-pay') }}' +
                                                            '</span>' +
                                                            '<div class="description">{{ trans('payment.wechat-scan-code') }}' +
                                                            '</div>' +
                                                            '</div>' +
                                                            '<div class="centered">' +
                                                            '<img alt="{{ trans('payment.wechat-scan-code') }}"' +
                                                            'src="' + response.data['qr_url'] + response.data['code_url'] + '"' +
                                                            'style="width:200px;height:200px;"/>' +
                                                            '</div>' +
                                                            '<div class="extra content">' +
                                                            '<img src="{{ asset('img/logos/payment/wechat-scan-text.png') }}"/>' +
                                                            '</div></div>';
                                                    $("#popup-modal .content").html($form);
                                                    $('#popup-modal').modal('show');
//                                                triggerEvent(response.data['unique_no']);
                                                } else {
                                                    alert(message);
                                                }

                                            }
                                        } else {
                                            alert(message)
                                        }

                                    }
                                })

//                                $('#' + id + '-form').submit();
                            }
                        })
                        .modal('attach events', '#' + id, 'show')
                ;
            });

        });
        function triggerEvent(unique_no) {
            var loop         = 1, limit = 15;
            var source       = new EventSource("{{ route('payment.enquiry_event') }}?unique_no=" + unique_no);
            source.onmessage = function (event) {
                if (event.data == 1) {
                    redirectPage(source, 'success')
                } else {
                    if (loop >= limit) {
                        redirectPage(source, 'pending')
                    }
                    $('#pay_status').val(event.data);
                    loop++;
                }
            };
        }
        function redirectPage(source, status) {
            var queryStr = '?status=' + status;
            source.close();
            window.location = payStatusUrls.purchase + queryStr;
        }
    </script>
@endsection