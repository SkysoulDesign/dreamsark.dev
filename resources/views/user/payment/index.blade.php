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
                <th colspan="3"></th>
            </tr>
            </thead>
            <tbody>
            @forelse($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->amount }}</td>
                    <td>{{ $transaction->method }}</td>
                    <td>{{ $transaction->is_payment_done }}</td>
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
@endsection

@section('pos-scripts')
    <script>
        $(document).ready(function () {
            /*if ($('#withdraw-coin-modal').length > 0)
             $('#withdraw-coin-modal')
             .modal({
             blurring:  true,
             closable:  false,
             onApprove: function () {
             $('#withdraw-coin-form').submit();
             }
             })
             .modal('attach events', '#withdraw-coin', 'show');*/
            $('.item.view-modal').each(function () {
                var id = $(this).attr('id');
                $('#' + id + '-modal')
                        .modal({
                            blurring: true,
                            closable: false,
                            onApprove: function () {

                                let form = $('#' + id + '-form');

//                                return form.submit();

                                form.api({
                                    action: form.action,
                                    method: 'POST',
                                    on: 'now',
                                    data: {
                                        "_token": '{{ csrf_token() }}',
                                        amount: form.find("input[name='amount']").val(),
                                        payment_method: form.find("input[name='payment_method']").val()
                                    },
                                    onResponse: function (response) {

                                        let $form = document.createElement('form');

                                        for (let item in response) {
                                            let input = document.createElement('input');
                                            input.name = item;
                                            input.setAttribute('value', response[item]);

                                            $form.appendChild(input);

                                        }

                                        $form.action = 'https://mapi.alipay.com/gateway.do';
                                        $form.method = 'post'
                                        $form.submit();
                                        console.log($form);

                                    }
                                })

//                                $('#' + id + '-form').submit();
                            }
                        })
                        .modal('attach events', '#' + id, 'show')
                ;
            });
        });
    </script>
@endsection