@extends('layouts.master-user')


@section('content')
    <div class="column">
        <h3>@lang('user.view-profile')</h3>
        <h4>@lang('user.view-public-profile')</h4>
    </div>
    <div class="ui tabular menu">
        {{--*/ $active=true /*--}}
        @foreach($categories as $category)
            <div class="@if($active){!! 'active ' !!}{{--*/ $active=false /*--}} @endif{!! 'item' !!}"
                 data-tab="{{ $category }}">@lang('forms.'.$category)</div>
        @endforeach
    </div>
    @php
        $category=''; $active=true;
    @endphp
    @foreach($profile->questions as $question)
        @if($question->pivot->category!=$category)
            @if($category!='')
                {{--*/ $active=false /*--}}
                {!! '</div></div>' !!}
            @endif
            {{--*/ $category = $question->pivot->category /*--}}
            {!! '<div class="ui'.($active?' active':'').' tab segment" data-tab="'. $category .'" style="min-height: 350px;">' !!}
            {!! '<div class="ui two column grid">' !!}
        @endif
        <div class="column">{{ $question->question }}</div>
        <div class="column">{{ @$answers[$question->id]['content'] }}</div>
    @endforeach
    {!! '</div></div>' !!}

@endsection