@extends('layouts.master-admin')

@section('content')
    <h2>@lang('payment.withdraw-history')</h2>
    @include('admin.partials.transaction-menu', ['route_name' => 'admin.transactions.withdraw'])
    <div class="ui message info">
        @lang('payment.you-need-to-be-already-logged-in-alipay-to-approve')&nbsp;<a target="_blank" href="https://enterpriseportal.alipay.com/index.htm">@lang('payment.alipay')</a>
    </div>
    <table class="ui celled table">
        <thead>
        <tr>
            <th>@lang('payment.order-no')</th>
            <th>@lang('payment.user')</th>
            <th>@lang('payment.amount')</th>
            <th>@lang('payment.is-done')</th>
            <th>@lang('payment.action')</th>
        </tr>
        </thead>
        <tbody>
        @if($withdrawals->isEmpty())
            <tr>
                <td colspan="5">@lang('general.no-data')</td>
            </tr>
        @else
            @foreach($withdrawals as $transaction)
                <tr>
                    <td>
                        {{ $transaction->unique_no }}<br/>
                        <b>@lang('payment.invoice-no'):</b> {{ $transaction->invoice_no }}<br/>
                        <b>@lang('payment.paid-on'):</b> {{ $transaction->updated_at->format('Y-m-d H:i A') }}<br/>
                        @lang('payment.paid-through'): {{ ucwords($transaction->method) }}
                    </td>
                    <td>{{ $transaction->user->username }}</td>
                    <td>{{ $transaction->payment->getPrice() }}</td>
                    <td>{{ trans('payment.' . $transaction->getStatus()) }}</td>
                    <td class="actions" unique_id="{{ $transaction->id }}">
                        @if(!$transaction->is_canceled && !$transaction->paid)
                            <a href="javascript:;" class="ui green status button"
                               type="approve">{{ trans('payment.approve') }}</a>
                            <a href="javascript:;" class="ui red status button"
                               type="cancel">{{ trans('payment.cancel') }}</a>
                        @endif
                    </td>
                </tr>
            @endforeach
        @endif
        </tbody>
        @include('partials.paginate-links', ['resultSet' => $withdrawals, 'colSpan' => 5])
    </table>
@endsection

@include('admin.payment.transaction.pos-script-partial')