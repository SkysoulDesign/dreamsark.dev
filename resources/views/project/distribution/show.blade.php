@include('project.partials.header', ['title' => $project->name])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding project-page__fund">

        <img src="{{ $project->stage->poster or asset('img/dummy/cover-1.jpg') }}">

        <p>{{ $project->stage->description }}</p>

        @if($project->stage->trailer)

            <ark-button icon="film" data-modal-trigger="watch-video" color="success">Watch Trailer</ark-button>

            <ark-modal header="Watch The Trailer" v-cloak trigger="watch-video">
                <video controls style="width: 100%">
                    <source src="{{ asset($project->stage->trailer) }}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </ark-modal>

        @endif

    </div>

    <div class="small-10 columns segment --color-primary --attached --centered --large-padding +no-round-bottom">

        <ark-statistics class="align-center" size="large">
            <statistic-item data="{{ $project->present()->spentBudget() }} / {{ $project->present()->goal() }}">
                @lang('project.invest-spent/budget')
            </statistic-item>
        </ark-statistics>

    </div>

    <div class="small-10 columns">
        <ark-nav>
            @include('project.partials.tab-distribution', ['active' => true])
            @include('project.distribution.partials.tab-crew', [
                'expenditures' => $expenditures->where('expenditurable_type', 'crews')
            ])
            @include('project.distribution.partials.tab-expenses', [
                'expenditures' => $expenditures->where('expenditurable_type', 'expenses')
            ])
            {{--            @include('project.partials.tab-fund')--}}
            @include('project.partials.tab-idea')
            @include('project.partials.tab-synapse')
            @include('project.partials.tab-script')
            @include('project.partials.tab-investors')
            @include('project.partials.tab-comments')
        </ark-nav>
    </div>

    <div class="small-12 columns">
        @stack('tab-item')
    </div>

</div>
