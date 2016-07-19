@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">
        <div class="small-12 columns">
            <header class="header --full">
                @lang('user.purchases')
                <p>@lang('user.purchases-description')</p>
                <div class="divider --straight"></div>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="ul --inline --bold --right">
                <li class="li --active">
                    <a href="#">@lang('payment.purchase')</a>
                </li>
                <li>
                    <a href="#">@lang('payment.withdraw')</a>
                </li>
                <li>
                    <a class="button --primary --medium" href="#" data-modal-trigger="add-coin">
                        @lang('payment.add-coins')
                    </a>
                </li>
                <li>
                    <a class="button --primary --medium" href="#" data-modal-trigger="withdraw-coin">
                        @lang('payment.withdraw-coins')
                    </a>
                </li>
            </ul>

        </div>

        <div class="small-12 columns">
            @if($transactions->isEmpty())

                <div>@lang('payment.no-purchase')</div>

            @else
                <table class="table --stack">
                    <thead>
                    <tr>
                        <th>@lang('payment.vendor')</th>
                        <th>@lang('payment.amount')</th>
                        <th>@lang('payment.status')</th>
                        <th>@lang('payment.date')</th>
                        <th class="--compact +center">@lang('forms.action')</th>
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
                                <button class="button --small --primary">@lang('payment.detail')</button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
        </div>

    </div>

    <ark-modal trigger="add-coin" header="@lang('Add Coin Form')">

        <form id="purchase-coin" class="row align-center" method="post"
              action="{{ route('user.purchase.coin.store') }}">

            {{ csrf_field() }}

            <div class="small-12 columns form__content --rounded">

                <div class="row">

                    <h3 class="small-12 columns form__step">
                        <span>1</span>
                        @lang('payment.choose-method')
                    </h3>

                    <div class="small-12 columns form__field">
                        <select name="payment_method">
                            <option value="alipay">@lang('payment.alipay')</option>
                            <option value="unionPay">@lang('payment.unionpay')</option>
                            <option value="wechat">@lang('payment.wechat')</option>
                        </select>
                    </div>

                    <h3 class="small-12 columns form__step">
                        <span>2</span>
                        @lang('payment.amount')
                    </h3>

                    <div class="small-12 columns form__field">
                        <input type="number" name="amount" placeholder="{{ trans('payment.amount-sample') }}">
                    </div>

                    <div class="small-12 columns divider --simple"></div>

                    <div class="small-12 columns form__field +align-right +center-on-mobile">
                        <button type="submit" class="button --success --fit">@lang('payment.buy')</button>
                    </div>

                    <div class="small-12 columns form__description +center-on-mobile">
                       @lang('payment.add-coin-modal-footer')
                    </div>

                </div>

            </div>

        </form>

    </ark-modal>

@endsection

