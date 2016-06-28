<div class="ui two column">

    <div class="ui horizontal segments">
        <div class="ui segment">
            <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw" style="width: 2500px"></div>
        </div>
        <div class="ui segment" style="width: 1500px">

            <h1 class="ui header">{{ $project->name }}</h1>

            <p class="ui sub header ">

            <p>
                @if($project->script) {{ substr($project->script->submission->content, 0, 100).'...' }} @endif
            </p>

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
                    <div class="ui horizontal list">
                        <div class="item">
                            <i class="circular large olive inverted trophy icon"></i>

                            <div class="content">
                                <h2 class="value">
                                    <b>
                                        <i class="yen icon"></i>{{ $project->expenditures->pluck('expenditurable')->sum('cost') }}
                                    </b>
                                </h2>
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

                </div>
            </div>
            @if(auth()->check() && auth()->user()->id == $project->user_id)
                <div class="ui one inverted blue item menu">
                    <a onClick="if(confirm('{{ trans('project.confirm-to-complete') }}')) return true;" href="{{ 'javascript:;' }}"
                       class="item">@lang('project.set-complete')</a>
                </div>
            @endif
        </div>
    </div>
    @if($project->idea) @include('modals.project-idea-show-modal') @endif
    @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
    @if($project->script) @include('modals.project-script-show-modal') @endif

    <div class="ui stacked segments">
        <div class="ui segment" style="min-height: 100px;">

            <div class="ui three wide column statistics">
                <div class="olive statistic">
                    <div class="value">
                        <i class="yen icon"></i> {{ $project->totalCollected() }}
                    </div>
                    <div class="label">
                        {{ trans('project.collected') }}
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        {{ $project->backers->unique()->count() }}
                    </div>
                    <div class="label">
                        {{ trans('project.backers') }}
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        <img src="{{ asset('img/avatar/male.png') }}" class="ui circular inline image">
                        {{ $project->enrollable()->count() }}
                    </div>
                    <div class="label">
                        {{ trans('project.staff') }}
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<div class="ui column">
    @include('project.distribution.partials.crew-list', ['enrollable' => $project->enrollable])
    <h4>@lang('project.settlement-instruction')</h4>
    <ul class="ui list">
        <li value="*">@lang('project.crew-salary-formula')</li>
        <li value="*">@lang('project.investor-return-formula')</li>
        <li value="*">@lang('project.crew-assessed-formula')</li>
    </ul>
</div>
<p>&nbsp;</p>
<style>
    .segment div.menu, .attached div.menu {
        position: static;
    }
</style>