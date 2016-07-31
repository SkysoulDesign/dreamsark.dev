<ark-tab content="tab-submission" icon="paper-plane">
    @lang('forms.submissions')
    @push('tab-item')
    <div id="tab-submission" class="row +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.user-public-submissions', ['count' => $public_submissions->count()])
            </header>
        </div>

        @if($public_submissions->isEmpty())

            <div class="small-12 columns segment">
                @lang('project.no-submissions')
            </div>

        @else

            <div class="small-12">

                <ark-accordion>
                    @each('project.partials.fragments.submission', $public_submissions, 'submission')
                </ark-accordion>

            </div>

        @endif

    </div>
    @endpush
</ark-tab>
