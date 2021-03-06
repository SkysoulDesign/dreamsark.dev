@extends('layouts.master')

@section('content')

    @include('admin.partials.header')

    {{--    @include('admin.partials.transaction-menu', ['route_name' => 'admin.transactions.purchases'])--}}


    <div class="row">

        <div class="small-12 columns">
            <header class="header --centered">
                Lorem ipsum dolor sit
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci delectus dicta dolores eaque
                    eveniet excepturi in laborum molestias nobis optio recusandae.</p>
            </header>
        </div>

        <div class="small-12 columns">
            @include('admin.transaction.purchase.partials.menu')
        </div>

        <div class="small-12 columns">
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
                @if($purchases->isEmpty())
                    <tr>
                        <td colspan="5">@lang('general.no-data')</td>
                    </tr>
                @else
                    @foreach($purchases as $transaction)
                        <tr>
                            <td>
                                {{ $transaction->unique_no }}<br/>
                                <b>@lang('payment.invoice-no'):</b> {{ $transaction->invoice_no }}<br/>
                                <b>@lang('payment.paid-on'):</b> {{ $transaction->updated_at->format('Y-m-d H:i A') }}
                                <br/>
                                @lang('payment.paid-through'): {{ ucwords($transaction->method) }}
                            </td>
                            <td>{{ $transaction->user->username }}</td>
                            <td>{{ $transaction->payment->getPrice() }}</td>
                            <td>{{ trans('payment.' . $transaction->getStatus()) }}</td>
                            <td class="actions" unique_id="{{ $transaction->id }}">
                                @if(!$transaction->is_canceled && !$transaction->paid)
                                    <a href="javascript:;" class="ui red status button"
                                       type="cancel">{{ trans('payment.cancel') }}</a>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                @endif
                </tbody>
                @include('partials.paginate-links', ['resultSet' => $purchases, 'colSpan' => 5])
            </table>
        </div>

    </div>

@endsection
