<ark-tab content="tab-idea" icon="lightbulb-o">
    @lang('project.idea')
    @push('tab-item')
    <div id="tab-idea" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.synapse-stage')
            </header>
        </div>

        <div class="small-10 columns segment --large-padding">
            <h2>@lang('project.idea-requirement')</h2>
            {!! $project->idea->content !!}
        </div>

        <div class="small-10 columns segment --large-padding +margin-top">

            <div class="segment__header --image --centered">
                <img src="{{ $project->idea->submission->user->present()->avatar }}" alt="">
                <a href="#">{{ $project->idea->submission->user->present()->name }}</a>
            </div>
            {!! $project->idea->submission->content !!}
        </div>

    </div>
    @endpush
</ark-tab>
