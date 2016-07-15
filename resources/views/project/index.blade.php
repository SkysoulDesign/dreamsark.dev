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
        <a class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref10.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref04.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref21.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
        <a class="small-3 columns">
            <img src="{{ asset('img/temp/movies/dreamsarkMref32.jpg') }}" alt="">
            <div>
                <h3>The Jungle Book</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </a>
    </div>

    <div class="row align-center --fluid --white-background">

        <div class="small-12 medium-10 columns">

            <header class="header +center">
                Projects
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque eligendi fuga laborum modi
                    necessitatibus
                    officiis pariatur quam repellendus?</p>
            </header>

            <div class="row align-center project-page__list">

                @foreach($projects as $index => $project)
                    <div href="#" class="small-12 medium-3 columns project-page__list__item">
                        <img src="{{ asset('img/temp/'. ($index<=32 ? ('movies/dreamsarkMref'.str_pad($index, 2, '0', STR_PAD_LEFT).'.jpg') : 'cover.jpeg') ) }}"
                             alt="">
                        <a href="{{ route('project.show', $project) }}">
                            <h1>{{ $project->name }}</h1>
                        </a>
                        <ul>
                            <li>User: <a href="#">milewski</a></li>
                            <li>Comments: 50</li>
                            <li>Likes: 50</li>
                        </ul>
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
