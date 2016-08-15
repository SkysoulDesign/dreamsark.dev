<ark-accordion-item>
    <div slot="header" class="item --attached --hover">

        <div class="small-1 columns item__image">
            <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
        </div>

        <div class="small-3 columns">

            <ul class="--tight">
                <li>
                    <h4>
                        <a href="{{ route('project.show', $project) }}">{{ $project->name }}</a>
                    </h4>
                </li>
                <li class="li --sub-tittle">
                    @set($trans, trans("project.{$project->stage->getStageName()}"))
                    @lang('project.current-stage', ['stage' => "<b>$trans</b>"])
                </li>
            </ul>

        </div>

        @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)
            <div class="columns +align-right">
                <ark-button href="{{ route('project.show', $project) }}" color="success">
                    @lang('admin.view-project')
                </ark-button>
            </div>
        @endif

        @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Distribution)
            <div class="columns +align-right">
                <ul class="ul --inline --right">
                    <li>
                        <ark-button href="{{ route('project.manage.edit', $project) }}" color="warning">
                            @lang('project.reivew-manage-project')
                        </ark-button>
                    </li>
                    <li>
                        <ark-button href="{{ route('project.show', $project) }}" color="success">
                            @lang('admin.view-project')
                        </ark-button>
                    </li>
                </ul>
            </div>
        @endif

        @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Idea or
            $project->stage instanceof \DreamsArk\Models\Project\Stages\Synapse or
            $project->stage instanceof \DreamsArk\Models\Project\Stages\Script)

            <div class="columns">

                <ark-statistics>
                    <statistic-item data="{{ $project->stage->submissions->count() }}"
                                    icon="star">@lang('user.submission')
                    </statistic-item>
                    <statistic-item data="{{ $project->stage->comments->count() }}"
                                    icon="comments">@lang('user.comment')
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
                                             icon="eye">@lang('user.view')
                        </ark-dropdown-option>
                        <ark-dropdown-option icon="pencil">@lang('user.edit')</ark-dropdown-option>
                        <ark-dropdown-option icon="wrench">@lang('user.manage')</ark-dropdown-option>
                    </ark-dropdown>
                </div>
            @endif

        @endif

    </div>
    @include("user.project.partials.{$project->stage->getStageName()}-details")

</ark-accordion-item>
