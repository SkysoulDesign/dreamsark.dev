<a href="{{ route('project.show', $project) }}" class="card --color-{{ $color }} +margin-bottom">

    <div class="card__badges --color-{{ $color }}">
        <ul>
            <li>@lang("project.{$project->stage->getStageName()}")</li>
            @if($project->stage->vote && $project->stage->vote->active)
                <li class="li --voting">Voting is Open</li>
            @endif
        </ul>
    </div>

    <img src="{{ $project->stage->poster or asset("img/stages/{$project->stage->getStageName()}.jpg") }}">

    <div class="card__content">

        <ul class="ul --inline">
            <li class="--start">{{ $project->name }}</li>
            @if($project->stage->reward)
                <li>
                    <h3>{{ $project->stage->reward->amount }}</h3>
                </li>
            @endif
        </ul>

    </div>

    <ark-progress :data="10" color="{{ $color }}" mini flat></ark-progress>

    <div class="card__extra +center">
        <ark-statistics class="align-center">
            @yield('statistics')
        </ark-statistics>
    </div>

</a>
