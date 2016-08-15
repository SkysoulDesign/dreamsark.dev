<a href="{{ route('project.show', $project) }}" class="card --color-{{ $color }} +margin-bottom">

    <div class="card__badges --color-{{ $color }}">
        <ul>
            <li>@lang("project.{{ $project->stage->getStageName() }}")</li>
        </ul>
    </div>

    {{--<img src="{{ asset('img/temp/'. ($index<=32 ? ('movies/dreamsarkMref'.str_pad($index, 2, '0', STR_PAD_LEFT).'.jpg') : 'cover.jpeg') ) }}">--}}
    <img src="{{ $project->stage->poster or asset("img/stages/{$project->stage->getStageName()}.jpg") }}">

    <div class="card__content">

        <ul class="ul --inline">
            <li class="--start">{{ $project->name }}</li>
            <li>
                <h3>{{ @$project->stage->reward->amount }}</h3>
            </li>
        </ul>

    </div>

    <ark-progress :data="10" color="{{ $color }}" mini flat></ark-progress>

    <div class="card__extra +center">
        <ark-statistics class="align-center">
            @yield('statistics')
        </ark-statistics>
    </div>

</a>
