@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">

            @include('profile.partials.navbar-left')

            <div class="ui twelve wide column">
                @foreach($profileWithData as $profile)
                    @if($profile->users->isEmpty())
                    @else
                        <h3>
                            @lang("positions.$profile->name")
                            {{--<a href="{{ route('public.profile.list', [$profile->name]) }}" class="ui right labeled icon button">
                                <i class="right arrow icon"></i>
                                @lang('navbar.view-all')
                            </a>--}}
                            <div class="ui right aligned labeled button" tabindex="0">
                                <a href="{{ route('public.profile.list', [$profile->name]) }}"
                                   class="ui basic blue button">
                                    <i class="right circle arrow icon"></i> @lang('navbar.view-all')
                                </a>
                            </div>
                        </h3>
                        <div class="ui grid">
                            @foreach($profile->users as $index => $user)
                                @if($index>7)
                                    @break
                                @endif
                                <div class="four wide column">
                                    <a href="{{ route('public.profile.show', [$profile->name, $user->username]) }}">
                                        <div class="ui small images">
                                            <img src="{{ asset('img/avatar/holder.png') }}">
                                        </div>
                                        <b>{{ $user->present()->name  }}</b>
                                    </a>
                                </div>
                            @endforeach
                        </div>

                        <div class="ui inverted divider"></div>
                    @endif
                @endforeach
            </div>
        </div>
    </div>
@endsection
