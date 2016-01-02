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
                    <a href="#" class="item disabled">@lang('project.back-this-project')</a>
                    <a href="#" class="item disabled">@lang('project.enroll')</a>
                </div>

            </div>
        </div>

        <div class="ui stacked segments">
            <div class="ui segment">

                <div class="ui one wide column statistics">
                    <div class="olive statistic">
                        <div class="value">
                            Processing
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>
