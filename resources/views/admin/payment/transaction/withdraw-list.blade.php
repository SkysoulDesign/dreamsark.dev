@extends('layouts.master-admin')

@section('content')
    <h2>@lang('payment.withdraw-history')</h2>
    @include('admin.payment.transaction-list-partial', ['transactionList' => $withdrawals])
@endsection