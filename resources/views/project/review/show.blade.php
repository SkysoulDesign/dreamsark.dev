<div class="column">

    <div class="ui two column">

        <div class="ui horizontal segments">
            <div class="ui segment">
                <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw" style="width: 2500px"></div>
            </div>
            <div class="ui segment" style="width: 1500px">

                <h1 class="ui header">{{ $project->name }}</h1>

                <p class="ui sub header ">

                <p>@if($project->script) {{ substr($project->script->content, 0, 100).'...' }} @endif</p>

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
