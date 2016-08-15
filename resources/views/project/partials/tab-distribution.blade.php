<ark-tab content="tab-distribution" icon="rss" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.distribution')
    @push('tab-item')
    <div id="tab-distribution" class="row align-center +margin-top">

        <div class="small-10 columns segment --large-padding">

            <h2>Description/描述</h2>
            {!! $project->stage->full_description !!}

        </div>

    </div>
    @endpush
</ark-tab>
