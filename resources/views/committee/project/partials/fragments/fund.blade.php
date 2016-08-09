<div class="item --hover">

    <div class="small-1 columns item__image">
        <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
    </div>

    <div class="small-2 columns">

        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">{{ $fund->project->name }}</a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                @lang('project.current-stage', ['stage' => trans("project.{$fund->project->stage->getStageName()}")])
            </li>
        </ul>

    </div>
    <div class="columns">
        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">
                        {{ $fund->project->user->present()->name }}
                    </a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                @lang('general.project-creator')
            </li>
        </ul>
    </div>
    <div class="columns">
        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">
                        {{ $fund->created_at->format('m/d/Y H:i A') }}
                    </a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                @lang('general.creation-date')
            </li>
        </ul>
    </div>

    <div class="columns +center">
        <ul class="ul --inline --right">
            <li>
                <ark-button href="{{ route('project.show', $fund->project) }}"
                            color="primary">
                    @lang('project.view-project')
                </ark-button>
            </li>
        </ul>

    </div>
</div>
