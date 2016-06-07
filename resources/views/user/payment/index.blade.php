@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('user.purchase-history')</h2>
        <div class="ui small menu">
            <div class="right menu">
                {{--<a class="item" href="{{ route('user.purchase.list', 'pending') }}">
                    <i class="payment icon"></i>
                    @lang('payment.pending-list')
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
                <th>@lang('payment.order-no')</th>
                <th>@lang('payment.type')</th>
                <th>@lang('payment.amount')</th>
                <th>@lang('payment.is-done')</th>
            </tr>
            </thead>
            <tbody>
            @if($transactionList->isEmpty())
                <tr>
                    <td colspan="4">@lang('profile.no-purchase')</td>
                </tr>
            @else
                @foreach($transactionList as $transaction)
                    <tr>
                        <td>
                            {{ $transaction->unique_no }}<br/>
                            <b>@lang('payment.invoice-no'):</b> {{ $transaction->invoice_no }}<br />
                            <b>@lang('payment.paid-on'):</b> {{ $transaction->updated_at->format('Y-m-d H:i A') }}<br />
                            @lang('payment.paid-through'): {{ $transaction->pay_method }}
                        </td>
                        <td>{{ ucwords($transaction->type) }}</td>
                        <td>{{ $transaction->amount }}</td>
                        <td>{{ $transaction->is_payment_done }}</td>
                    </tr>
                @endforeach
            @endif
            </tbody>
            @include('partials.paginate-links', ['resultSet' => $transactionList, 'colSpan' => 4])
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
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                $('#' + id + '-form').submit();
                            }
                        })
                        .modal('attach events', '#' + id, 'show')
                ;
            });
        });
    </script>
@endsection