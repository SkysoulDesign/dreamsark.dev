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

            <div class="small-10 columns segment project-page__requirement-content">
                {!! $project->stage->content !!}
            </div>

            <div class="small-10 columns segment --color-primary">
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
                                <div class="+currency"
                                     data-curency-symbol="$">{{ $project->stage->reward->amount }}</div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <ark-progress class="small-10 columns" :data="{{ $project->present()->getRemainingDays() }}" color="primary"
                          size="large" label="@lang('project.time')" flat></ark-progress>

            <div class="small-3 columns segment --transparent">

                @if($project->stage->vote->active)

                    <ark-button color="success" class="--fluid --medium"
                                href="{{ route('project.vote.create', $project) }}">
                        @lang('project.voting')
                    </ark-button>

                @elseif(!$project->stage->submission)
                    <ark-button color="success" class="--fluid --medium" data-modal-trigger="submission">
                        @lang('project.submit')
                    </ark-button>
                @else
                    <div class="segment --color-danger +center">
                        @lang('project.waiting-for-availability')
                    </div>
                @endif

            </div>

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

    <ark-tab content="tab-submission" icon="paper-plane">
        @lang('forms.submissions')
        @push('tab-item')
        <div id="tab-submission" class="row +margin-top">

            @forelse($submissions as $submission)
                <section class="small-12 columns">
                    {!! $submission->content !!}
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

    @if(!$project->stage->submission)
        <ark-modal trigger="submission" header="@lang('project.idea-submission-form')">
            <ark-form class="align-center align-middle" action="{{ route('project.idea.submission.store', $project) }}">

                <div slot="body">

                    <ark-form-step>
                        @lang('form.make-a-submission')
                    </ark-form-step>

                    <div class="small-12 columns form__field">
                        <select name="visibility">
                            <option value="0">@lang('project.private')</option>
                            <option value="1">@lang('project.public')</option>
                        </select>
                    </div>

                    <ark-textarea rich-text
                                  name="content"
                                  :rows="5"
                                  label="@lang('project.content')"
                                  placeholder="@lang('forms.content')"
                                  caption="@lang('project.form-description')">
                    </ark-textarea>

                    <ark-button color="success">
                        @lang('forms.submit-idea')
                    </ark-button>

                    <div class="small-12 columns form__description +center-on-mobile">
                        @lang('project.idea-submission.notes')
                    </div>

                </div>
            </ark-form>
        </ark-modal>
    @endif

@endsection

@push('styles')
<link rel="stylesheet" media="all" href="{{ asset('css/plugins/medium/medium.css') }}">
@endpush

@push('scripts')
<script src="{{ asset('js/plugins/Medium.js') }}"></script>
@endpush
