@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('user.purchase-history')</h2>
        <div class="ui small menu">
            <div class="right menu">
                <a class="item" href="{{ route('user.purchase.coin.create') }}">
                    <i class="add icon"></i>
                    @lang('profile.add-coin')
                </a>
                <a id="withdraw-coin" class="item" href="javascript:;">
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
            <tr>
                <td>@lang('profile.no-purchase')</td>
            </tr>
            </tbody>
        </table>
    </div>
    @include('modals.withdraw-coin')
@endsection

@section('pos-scripts')
    <script>
        $(document).ready(function () {
            if ($('#withdraw-coin-modal').length > 0)
                $('#withdraw-coin-modal')
                        .modal({
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                $('#withdraw-coin-form').submit();
                            }
                        })
                        .modal('attach events', '#withdraw-coin', 'show');
        });
    </script>
@endsection