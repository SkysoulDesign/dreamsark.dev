@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.activity')
                <p>@lang('user.activity-description')</p>
            </header>
        </div>

        <div class="small-10 columns segment --color-primary --attached --centered --large-padding +no-round-bottom +margin-top-small">

            <ark-statistics class="align-center" size="large">
                <statistic-item data="0">Total Earned/總贏得數量</statistic-item>
                <statistic-item data="0">Something Else/榮耀項目</statistic-item>
                <statistic-item data="0">I dont know/排行榜</statistic-item>
            </ark-statistics>

        </div>

        <div class="small-10 columns">
            <ark-nav>
                @include('user.activity.partials.tab-earnings', ['active' => true])
                @include('user.activity.partials.tab-enrolled')
                @include('user.activity.partials.tab-investments')
            </ark-nav>
        </div>

        <div class="small-12 columns">
            @stack('tab-item')
        </div>

    </div>

@endsection
