@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row profile-page">

        {{--@foreach(range(1,12) as $item)--}}
        {{--<div class="small-2 medium-1 columns">--}}
        {{--<div class="hex-icon --primary">--}}
        {{--<svg viewBox="0 0 572 650">--}}
        {{--<path d="M553.901,178.69c-1.79-3.97-3.976-7.721-6.519-11.198c-19.332-32.392-216.94-145.165-255.816-146.085 c-2.269-0.25-4.57-0.388-6.905-0.388c-2.509,0-4.979,0.165-7.41,0.452C236.099,24.391,42.725,135.1,22.422,167.653 c-2.579,3.504-4.792,7.29-6.603,11.297C-3.06,212.637-3.067,443.009,16.166,472.354c1.523,3.224,3.318,6.291,5.347,9.184 c16.503,31.159,214.665,144.547,255.519,146.812c2.502,0.305,5.044,0.48,7.629,0.48c3.483,0,6.896-0.298,10.223-0.846 c0.731-0.12,1.462-0.245,2.185-0.391c0.159-0.031,0.323-0.067,0.485-0.102c0.87-0.183,1.775-0.391,2.721-0.628 c0.005-0.001,0.01-0.003,0.015-0.004c53.772-13.502,226.592-113.494,246.468-144.499c3.103-4.124,5.705-8.645,7.722-13.473 C572.138,429.665,572.058,212.169,553.901,178.69z"></path>--}}
        {{--</svg>--}}
        {{--<span></span>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--@endforeach--}}

        <div class="small-12 columns +center">

            <header class="header">
                Lorem ipsum dolor sit
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci delectus dicta dolores eaque
                    eveniet excepturi in laborum molestias nobis optio recusandae, rem sequi sint sit suscipit ut,
                    veritatis voluptatem?</p>
            </header>

            <ul class="row profile-page__profiles">

                <li class="small-12 medium-4 columns --active">
                    <a class="row align-middle" href="{{ route('user.profile.create') }}">
                        <div class="small-3 columns profile-page__profiles__icon">
                            <div class="hex-icon">
                                <svg viewBox="0 0 572 650">
                                    <path d="M553.901,178.69c-1.79-3.97-3.976-7.721-6.519-11.198c-19.332-32.392-216.94-145.165-255.816-146.085 c-2.269-0.25-4.57-0.388-6.905-0.388c-2.509,0-4.979,0.165-7.41,0.452C236.099,24.391,42.725,135.1,22.422,167.653 c-2.579,3.504-4.792,7.29-6.603,11.297C-3.06,212.637-3.067,443.009,16.166,472.354c1.523,3.224,3.318,6.291,5.347,9.184 c16.503,31.159,214.665,144.547,255.519,146.812c2.502,0.305,5.044,0.48,7.629,0.48c3.483,0,6.896-0.298,10.223-0.846 c0.731-0.12,1.462-0.245,2.185-0.391c0.159-0.031,0.323-0.067,0.485-0.102c0.87-0.183,1.775-0.391,2.721-0.628 c0.005-0.001,0.01-0.003,0.015-0.004c53.772-13.502,226.592-113.494,246.468-144.499c3.103-4.124,5.705-8.645,7.722-13.473 C572.138,429.665,572.058,212.169,553.901,178.69z"></path>
                                </svg>
                                <span></span>
                            </div>
                        </div>
                        <div class="small-9 columns">
                            <h3>@lang('profile.new-profile')</h3>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                        </div>
                    </a>
                </li>

                @foreach($profiles as $profile)

                    <li class="small-12 medium-4 columns --{{ $profile->name }}">
                        <a class="row align-middle" href="#">
                            <div class="small-3 columns profile-page__profiles__icon">
                                <div class="hex-icon +profile-color-{{ $profile->name }}">
                                    <svg viewBox="0 0 572 650">
                                        <path d="M553.901,178.69c-1.79-3.97-3.976-7.721-6.519-11.198c-19.332-32.392-216.94-145.165-255.816-146.085 c-2.269-0.25-4.57-0.388-6.905-0.388c-2.509,0-4.979,0.165-7.41,0.452C236.099,24.391,42.725,135.1,22.422,167.653 c-2.579,3.504-4.792,7.29-6.603,11.297C-3.06,212.637-3.067,443.009,16.166,472.354c1.523,3.224,3.318,6.291,5.347,9.184 c16.503,31.159,214.665,144.547,255.519,146.812c2.502,0.305,5.044,0.48,7.629,0.48c3.483,0,6.896-0.298,10.223-0.846 c0.731-0.12,1.462-0.245,2.185-0.391c0.159-0.031,0.323-0.067,0.485-0.102c0.87-0.183,1.775-0.391,2.721-0.628 c0.005-0.001,0.01-0.003,0.015-0.004c53.772-13.502,226.592-113.494,246.468-144.499c3.103-4.124,5.705-8.645,7.722-13.473 C572.138,429.665,572.058,212.169,553.901,178.69z"></path>
                                    </svg>
                                    <span></span>
                                </div>
                            </div>
                            <div class="small-9 columns">
                                <h3>{{ $profile->display_name }}</h3>
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                            </div>
                        </a>
                    </li>

                @endforeach
            </ul>

        </div>
    </div>

@endsection

{{--@section('content')--}}

{{--<div class="column">--}}
{{--<section>--}}

{{--@if(!$profiles->isEmpty())--}}

{{--<div class="ui grid three column">--}}

{{--<div class="column">Type</div>--}}
{{--<div class="column">Status</div>--}}
{{--<div class="column">Actions</div>--}}

{{--@foreach($profiles as $profile)--}}

{{--<div class="column">--}}
{{--{{ $profile->display_name }}--}}
{{--<i class="icon profile-{{ $profile->name }}"></i>--}}
{{--</div>--}}

{{--@if($user->hasProfile($profile))--}}

{{--<div class="column">--}}
{{--<div class="ui indicating progress success"--}}
{{--data-percent="{{ $user->present()->profileCompletion($profile) }}">--}}
{{--<div class="bar">--}}
{{--<div class="progress"></div>--}}
{{--</div>--}}
{{--<div class="label">Completion</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="column">--}}
{{--<a href="{{ route('user.profile.show', $profile->name) }}" class="ui green button">--}}
{{--<i class="icon unhide"></i>--}}
{{--View--}}
{{--</a>--}}
{{--<a href="{{ route('user.profile.edit', $profile->name) }}" class="ui button">--}}
{{--<i class="icon edit"></i>--}}
{{--Edit--}}
{{--</a>--}}
{{--</div>--}}

{{--@else--}}

{{--<div class="column">--}}
{{--<div class="ui indicating disabled progress warning" data-percent="0">--}}
{{--<div class="bar"></div>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="column">--}}
{{--<a href="{{ route('user.profile.create', $profile->name) }}" class="ui primary button">--}}
{{--<i class="icon add"></i>--}}
{{--Create Profile--}}
{{--</a>--}}
{{--</div>--}}

{{--@endif--}}
{{--@endforeach--}}

{{--</div>--}}
{{--@else--}}
{{--<h3>No Profiles Available</h3>--}}
{{--@endif--}}

{{--</section>--}}
{{--</div>--}}
{{--@endsection--}}
