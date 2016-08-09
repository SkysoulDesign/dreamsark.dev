<ark-tab content="tab-synapse" icon="file-text-o">
    @lang('project.synapse')
    @push('tab-item')
    <div id="tab-synapse" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.synapse-stage')
            </header>
        </div>

        <div class="small-10 columns segment --large-padding">
            <h2>@lang('project.synapse-requirement')</h2>
            {!! $project->synapse->content !!}
        </div>

        <div class="small-10 columns segment --large-padding +margin-top">
            <div class="segment__header --image --centered">
                <img src="{{ $project->synapse->submission->user->present()->avatar }}" alt="">
                <a href="#">{{ $project->synapse->submission->user->present()->name }}</a>
            </div>
            {!! $project->synapse->submission->content !!}
        </div>

    </div>
    @endpush
</ark-tab>
