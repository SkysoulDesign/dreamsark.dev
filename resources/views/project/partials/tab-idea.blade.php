<ark-tab content="tab-idea" icon="paper-plane">
    @lang('project.idea')
    @push('tab-item')
    <div id="tab-idea" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                Idea Stage
            </header>
        </div>

        <div class="small-10 columns segment --large-padding">
            <h2>Description</h2>
            {!! $project->stage->content !!}
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
