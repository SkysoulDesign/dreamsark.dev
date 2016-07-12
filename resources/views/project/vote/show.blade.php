@extends('layouts.master')

@section('content')

    <div class="base-page__background">

        <div class="base-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row">
            <div class="small-12">
                <header class="header --inverted +center">
                    Lorem ipsum dolor sit amet
                </header>
            </div>
        </div>

        @stack('tabs')

    </div>

    <div class="row">

        @foreach($model->enrollable as $expenditure)
            <div class="small-12 columns">
                <header class="header">
                    @lang("positions.{$expenditure->expenditurable->profile->name}")
                </header>
                <table class="table --stack">
                    <thead>
                    <tr>
                        <th>@lang('vote.candidate')</th>
                        <th>@lang('vote.expect-cost')</th>
                        <th>@lang('vote.votes')</th>
                        <th class="--compact +center">@lang('vote.action')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($expenditure->enrollers as $enroller)
                        <tr>
                            <td>
                                <a href="#todo">
                                    {{ $enroller->user->present()->name }}
                                </a>
                            </td>
                            <td>{{ $expenditure->expenditurable->cost }}</td>
                            <td>{{ $enroller->enrollvotes->pluck('amount')->sum() }}</td>
                            <td class="table__action">
                                <input type="text">
                                <button class="button --small --primary">@lang('vote.vote')</button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        @endforeach

    </div>

    {{--@if($model instanceof DreamsArk\Models\Project\Stages\Fund)--}}
    {{--@include('project.fund.vote.create')--}}
    {{--@endif--}}

    {{--@if($model instanceof DreamsArk\Models\Project\Stages\Idea    ||--}}
    {{--$model instanceof DreamsArk\Models\Project\Stages\Synapse ||--}}
    {{--$model instanceof DreamsArk\Models\Project\Stages\Script)--}}
    {{--@include('project.vote.create')--}}
    {{--@endif--}}

@endsection
