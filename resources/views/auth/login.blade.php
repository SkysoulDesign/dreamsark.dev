@extends('layouts.master')

@section('content')

    <div class="container">
        <div class="segment --1">test</div>
        <div class="segment --2">2</div>
    </div>

    <div class="segment">

    <ark-form action="{{ route('login.store') }}">

    </ark-form>

    </div>

    <section class="segment medium-4 column">

    <form action="{{ route('login.store') }}" method="POST">

    {{ csrf_field() }}

    <div class="field">
    <input name="login" type="text" placeholder="username or email">
    </div>

    <div class="field">
    <input name="password" type="password" placeholder="password">
    </div>

    @include('partials.form-errors')

    <div class="field">
    @include('components.button-ripple', ['text' => 'Login', 'attributes' => ['type' => 'submit']])
    </div>

    </form>

    </section>
@endsection

@section('scripts')
    {{--var hello = "hello"--}}
@endsection

@section('contents')

    <div class="row">

        <section class="medium-8 column">
            <div class="segment"></div>
        </section>

        <section class="medium-4 column">

            <div class="segment has-attachment">

                <div class="title modern center">Member Login</div>


                <div class="title simple center">or login with</div>

                <div class="social center">
                    <ul>
                        <li><img src="{{ asset('dreamsark-assets/wechat.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/qq.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/weibo.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/facebook.png') }}" alt=""></li>
                    </ul>
                </div>

            </div>

            <div class="attached center">
                <small>
                    <a class="inverted" href="{{ route('register') }}">
                        Are you a new user?
                    </a>
                </small>
            </div>

        </section>

    </div>

@endsection