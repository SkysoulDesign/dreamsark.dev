@extends('layouts.master')

@section('content')

    <div class="centered login-background">

        <div class="segments">

            <div class="segment --12-columns-mobile --3-columns-desktop --8-offset-desktop">

                <div class="segment__content">

                    <header class="header --classic">
                        Login Form
                        <p>Welcome to dreamsark, login or apply for a new account</p>
                    </header>

                    <ark-form action="{{ route('login.store') }}"
                              token="{{ csrf_token() }}"
                              errors="{{ $errors->toJson() }}">

                        <ark-input name="login" placeholder="username or email"></ark-input>
                        <ark-input name="password" type="password"></ark-input>
                        <ripple-button type="submit">
                            Login
                        </ripple-button>
                    </ark-form>

                    <div class="divider --mini">or login with</div>

                    <div class="segment">
                        There will be social media links here....
                    </div>

                </div>
            </div>

        </div>
    </div>

@endsection