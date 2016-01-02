<div class="column">

    <div class="ui two column">

        <div class="ui horizontal segments">
            <div class="ui segment">
                <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw" style="width: 2500px"></div>
            </div>
            <div class="ui segment" style="width: 1500px">

                <h1 class="ui header">{{ $project->name }}</h1>

                <p class="ui sub header ">

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus autem est ex labore laudantium
                    mollitia nihil possimus, provident. Alias at laborum odio odit possimus ratione, repellat velit.
                    Fugiat, laborum perspiciatis?</p>

                <div class="ui segments">
                    <div class="ui segment">
                        <div class="ui horizontal list">
                            <div class="item">
                                <img class="ui mini circular image" src="{{ $project->creator->present()->avatar }}">

                                <div class="content">
                                    <h4 class="ui  header"><b>{{ $project->creator->present()->name }}</b></h4>
                                    Lorem ipsum dolor sit amet.
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
                        @if($project->idea) @include('modals.project-idea-show-modal') @endif
                        @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
                        @if($project->script) @include('modals.project-script-show-modal') @endif

                    </div>
                </div>

                @if(!$project->stage->vote->active)
                    <div class="ui two inverted green item menu">
                        <a href="{{ route('project.fund.create', $project->id) }}"
                           class="item">@lang('project.back-this-project')</a>
                        <a href="{{ route('project.enroll.create', $project->id) }}"
                           class="item">@lang('project.enroll')</a>
                    </div>
                @else
                    <div class="ui one inverted blue item menu">
                        <a href="{{ route('vote.show', $project->stage->vote->id) }}"
                           class="item">@lang('vote.is-open')</a>
                    </div>
                @endif

            </div>
        </div>

        <div class="ui stacked segments">
            <div class="ui segment">

                <div class="ui four wide column statistics">
                    <div class="olive statistic">
                        <div class="value">
                            <i class="yen icon"></i> {{ $project->backers->sum('pivot.amount') }}
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
                            {{ $project->stage->vote->open_date->diffInHours(\Carbon\Carbon::now()) }}
                        </div>
                        <div class="label">
                            {{ trans('project.hours-to-go') }}
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

            <div class="ui segment">
                {!! $project->present()->progressBar() !!}
            </div>
        </div>

    </div>
</div>
