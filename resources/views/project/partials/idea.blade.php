@push('tabs')
<ark-nav>

    <ark-tab content="tab-project" active icon="star">

        @lang('project.project')
        @push('tab-item')

        <div id="tab-project" class="row align-center +margin-top">

            <div class="small-12 columns +center">

                <div class="project-page__top-animation">
                    <div class="row">
                        <div class="small-8 columns project-page__top-animation__content">
                            <img src="{{ asset('img/temp/top-bg.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <img class="project-page__avatar"
                     src="{{ asset('img/svg/person-flat.svg') }}">

                <header class="header +uppercase +no-margin-top +z-2">
                    @lang('project.mission-requirements')
                </header>

            </div>

            <div class="small-10 columns segment" style="padding-top: 5em">
                {{ $project->stage->content }}
            </div>

            <div class="small-10 columns segment --primary">
                <div class="row align-center align-middle --large-padding">
                    <div class="small-4 columns project-page__right-divider">
                        <ul class="ul --with-bullets --tight +uppercase">
                            <li class="li --title">@lang('project.achievements')</li>
                            <li>2500 points</li>
                            <li>5 experience</li>
                            <li>medails: finder of the year</li>
                            <li>badge: good thier</li>
                        </ul>
                    </div>
                    <div class="small-8 columns">

                        <ul class="ul --inline --evenly +center">
                            <li>
                                <img class="project-page__achievements" src="{{ asset('img/svg/calendar-flat.svg') }}">
                                <div class="+uppercase +bold">@lang('forms.voting-date')</div>
                                <div>{{ $project->stage->vote->open_date }}</div>
                            </li>
                            <li>
                                <img class="project-page__achievements" src="{{ asset('img/svg/documents-flat.svg') }}">
                                <div class="+uppercase +bold">@lang('forms.submissions')</div>
                                <div>{{ $project->stage->submissions->count() }}</div>
                            </li>
                            <li>
                                <img class="project-page__achievements"
                                     src="{{ asset('img/svg/badge-simple-flat.svg') }}">
                                <div class="+uppercase +bold">@lang('forms.reward')</div>
                                <div class="+currency" data-curency-symbol="$">{{ $project->stage->reward->amount }}</div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <ark-progress class="small-10 columns" :data="{{ $project->present()->getRemainingDays() }}" color="primary"
                          size="large" label="10 days left" flat></ark-progress>

            <div class="small-3 columns segment --transparent">

                @if($project->stage->vote->active)
                    <a href="{{ route('project.vote.create', $project) }}"
                       class="button --success">
                        @lang('project.voting')
                    </a>

                @elseif(!$project->stage->submission)
                    <button class="button --success"  data-modal-trigger="submission">
                        @lang('project.submit')
                    </button>
                @else
                    <div class="segment +center">
                    @lang('project.waiting-for-availability')
                    </div>
                @endif

            </div>

            <div class="small-12 columns">
                <header class="header --with-divider +uppercase">
                    @lang('project.user-comments')
                </header>
            </div>

            <div class="small-10 columns">
                @include('project.partials.comments')
            </div>

        </div>

        @endpush

    </ark-tab>

    <ark-tab content="tab-submission" icon="paper-plane">
        Submission
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
@endsection
