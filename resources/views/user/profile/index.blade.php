@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row profile-page +margin-top">

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

            <div class="header">
                @lang('profile.profile')
                <p>@lang('profile.profile-description')</p>
            </div>

            <ul class="row profile-page__profiles">

                <li class="small-12 medium-4 columns li --active">
                    <a class="row align-middle" href="{{ route('user.profile.create') }}">
                        <div class="small-3 columns profile-page__profiles__icon">
                            <div class="hex-icon">
                                <svg id="logo-shape" viewBox="0 0 572 650">
                                    <path fill="currentColor" d="M553.901,178.69c-1.79-3.97-3.976-7.721-6.519-11.198c-19.332-32.392-216.94-145.165-255.816-146.085 c-2.269-0.25-4.57-0.388-6.905-0.388c-2.509,0-4.979,0.165-7.41,0.452C236.099,24.391,42.725,135.1,22.422,167.653 c-2.579,3.504-4.792,7.29-6.603,11.297C-3.06,212.637-3.067,443.009,16.166,472.354c1.523,3.224,3.318,6.291,5.347,9.184 c16.503,31.159,214.665,144.547,255.519,146.812c2.502,0.305,5.044,0.48,7.629,0.48c3.483,0,6.896-0.298,10.223-0.846 c0.731-0.12,1.462-0.245,2.185-0.391c0.159-0.031,0.323-0.067,0.485-0.102c0.87-0.183,1.775-0.391,2.721-0.628 c0.005-0.001,0.01-0.003,0.015-0.004c53.772-13.502,226.592-113.494,246.468-144.499c3.103-4.124,5.705-8.645,7.722-13.473 C572.138,429.665,572.058,212.169,553.901,178.69z"></path>
                                </svg>
                                <span></span>
                            </div>
                        </div>
                        <div class="small-9 columns">
                            <h3>@lang('profile.new-profile')</h3>
                            <span>@lang('profile.new-profile-description')</span>
                        </div>
                    </a>
                </li>

                @foreach($user->profiles as $profile)

                    <li class="small-12 medium-4 columns --color-{{ $profile->name }}">
                        <a class="row align-middle" href="#">
                            <div class="small-3 columns profile-page__profiles__icon">
                                <div class="hex-icon +profile-color-{{ $profile->name }}">
                                    <svg viewBox="0 0 572 650">
                                        <use xlink:href="#logo-shape"/>
                                    </svg>
                                    <img src="{{ asset("img/profile/$profile->name.png") }}">
                                </div>
                            </div>
                            <div class="small-9 columns">
                                <h3>@lang("positions.$profile->name")</h3>
                                <span>@lang("positions.$profile->name-description")</span>
                            </div>
                        </a>
                    </li>

                @endforeach
            </ul>

        </div>

    </div>

@endsection
