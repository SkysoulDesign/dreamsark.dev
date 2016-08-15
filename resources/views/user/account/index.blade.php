@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.account')
                <p>@lang('user.account-description')</p>
            </header>
        </div>

        <div class="small-10 columns segment --color-primary --attached --centered --large-padding +no-round-bottom +margin-top-small">

            <ark-statistics class="align-center" size="large">
                <statistic-item data="0">@lang('user.friends')</statistic-item>
                <statistic-item data="0">@lang('user.rewards')</statistic-item>
                <statistic-item data="0">@lang('user.ranking')</statistic-item>
            </ark-statistics>

        </div>

        <div class="small-10 columns">
            <ark-nav>
                @include('user.account.partials.tab-personal', ['active' =>true])
            </ark-nav>
        </div>

        <div class="small-12 columns">
            @stack('tab-item')
        </div>

    </div>

    {{--<div class="row">--}}

    {{--<div class="small-12 columns">--}}

    {{--<header class="header --light --with-divider --full">--}}
    {{--@lang('user.account')--}}
    {{--</header>--}}

    {{--<section>--}}
    {{--<ark-form action="#" errors="{{ json_encode($errors) }}">--}}

    {{--<header class="header --light --full --mini +no-margin-top">--}}
    {{--@lang('user.personal')--}}
    {{--</header>--}}

    {{--<ark-fields gap="large">--}}
    {{--<ark-input name="name" label="Name"></ark-input>--}}
    {{--<ark-input name="password" label="Password"></ark-input>--}}
    {{--</ark-fields>--}}

    {{--<ark-fields gap="large">--}}
    {{--<ark-input label="Username" read-only>test</ark-input>--}}
    {{--<ark-input name="confirm_password" label="Password Confirmation"></ark-input>--}}
    {{--</ark-fields>--}}

    {{--<ark-input name="name" label="Password"></ark-input>--}}

    {{--</ark-form>--}}
    {{--</section>--}}
    {{--</div>--}}

    {{--</div>--}}

@endsection

{{--@section('content')--}}
{{--<div class="ui two column stackable grid">--}}

{{--<section class="medium-6 column">--}}

{{-- Segment Start --}}
{{--<div class="segment">--}}

{{--<div class="title">General Information</div>--}}

{{--<div class="menu">--}}
{{--<button class="outlined small">edit</button>--}}
{{--</div>--}}

{{--<div class="body">--}}
{{--<div class="head">--}}
{{--<h1>{{ auth()->user()->username }}</h1>--}}
{{--</div>--}}
{{--<div class="description">--}}
{{--<i class="fa fa-map-marker"></i> Sao Paulo, Brasil--}}
{{--</div>--}}
{{--</div>--}}

{{--<hr>--}}

{{--<div class="title">--}}
{{--@lang('project.backed-projects')--}}
{{--</div>--}}
{{--<div class="body">--}}
{{--<div class="description">--}}
{{--@if(!$user->backers->isEmpty())--}}
{{--<table class="ui selectable celled table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('project.project')</th>--}}
{{--<th>@lang('project.paid')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($user->backers as $index => $backer)--}}
{{--@if($index>1) @break; @endif--}}
{{--<tr>--}}
{{--<td>{{ $backer->name }}</td>--}}
{{--<td>{{ $backer->pivot->amount.' ('.($backer->pivot->updated_at->format('m/d/Y H:i:a')).')' }}</td>--}}
{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--<tfoot>--}}
{{--<tr>--}}
{{--<td colspan="2" align="right">--}}
{{--<a class="ui orange button right aligned"--}}
{{--href="{{ route('user.activity.backed.list') }}">@lang('profile.backer-all')</a>--}}
{{--</td>--}}
{{--</tr>--}}
{{--</tfoot>--}}
{{--</table>--}}
{{--@else--}}
{{--@lang('project.no-backed-projects')--}}
{{--@endif--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{-- Segment End --}}

{{--</section>--}}

{{--<section class="medium-6 column">--}}

{{--<div class="segment">--}}

{{--<div class="title modern">@lang('navbar.profiles')</div>--}}
{{--<div class="body">--}}
{{--<table class="ui selectable celled table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('profile.type')</th>--}}
{{--<th>@lang('profile.page-views')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($user->profiles as $index => $profile)--}}
{{--@if($index>1) @break; @endif--}}
{{--<tr>--}}
{{--<td>{{ $profile->display_name }}</td>--}}
{{--<td>{{ $profile->display_name }}</td>--}}
{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--<tfoot>--}}
{{--<tr>--}}
{{--<td colspan="2" align="right">--}}
{{--<a class="ui orange button right aligned"--}}
{{--href="{{ route('user.profile.index') }}">@lang('profile.view-all')</a>--}}
{{--</td>--}}
{{--</tr>--}}
{{--</tfoot>--}}
{{--</table>--}}
{{--</div>--}}
{{--</div>--}}

{{--</section>--}}

{{--</div>--}}
{{--</div>--}}

{{--@endsection--}}

