@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row --fluid align-center +margin-top +color-black">

        <div class="small-10 columns segment --transparent">
            <ul class="ul --inline --right">
                <li class="li --start">
                    <header class="header --small">
                        @lang('project.my-projects')
                    </header>
                </li>
                <li>
                    <ark-nav basic>
                        <ark-tab content="tab-running-project" active>
                            @lang('user.running-projects') ({{ $projects->count() }})
                        </ark-tab>
                        <ark-tab content="tab-failed-project">
                            @lang('user.failed-projects') ({{ $failed_projects->count() }})
                        </ark-tab>
                    </ark-nav>
                </li>
            </ul>
        </div>

        <div id="tab-running-project" class="small-10 columns">

            @if($projects->isEmpty())
                <div class="item columns message --color-warning ">
                    @lang('user.no-projects')
                    <b>
                        <a href="{{ route('user.project.create') }}">@lang('project.try-new-one')</a>
                    </b>
                </div>
            @else
                <ark-accordion>
                    @each('user.project.partials.fragments.running-project', $projects, 'project')
                </ark-accordion>
            @endif

        </div>

        <div id="tab-failed-project" class="small-10 columns">

            @if($failed_projects->isEmpty())
                <div class="item columns message --color-success">
                    @lang('user.no-projects')
                </div>
            @else
                <ark-accordion>
                    @each('user.project.partials.fragments.failed-project', $failed_projects, 'project')
                </ark-accordion>
            @endif

        </div>

    </div>

@endsection
