@push('tabs')
<ark-nav>

    <ark-tab content="tab-project" active icon="star">

        @lang('project.project')
        @push('tab-item')

        <div id="tab-project" class="row +margin-top">

            <div class="small-12 medium-8 columns">
                <header class="header --full --small --light --with-divider +uppercase +no-margin-top">
                    @lang('project.mission-requirements')
                </header>
                <section>
                    {{ $project->idea->content }}
                </section>
            </div>
            <div class="small-12 medium-4 columns project-page__info">

                <div class="project-page__info__overlay">

                    <h2>{{ $project->name }}</h2>

                    <span class="chart --centered" data-percent="100">
                        <span class="chart__content --reward">{{ $project->stage->reward->amount }}</span>
                    </span>

                    <div class="project-page__info__overlay__spacer">
                        <ark-progress :data="{{ $project->present()->getRemainingDays() }}"
                                      :max="30" symbol="@lang('project.days')" label="@lang('project.time-left')"
                                      color="ternary"></ark-progress>
                    </div>

                    <div>
                        @lang('project.voting-date')
                        <span>{{ $project->present()->getVotingDate() }}</span>
                    </div>

                    <div>
                        @lang('project.voting-close-date')
                        <span>{{ $project->present()->getCloseVotingDate() }}</span>
                    </div>

                    <ark-statistics>
                        <statistic-item data="{{ $project->stage->submissions->count() }}">
                            @lang('project.submissions')
                        </statistic-item>
                        <statistic-item data="{{ $project->present()->getRemainingDays() }}">
                            @lang('project.days-to-go')
                        </statistic-item>
                    </ark-statistics>

                    <div>

                        @if($project->stage->vote->active)
                            <a href="{{ route('project.vote.create', $project) }}"
                               class="button --white --inverted">
                                @lang('project.voting')
                            </a>
                        @elseif(!$project->stage->submission)
                            <button class="button --white --inverted" data-modal-trigger="submission">
                                @lang('project.submit')
                            </button>
                        @else
                            @lang('project.waiting-for-availability')
                        @endif

                    </div>

                </div>
            </div>

            <div class="small-12 columns divider">@lang('general.comments')</div>

            @include('project.partials.comments')

            <ark-modal trigger="submission" header="@lang('project.idea-submission-form')">
                <ark-form action="{{ route('project.idea.submission.store', $project) }}" class="row">
                    <div class="columns form__content --rounded">
                        <div class="row">

                            <h3 class="small-12 columns form__step">
                                <span>1</span>
                                @lang('form.make-a-submission')
                            </h3>

                            <div class="small-12 columns form__field">
                                <select name="visibility">
                                    <option value="0">@lang('project.private')</option>
                                    <option value="1">@lang('project.public')</option>
                                </select>
                            </div>

                            <h3 class="small-12 columns form__step">
                                <span>2</span>
                                @lang('project.content')
                            </h3>

                            <ark-textarea name="content"
                                          :rows="5"
                                          placeholder="@lang('forms.content')"
                                          caption="@lang('project.form-description')">
                            </ark-textarea>

                            <ark-button state="success" class="+center-on-mobile">
                                @lang('forms.submit-idea')
                            </ark-button>

                            <div class="small-12 columns form__description +center-on-mobile">
                                @lang('project.idea-submission.notes')
                            </div>

                        </div>

                    </div>
                </ark-form>
            </ark-modal>

        </div>

        @endpush

    </ark-tab>

    <ark-tab content="tab-submission" icon="paper-plane">
        @lang('project.submissions)
        @push('tab-item')
        <div id="tab-submission" class="row +margin-top">

            @forelse($submissions as $submission)
                <section class="small-12 columns">
                    {{ $submission->content }}
                </section>
            @empty
                <section class="small-12 columns">
                    @lang('project.no-submissions')
                </section>
            @endforelse

        </div>
        @endpush
    </ark-tab>
</ark-nav>
@endpush

@section('tab-content')
    @stack('tab-item')
@endsection
