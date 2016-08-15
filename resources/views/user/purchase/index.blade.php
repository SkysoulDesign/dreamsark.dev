@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.purchases')
                <p>@lang('user.purchases-description')</p>
            </header>
        </div>

        <div class="small-10 segment --transparent +margin-top-small">
            <ul class="ul --inline --right">
                <li>
                    <a class="button --color-primary" href="#" data-modal-trigger="add-coin">
                        @lang('payment.add-coins')
                    </a>
                </li>
                <li>
                    <a class="button --color-primary" href="#" data-modal-trigger="withdraw-coin">
                        @lang('payment.withdraw-coins')
                    </a>
                </li>
            </ul>

        </div>

        <div class="small-10 columns segment --color-primary --attached --centered --large-padding +no-round-bottom">

            <ark-statistics class="align-center" size="large">
                <statistic-item data="{{ $user->bag->coins }}">@lang('payment.coins')</statistic-item>
            </ark-statistics>

        </div>

        <div class="small-10">
            @if($transactions->isEmpty())
                <div class="message --centered --large-padding --color-primary">
                    @lang('payment.no-purchase')
                    <h2>
                        <a href="#" data-modal-trigger="add-coin">
                            @lang('general.purchase-coins')
                        </a>
                    </h2>
                </div>
            @else
                <table class="table --attached-top">
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

    <ark-modal v-cloak trigger="add-coin" header="@lang('payment.add-coins')">

        <ark-form id="purchase-coin" class="row align-center +padding-top-small"
                  action="{{ route('user.purchase.coin.store') }}">

            <ark-form-step>
                @lang('payment.choose-method')
            </ark-form-step>

            <div class="form__field">
                <select name="payment_method">
                    <option value="alipay">@lang('payment.alipay')</option>
                    <option value="unionPay">@lang('payment.unionpay')</option>
                    <option value="wechat">@lang('payment.wechat')</option>
                </select>
            </div>

            <ark-form-step>
                @lang('payment.amount')
            </ark-form-step>

            <ark-input type="number" name="amount" placeholder="{{ trans('payment.amount-sample') }}"></ark-input>

            <div class="small-12 columns divider --simple"></div>

            <ark-button color="success">
                @lang('payment.buy')
            </ark-button>

            <div class="small-12 columns form__description +center-on-mobile">
                @lang('payment.add-coin-modal-footer')
            </div>

        </ark-form>

    </ark-modal>

@endsection

