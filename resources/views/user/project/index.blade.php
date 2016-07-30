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
                    @foreach($projects as $project)
                        <ark-accordion-item>
                            <div slot="header" class="item --attached --hover">

                                <div class="small-1 columns item__image">
                                    <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
                                </div>

                                <div class="small-3 columns">

                                    <ul class="--tight">
                                        <li>
                                            <h4>
                                                <a href="#">{{ $project->name }}</a>
                                            </h4>
                                        </li>
                                        <li class="li --sub-tittle">
                                            Current stage: <b>{{ $project->stage->getStageName() }}</b>
                                        </li>
                                    </ul>

                                </div>

                                @if(!$project->stage instanceof \DreamsArk\Models\Project\Stages\Review)

                                    <div class="columns">

                                        <ark-statistics>
                                            <statistic-item data="{{ $project->stage->submissions->count() }}"
                                                            icon="star">Submissions
                                            </statistic-item>
                                            <statistic-item data="{{ $project->stage->comments->count() }}"
                                                            icon="comments">Comments
                                            </statistic-item>
                                        </ark-statistics>

                                    </div>

                                    @if($project->stage->submission)
                                        <div class="small-2 columns +center">
                                            <ark-button href="{{ route('project.next.create', $project) }}"
                                                        color="success">
                                                @lang('project.start-next-stage')
                                            </ark-button>
                                        </div>
                                    @else
                                        <div class="small-1 columns +center">
                                            <ark-dropdown icon="cog" mode="icon" pop="center">
                                                <ark-dropdown-option href="{{ route('project.show', $project) }}"
                                                                     icon="eye">View
                                                </ark-dropdown-option>
                                                <ark-dropdown-option icon="pencil">Edit</ark-dropdown-option>
                                                <ark-dropdown-option icon="wrench">Manage</ark-dropdown-option>
                                            </ark-dropdown>
                                        </div>
                                    @endif

                                @endif
                            </div>
                            @include("user.project.partials.{$project->stage->getStageName()}-details")
                        </ark-accordion-item>
                    @endforeach
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
                    @foreach($failed_projects as $project)
                        <ark-accordion-item>
                            <div slot="header">
                                <div class="item --attached --hover">

                                    <div class="small-1 columns item__image">
                                        <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
                                    </div>

                                    <div class="small-3 columns">

                                        <ul class="--tight">
                                            <li>
                                                <h4>
                                                    <a href="#">{{ $project->name }}</a>
                                                </h4>
                                            </li>
                                            <li class="li --sub-tittle">
                                                Current stage:
                                                <b>{{ $project->stage->getStageName() }}</b>
                                            </li>
                                        </ul>

                                    </div>

                                    <div class="columns">
                                        <ark-statistics>
                                            {{--<statistic-item data="{{ $project->stage->submissions->count() }}"--}}
                                            {{--icon="star">Submissions--}}
                                            {{--</statistic-item>--}}
                                            {{--<statistic-item data="{{ $project->stage->comments->count() }}"--}}
                                            {{--icon="comments">Comments--}}
                                            {{--</statistic-item>--}}
                                        </ark-statistics>
                                    </div>

                                    @if($project->stage->submission)
                                        <div class="small-2 columns +center">
                                            <ark-button
                                                    href="{{ route('project.next.create', $project) }}"
                                                    color="success">
                                                @lang('project.start-next-stage')
                                            </ark-button>
                                        </div>
                                    @else
                                        <div class="small-1 columns +center">
                                            <ark-dropdown icon="cog" mode="icon" pop="center">
                                                <ark-dropdown-option icon="eye">Review
                                                </ark-dropdown-option>
                                                <ark-dropdown-option icon="paper-plane">Publish
                                                </ark-dropdown-option>
                                            </ark-dropdown>
                                        </div>
                                    @endif

                                </div>
                            </div>
                            @include("user.project.fail-messages.{$project->stage->fail_reason}")
                        </ark-accordion-item>
                    @endforeach
                </ark-accordion>
            @endif

        </div>

    </div>

@endsection
