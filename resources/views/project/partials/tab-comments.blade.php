<ark-tab content="tab-comments" icon="comments-o" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('forms.comments')
    @push('tab-item')
    <div id="tab-comments" class="row +margin-top align-center">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.user-comments')
            </header>
        </div>

        <div class="small-10 columns">

            @each('project.partials.fragments.comments', $project->stage->comments, 'comment', 'project.partials.fragments.comments-empty')

            <div class="small-12 divider --spaced --simple"></div>

            <ark-form class="align-center segment"
                      action="{{ route('project.comment.store', [$project, $project->stage->getStageName()]) }}">

                <div slot="body">

                    <ark-textarea name="content" :rows="5" label="@lang('forms.comments')"></ark-textarea>

                    <div class="small-12 divider --simple"></div>

                    <ark-button color="primary">
                        @lang('forms.leave-a-comment')
                    </ark-button>

                    <div class="small-12 columns form__description +center-on-mobile">
                        @lang('forms.comments-note')
                    </div>

                </div>

            </ark-form>

        </div>

    </div>
    @endpush
</ark-tab>
