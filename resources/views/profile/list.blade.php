@extends('layouts.master-user')

@section('content')
    @include('profile.partials.navbar-left')
    <div class="ui twelve wide column">
        @if($profileWithData->isEmpty())
            <div class="ui warning message">
                <div class="header">
                    @lang('general.no-results')
                </div>
            </div>
        @else
            <div class="ui grid">
                @foreach($profileWithData as $index => $user)
                    <div class="four wide column">
                        <a href="{{ route('public.profile.show', [$profile->name, $user->username]) }}">
                            <div class="ui small images">
                                <img src="{{ asset('img/avatar/holder.png') }}">
                            </div>
                            <b>{{ $user->name or $user->username }}</b>
                        </a>
                    </div>
                @endforeach
            </div>
        @endif
        @if($profileWithData->total()>0)
            <div class="ui right floated pagination menu">
                <a href="{{ $profileWithData->previousPageUrl() }}" class="icon item">
                    <i class="left chevron icon"></i>
                </a>
                @if($profileWithData->currentPage()>1)
                    <a href="{{ $profileWithData->url(1) }}" class="item">1</a>
                    @if($profileWithData->currentPage()>2)
                        <div class="item">...</div>
                    @endif
                @endif
                <div class="active item">{{ $profileWithData->currentPage() }}</div>
                @for($i=$profileWithData->currentPage()+1; ($i<= $profileWithData->currentPage()+3 && $i<=$profileWithData->lastPage()); $i++)
                    <a href="{{ $profileWithData->url($i) }}" class="item">{{ $i }}</a>
                @endfor
                <a href="{{ $profileWithData->nextPageUrl() }}" class="icon item">
                    <i class="right chevron icon"></i>
                </a>
            </div>
        @endif
    </div>
@endsection