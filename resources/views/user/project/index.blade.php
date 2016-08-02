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
                            Running Projects ({{ $projects->count() }})
                        </ark-tab>
                        <ark-tab content="tab-failed-project">
                            Failed Projects ({{ $failed_projects->count() }})
                        </ark-tab>
                    </ark-nav>
                </li>
            </ul>
        </div>

        <div id="tab-running-project" class="small-10 columns">

            @if($projects->isEmpty())
                <div class="item columns message --color-warning ">
                    You still don't have any running project...
                    <b>
                        <a href="{{ route('user.project.create') }}">why don't you start one?</a>
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
                    You don't have any failed project :)
                </div>
            @else
                <ark-accordion>
                    @each('user.project.partials.fragments.failed-project', $failed_projects, 'project')
                </ark-accordion>
            @endif

        </div>

    </div>

@endsection
