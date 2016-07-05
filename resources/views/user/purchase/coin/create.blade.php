@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <div class="left menu">
            <a class="item ui button" href="{{ route('user.purchase.index') }}">
                <i class="arrow left icon"></i>
                @lang('navbar.back')
            </a>
        </div>
        <h2>@lang('profile.add-coin-to-bag')</h2>
        <div class="ui segment">
            @include('forms.purchase-coin')
        </div>
    </div>
@endsection