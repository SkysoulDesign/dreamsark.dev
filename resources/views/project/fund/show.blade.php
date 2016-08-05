@include('project.partials.header', ['title' => $project->name])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding">

        <img class="project-page__achievements" src="{{ asset('img/svg/badge-simple-flat.svg') }}">

        <div class="header --light-weight">
            <b class="+color-success">{{ $project->expenditures->sum('expenditurable.cost') }}</b>
            <p>Project Goal</p>
        </div>

        <ark-progress class="small-12 columns"
                      color="warning"
                      size="large" label="@lang('project.time')" flat></ark-progress>

        {{--<div class="row align-center project-page__review__steps">--}}
            {{--<ark-steps>--}}
                {{--<ark-step {{ active($stage, 'idea') }}></ark-step>--}}
                {{--<ark-step {{ active($stage, 'synapse') }}></ark-step>--}}
                {{--<ark-step {{ active($stage, 'script') }}></ark-step>--}}
                {{--<ark-step {{ active($stage, 'review') }}></ark-step>--}}
                {{--<ark-step {{ active($stage, 'fund') }}></ark-step>--}}
                {{--<ark-step {{ active($stage, 'distribution') }}></ark-step>--}}
            {{--</ark-steps>--}}
        {{--</div>--}}

    </div>

    <div class="small-10 columns segment --color-primary --centered --large-padding +no-round-bottom">

        <ark-statistics class="align-center" size="large">
            <statistic-item data="{{ $project->investors->unique()->count() }}">Investors</statistic-item>
            <statistic-item data="{{ $project->investors->sum('pivot.amount') }}">Collected</statistic-item>
            <statistic-item data="{{ $project->expenditures->sum('expenditurable.cost') }}">Goal</statistic-item>
        </ark-statistics>

    </div>

    <div class="small-10 columns">
        <ark-nav>
            @include('project.partials.tab-fund', ['active' => true])
            @include('project.partials.tab-idea')
            @include('project.partials.tab-synapse')
            @include('project.partials.tab-script')
            @include('project.partials.tab-comments')
        </ark-nav>
    </div>

    <div class="small-12 columns">
        @stack('tab-item')
    </div>

</div>
