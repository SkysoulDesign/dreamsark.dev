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
