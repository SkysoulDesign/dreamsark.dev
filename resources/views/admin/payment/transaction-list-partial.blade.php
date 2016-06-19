<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('payment.order-no')</th>
        <th>@lang('payment.user')</th>
        <th>@lang('payment.amount')</th>
        <th>@lang('payment.is-done')</th>
        <th>@lang('payment.request')</th>
        <th>@lang('payment.response')</th>
    </tr>
    </thead>
    <tbody>
    @if($transactionList->isEmpty())
        <tr>
            <td colspan="6">@lang('general.no-data')</td>
        </tr>
    @else
        @foreach($transactionList as $transaction)
            <tr>
                <td>
                    {{ $transaction->unique_no }}<br/>
                    <b>@lang('payment.invoice-no'):</b> {{ $transaction->invoice_no }}<br/>
                    <b>@lang('payment.paid-on'):</b> {{ $transaction->updated_at->format('Y-m-d H:i A') }}<br/>
                    @lang('payment.paid-through'): {{ $transaction->pay_method }}
                </td>
                <td>{{ $transaction->user->username }}</td>
                <td>{{ $transaction->amount }}</td>
                <td>{{ $transaction->paid }}</td>
                <td>
                    <div style="width: 120px; height: 120px; overflow: auto; word-wrap: break-word;">
                        {{ $transaction->messages ? $transaction->messages->request : '' }}
                    </div>
                </td>
                <td>
                    <div style="width: 120px; height: 120px; overflow: auto; word-wrap: break-word;">
                        {{ $transaction->messages ? $transaction->messages->response : '' }}
                    </div>
                </td>
            </tr>
        @endforeach
    @endif
    </tbody>
    @include('partials.paginate-links', ['resultSet' => $transactionList, 'colSpan' => 6])
</table>