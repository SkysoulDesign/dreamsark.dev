<ark-tab content="tab-comments" icon="comments">
    @lang('forms.comments')
    @push('tab-item')
    <div id="tab-comments" class="row +margin-top align-center">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.user-comments')
            </header>
        </div>

        <div class="small-10 columns">
            @include('project.partials.comments')
        </div>

    </div>
    @endpush
</ark-tab>
