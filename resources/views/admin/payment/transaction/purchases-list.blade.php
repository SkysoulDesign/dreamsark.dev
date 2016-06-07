@extends('layouts.master-admin')

@section('content')
    <h2>@lang('payment.purchase-history')</h2>
    @include('admin.payment.transaction-list-partial', ['transactionList' => $purchases])
@endsection