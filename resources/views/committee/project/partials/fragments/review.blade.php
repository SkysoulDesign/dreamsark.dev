<div class="item --hover">

    <div class="small-1 columns item__image">
        <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
    </div>

    <div class="small-2 columns">

        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">{{ $review->project->name }}</a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                Current stage:
            </li>
        </ul>

    </div>
    <div class="columns">
        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">
                        {{ $review->project->user->present()->name }}
                    </a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                Project Creator
            </li>
        </ul>
    </div>
    <div class="columns">
        <ul class="--tight">
            <li>
                <h4>
                    <a href="#">
                        {{ $review->created_at->format('m/d/Y H:i A') }}
                    </a>
                </h4>
            </li>
            <li class="li --sub-tittle">
                Creation Date
            </li>
        </ul>
    </div>

    <div class="columns +center">
        <ul class="ul --inline --right">
            <li>
                <ark-button href="{{ route('project.show', $review->project) }}"
                            color="primary">
                    @lang('project.view-project')
                </ark-button>
            </li>
            <li>
                <ark-button href="{{ route('committee.project.planning.manage', $review) }}"
                            color="success">
                    @lang('project.review-and-plan')
                </ark-button>
            </li>
        </ul>

    </div>
</div>
