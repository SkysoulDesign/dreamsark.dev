@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">
        <div class="small-12 columns">
            <header class="header --full">
                Purchases
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam aliquid aspernatur autem
                    beatae culpa dolor dolore dolorem doloribus fugit illum iusto mollitia natus non, odit provident
                    quisquam ratione.</p>
                <div class="divider --straight"></div>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="section__nav --right">
                <li class="section__nav__item --active">
                    <a href="#">Purchase</a>
                </li>
                <li class="section__nav__item --active">
                    <a href="#">Withdraw</a>
                </li>
                <li class="section__nav__item --as-button">
                    <a href="#" data-modal-trigger="add-coin">Add Coins</a>
                </li>
                <li class="section__nav__item --as-button">
                    <a href="#" data-modal-trigger="withdraw-coin">Withdraw Coins</a>
                </li>
            </ul>
        </div>

        <div class="small-12 columns">
            @if($transactions->isEmpty())

                <div>
                    There isn't anything here, please make a purchase first to see some history
                </div>

            @else
                <table class="table --stack">
                    <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th class="--compact +center">Action</th>
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
                                <button class="button --small --primary">Details</button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
        </div>

    </div>

    <ark-modal trigger="add-coin">

        <form id="purchase-coin" class="row align-center" method="post"
              action="{{ route('user.purchase.coin.store') }}">

            {{ csrf_field() }}

            <div class="small-12 columns form__content --rounded">

                <div class="row">

                    <h3 class="small-12 columns form__step">
                        <span>1</span>
                        Choose your favorite payment method
                    </h3>

                    <div class="small-12 columns form__field">
                        <select name="payment_method">
                            <option value="alipay">Alipay</option>
                            <option value="unionpay">UnionPay</option>
                            <option value="wechat">Wechat</option>
                        </select>
                    </div>

                    <h3 class="small-12 columns form__step">
                        <span>2</span>
                        Amount
                    </h3>

                    <div class="small-12 columns form__field">
                        <input type="number" name="amount" placeholder="Amount in yuan">
                    </div>

                    <div class="small-12 columns divider --simple"></div>

                    <div class="small-12 columns form__field +align-right +center-on-mobile">
                        <button type="submit" class="button --success --fit">Buy</button>
                    </div>

                    <div class="small-12 columns form__description +center-on-mobile">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto consequuntur
                        deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat, quas
                        sapiente similique, tempora! Aperiam, tempore!
                    </div>

                </div>

            </div>

        </form>

    </ark-modal>

@endsection

