@include('project.partials.header', ['title' => 'Review Stage'])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding">

        <img class="project-page__review__illustration" src="{{ asset('img/temp/mage.png') }}" alt="">
        <img class="project-page__achievements" src="{{ asset('img/svg/badge-simple-flat.svg') }}">

        <div class="header --light-weight">
            <b class="+color-success">{{ $project->name }}</b>
            <h2>Project Currently Under Review</h2>
        </div>

        <div class="row align-center project-page__review__steps">
            <ark-steps>
                <ark-step {{ active($stage, 'idea') }} ></ark-step>
                <ark-step {{ active($stage, 'synapse') }} ></ark-step>
                <ark-step {{ active($stage, 'script') }} ></ark-step>
                <ark-step {{ active($stage, 'review') }} ></ark-step>
                <ark-step {{ active($stage, 'fund') }} ></ark-step>
                <ark-step {{ active($stage, 'distribution') }} ></ark-step>
            </ark-steps>
        </div>
    </div>

    <div class="small-10 columns segment --color-primary --centered --large-padding">

        <ul class="ul --inline --evenly +center +padding-top-small">

            @foreach(
             ['milky-way.svg', 'planet-earth.svg', 'moon.svg', 'mercury.svg', 'galaxy.svg',
              'stars.svg', 'venus.svg'] as $svg)
                <li>
                    <img class="project-page__achievements"
                         src="{{ asset("img/svg/$svg") }}">
                    <div class="+uppercase +bold">{{ explode('.', $svg)[0] }}</div>
                </li>
            @endforeach
        </ul>

    </div>

    <div class="small-10 columns segment --centered --large-padding">
        <h1>Original Request</h1>
        asdasdasd
    </div>

    <div class="small-12 columns +margin-top-small">
        <header class="header --with-divider +uppercase --centered">
            Submissions
        </header>
    </div>

</div>

<div class="column">

    <div class="ui two column">

        <div class="ui horizontal segments">
            <div class="ui segment">
                <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw" style="width: 2500px"></div>
            </div>
            <div class="ui segment" style="width: 1500px">

                <h1 class="ui header">{{ $project->name }}</h1>

                <p class="ui sub header ">

                <p>@if($project->script) {{ substr($project->script->submission->content, 0, 100).'...' }} @endif</p>

                <div class="ui segments">
                    <div class="ui segment">
                        <div class="ui horizontal list">
                            <div class="item">
                                <img class="ui mini circular image" src="{{ $project->creator->present()->avatar }}">

                                <div class="content">
                                    <h4 class="ui  header"><b>{{ $project->creator->present()->name }}</b></h4>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="ui segment">
                        <div class="ui three item menu">
                            <a id="project-idea-show" class="item @if(!$project->idea) disabled @endif">
                                <i class="icon mail"></i> @lang('project.idea')
                            </a>
                            <a id="project-synapse-show" class="item @if(!$project->synapse) disabled @endif">
                                <i class="icon users"></i> @lang('project.synapse')
                            </a>
                            <a id="project-script-show" class="item @if(!$project->script) disabled @endif">
                                <i class="icon users"></i> @lang('project.script')
                            </a>
                        </div>
                        @if($project->idea) @include('modals.project-idea-show-modal') @endif
                        @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
                        @if($project->script) @include('modals.project-script-show-modal') @endif

                    </div>
                </div>
                <div class="ui two inverted green item menu">
                    <a href="javascript:;" class="item disabled">@lang('project.back-this-project')</a>
                    <a href="javascript:;" class="item disabled">@lang('project.enroll')</a>
                </div>
                <div class="ui one column statistics">
                    <div class="statistic">
                        <div class="value" style="font-size: 2rem;">
                            @lang('project.under-review')
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="ui stacked segments">
            <div class="ui segment">
                <div class="ui indicating progress active olive statistic" data-percent="0">
                    <div class="bar"></div>
                    <div class="label">@lang('project.processing')</div>
                </div>
            </div>

        </div>

    </div>
</div>
<style>
    .segment div.menu, .attached div.menu {
        position: static;
    }
</style>
