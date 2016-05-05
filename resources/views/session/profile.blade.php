@extends('layouts.master-user')


@section('content')
    <div class="ui two column stackable grid">

        <section class="medium-6 column">

            {{-- Segment Start --}}
            <div class="segment">

                <div class="title">General Information</div>

                {{--<div class="menu">
                    <button class="outlined small">edit</button>
                </div>--}}

                <div class="body">
                    <div class="head">
                        <h1>{{ auth()->user()->username }}</h1>
                    </div>
                    <div class="description">
                        <i class="fa fa-map-marker"></i> Sao Paulo, Brasil
                    </div>
                </div>

                <hr>

                <div class="title">
                    @lang('project.backed-projects')
                </div>
                <div class="body">
                    <td class="description">
                        @if(!$user->backers->isEmpty())
                            <table class="ui selectable celled table">
                                <thead>
                                <tr>
                                    <th>@lang('project.project')</th>
                                    <th>@lang('project.amount')</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($user->backers as $backer)
                                    <td>{{ $backer->name }}</td>
                                    <td>{{ $backer->pivot->amount }}</td>
                                @endforeach
                                </tbody>
                            </table>
                        @else
                        @lang('project.no-backed-projects')
                    @endif
                </div>
            </div>
            {{-- Segment End --}}

        </section>

        <section class="medium-6 column">

            <div class="segment">

                <div class="title modern">@lang('navbar.profiles')</div>
                <div class="body">
                <table class="ui selectable celled table">
                    <thead>
                    <tr>
                        <th>@lang('profile.type')</th>
                        <th>@lang('profile.page-views')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($user->profiles as $profile)
                        <tr>
                            <td>{{ $profile->display_name }}</td>
                            <td>{{ $profile->display_name }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="2" align="right">
                            <a class="ui orange button right aligned"
                               href="{{ route('user.profile.index') }}">@lang('profile.view-all')</a>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                    </div>
            </div>

        </section>

    </div>
    </div>

@endsection

