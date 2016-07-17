@extends('layouts.master', ['class' => 'project-page'])

@section('content')

    @include('partials.navigation.menu')

    <div class="row --fluid">
        <a href="{{ route('project.show', 1) }}" class="small-12 medium-5 project-page__featured">
            <img src="{{ asset('img/temp/movies/dreamsarkMref05.jpg') }}" alt="">
            <div class="project-page__featured__overlay">
                <h1>The Avangers</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a href="#" class="small-12 medium-4 project-page__featured">
            <img src="{{ asset('img/temp/movies/dreamsarkMref00.jpg') }}" alt="">
            <div class="project-page__featured__overlay">
                <h1>The Jungle Book</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <div class="small-12 medium-3">
            <div class="row">
                <a href="#" class="small-12 medium-12 project-page__featured --half">
                    <img src="{{ asset('img/temp/movies/dreamsarkMref01.jpg') }}" alt="">
                    <div class="project-page__featured__overlay">
                        <h1>The Jungle Book</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </a>
                <a href="#" class="small-12 medium-12 project-page__featured --half">
                    <img src="{{ asset('img/temp/movies/dreamsarkMref14.jpg') }}" alt="">
                    <div class="project-page__featured__overlay">
                        <h1>The Jungle Book</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="row project-page__highlights +hidden-on-mobile">
        <a href="#" class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref10.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a href="#" class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref04.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a href="#" class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref21.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a href="#" class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref32.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
    </div>

    <div class="row align-center --fluid --white-background">

        <div class="small-12 medium-10 columns">

            <header class="header">
                @lang('project.project')
                <p>@lang('project.header-description')</p>
            </header>

            <div class="row align-center project-page__list">

                @foreach($projects as $index => $project)

                    <div class="small-12 medium-3 columns project-page__list__item --stage-{{ $project->stage->getStageName() }}">
                        <a href="{{ route('project.show', $project) }}">
                            <div class="label">
                                <div class="label__wrapper">
                                    <img src="{{ asset('img/temp/'. ($index<=32 ? ('movies/dreamsarkMref'.str_pad($index, 2, '0', STR_PAD_LEFT).'.jpg') : 'cover.jpeg') ) }}"
                                         alt="">
                                    <div class="label__wrapper__items">
                                        <ul>
                                            <li>{{ $project->stage->getStageName() }}</li>
                                            @if($project->stage->vote->active ?? false)
                                                <li>@lang('project.voting')</li>
                                            @else
                                                <li>@lang('project.failed')</li>
                                            @endif
                                            @if($project->stage->submission)
                                                <li>@lang('project.finished')</li>
                                            @endif
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>{{ $project->name }}</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda dolore
                                    mollitia neque nulla possimus qui quis, quo reiciendis repellendus saepe sint,
                                    veniam voluptatibus. Aperiam consectetur ea eligendi odio repellendus?</p>
                            </div>
                            <ark-progress label="@lang('project.progress')" :data="{{rand(0,100)}}" mini></ark-progress>
                            <ark-statistics>
                                <statistic-item data="{{ $project->stage->reward->amount or 0}}">
                                    @lang('project.reward')
                                </statistic-item>
                                @if($project->stage->submissions)
                                    <statistic-item data="{{ $project->stage->submissions->count() }}">
                                        @lang('project.submissions')
                                    </statistic-item>
                                @endif
                            </ark-statistics>
                        </a>
                    </div>
                @endforeach

                <div href="#" class="small-12 columns project-page__list__load-more +center">
                    <button class="button --primary --rounded --medium">@lang('dashboard.load-more')</button>
                </div>
            </div>

        </div>

    </div>

@endsection

{{--@section('contenta')--}}

{{--<div class="column">--}}

{{--@if($projects->isEmpty())--}}
{{--<div class="ui error message">--}}
{{--<div class="header">@lang('project.no-project')</div>--}}
{{--</div>--}}
{{--@else--}}

{{--@foreach($projects as $project)--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Idea)--}}
{{--@include('partials.card-idea')--}}
{{--@endif--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Synapse)--}}
{{--@include('partials.card-synapse')--}}
{{--@endif--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Script)--}}
{{--@include('partials.card-script')--}}
{{--@endif--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Review)--}}
{{--@include('partials.card-review')--}}
{{--@endif--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)--}}
{{--@include('partials.card-fund')--}}
{{--@endif--}}

{{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Distribution)--}}
{{--@include('partials.card-fund', ['color' => 'brown'])--}}
{{--@endif--}}

{{--@endforeach--}}

{{--@endif--}}
{{--</div>--}}

{{--@endsection--}}
