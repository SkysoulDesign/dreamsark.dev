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
                    {{ $project->script->content }}
                </section>
            </div>
            <div class="small-12 medium-4 columns project-page__info">

                <div class="project-page__info__overlay">

                    <h2>{{ $project->name }}</h2>

                    <span class="chart --centered" data-percent="100">
                        <span class="chart__content --reward">5000</span>
                    </span>

                    <div class="project-page__info__overlay__spacer">
                        <ark-progress :data="5" :max="30" symbol="days" label="Time Left"
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
                            <a href="{{ route('project.idea.vote.create', $project) }}" class="button --white --inverted">
                                @lang('project.voting')
                            </a>
                        @else
                            <button class="button --white --inverted" data-modal-trigger="submission">
                                @lang('project.submit')
                            </button>
                        @endif
                    </div>

                </div>
            </div>

            <div class="small-12 columns divider">@lang('general.comments')</div>
            <div class="comments">
                @foreach(range(1,4) as $index)

                    <div class="small-12 columns comments__item">
                        <div class="row">
                            <div class="small-1 columns comments__item__author">
                                <img src="{{ asset('img/temp/avatar.png') }}" alt="">
                            </div>
                            <div class="small-11 columns comments__item__content">
                                <ul class="ul --inline --divided">
                                    <li><a href="#">Rafael Milewski</a></li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque ex
                                    laudantium molestiae pariatur, placeat ratione sequi. Cum, ex, similique!
                                    magnam quasi totam.Assumenda earum eos illum quis?</p>
                            </div>
                            <div class="small-11 small-offset-1 columns comments__item__meta">

                                <ul class="ul --inline --divided --right">
                                    <li>March, 20, 2016 - 16:99:30</li>
                                    <li><a href="#">edit</a></li>
                                    <li><a href="#">delete</a></li>
                                    <li><a href="#">report</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                @endforeach
            </div>
            <div class="small-12 columns divider">@lang('general.comments')</div>
            <div class="small-12 columns">
                <div class="row">
                    <form method="post" action="#">

                        {{ csrf_field() }}

                        <div class="small-12 medium-12 columns form__content --rounded">

                            <div class="row">

                                <h3 class="small-12 columns form__step">
                                    Comments
                                </h3>

                                <div class="small-12 columns form__field">
                                    <textarea name="comment" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="small-12 columns divider --simple"></div>

                                <div class="small-12 columns form__field +center-on-mobile">
                                    <button class="button --success --fit">Leave a Comment</button>
                                </div>

                                <div class="small-12 columns form__description +center-on-mobile">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi
                                    sapiente similique, tempora! Aperiam, tempore!
                                </div>

                            </div>

                        </div>

                    </form>
                </div>
            </div>

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
@endsection
