<ark-tab content="tab-script" icon="film">
    @lang('project.script')
    @push('tab-item')
    <div id="tab-script" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                Script Stage
            </header>
        </div>

        <div class="small-10 columns segment --large-padding">
            <h2>Description</h2>
            {!! $project->script->content !!}
        </div>

        <div class="small-10 columns segment --large-padding +margin-top">
            <div class="segment__header --image --centered">
                <img src="{{ $project->script->submission->user->present()->avatar }}" alt="">
                <a href="#">{{ $project->script->submission->user->present()->name }}</a>
            </div>
            {!! $project->script->submission->content !!}
        </div>

    </div>
    @endpush
</ark-tab>
