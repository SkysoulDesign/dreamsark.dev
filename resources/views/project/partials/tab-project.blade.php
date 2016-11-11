<ark-tab content="tab-project" active icon="star">

    {{ $title }}

    @push('tab-item')

    <div id="tab-project" class="row align-center +margin-top">

        <div class="small-12 columns +center">

            <div class="project-page__top-animation">
                <div class="row">
                    <div class="small-8 columns project-page__top-animation__content">
                        <img src="{{ $image }}" alt="">
                    </div>
                </div>
            </div>

            <img class="project-page__avatar"
                 src="{{ asset('img/svg/person-flat.svg') }}">

            <header class="header +uppercase +no-margin-top +z-2">
                @lang('project.mission-requirements')
            </header>

        </div>

        <div class="small-10 columns segment project-page__requirement-content --large-padding">
            <h2>@lang('project.mission-description')</h2>
            {!! $project->stage->content !!}
        </div>

        @if($project->stage->vote->active)

            <div class="small-10 columns message --color-primary +center">
                @lang('project.reachVotingStage')
                <h2>
                    <a href="{{ route('project.vote.create', $project) }}">@lang('project.participate')</a>
                </h2>
            </div>

        @endif

        @if($project->stage->submission)

            <div class="small-10 columns message --color-success +center">
                @lang('project.getWinnerToNextStage')
                <b><a href="#">{{ $project->stage->submission->user->present()->name }}</a></b> !!!
            </div>

        @elseif(!$project->stage->active)

            <div class="small-10 columns message --color-danger +center">
                <h1>@lang('project.failed')</h1>
                overdue/過時
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aperiam consequatur consequuntur
                corporis dignissimos distinctio, doloribus, dolorum ducimus maxime minus modi neque nisi quo rem
                temporibus ullam vel. Delectus, iure.
            </div>
        @endif
        <div class="small-10 columns segment --color-primary">
            <div class="row align-center align-middle --large-padding">
                <div class="small-4 columns project-page__right-divider">
                    <ul class="ul --with-bullets --tight +uppercase">
                        <li class="li --title">@lang('project.achievements')</li>
                        <li>依据开立项目金额乱数给予奖励,奖励可以用来购买商城道具或是提升使用者等级来增加参与感/explain how rewards working</li>
                        <li>2500 points</li>
                        <li>5 experience</li>
                        @foreach($project->stage->reward->items as $item)
                            <li>{{ $item->name }}</li>
                        @endforeach
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

        <div class="small-10 columns message --color-primary">
            <div class="row align-center">

                <div class="small-12 columns +center">
                    @lang('project.reachVotingStage')
                    <h2>
                        <a href="{{ route('project.vote.create', $project) }}">@lang('project.participate')</a>
                    </h2>
                </div>

                <ark-progress class="small-11 columns"
                              color="primary"
                              :live="['{{ $project->stage->vote->created_at }}', '{{ $project->stage->vote->open_date }}']"
                              size="large" label="@lang('project.time')"></ark-progress>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda consectetur consequuntur
                    corporis, dolorem fugit harum iusto maiores molestiae nisi nostrum placeat praesentium provident qui
                    quos, sed tempore temporibus voluptatem.</p>

            </div>
        </div>

        @if($project->stage->submission)
            <div class="small-12 columns +margin-top-small">
                <header class="header --with-divider +uppercase --centered">
                    @lang('project.winner-submission')
                </header>
            </div>

            <div class="small-10 columns segment --large-padding +margin-top">
                <div class="segment__header --image --centered">
                    <img src="{{ $project->stage->submission->user->present()->avatar }}" alt="">
                    <a href="#">{{ $project->stage->submission->user->present()->name }}</a>
                </div>
                {!! $project->stage->submission->content !!}
            </div>

        @elseif($project->stage->active)

            @forelse($submissions as $submission)

                <div class="small-12 columns">
                    <header class="header --with-divider +uppercase --centered">
                        @lang('project.MySubmission')
                    </header>
                </div>

                @if(!$project->stage->vote->active)
                    <div class="small-10 columns segment">

                        <ark-form action="{{ route('project.idea.submission.update', [$project, $submission]) }}"
                                  method="patch">

                            <ark-textarea rich-text name="content" :rows="5">
                                {{ $submission->content }}
                            </ark-textarea>

                            <div class="small-12 divider --simple"></div>

                            <ul class="ul --inline">
                                <li>
                                    <ark-button color="primary">
                                        @lang('forms.save')
                                    </ark-button>
                                </li>
                                <li class="li --end">
                                    <ark-switcher name="visibility">
                                        <ark-switcher-option
                                                value="1" {{ $submission->visibility == 1 ? 'checked' : '' }}>
                                            @lang('project.public')
                                        </ark-switcher-option>
                                        <ark-switcher-option
                                                value="0" {{ $submission->visibility == 0 ? 'checked' : '' }}>
                                            @lang('project.private')
                                        </ark-switcher-option>
                                    </ark-switcher>
                                </li>
                            </ul>

                        </ark-form>
                    </div>
                @else
                    <div class="small-10 columns segment --large-padding">
                        {!! $submission->content !!}
                    </div>
                @endif
            @empty

                <div class="small-12 columns">
                    <header class="header --with-divider +uppercase --centered">
                        @lang('project.idea-submission-form')
                    </header>
                </div>
                <div class="small-10 columns">
                    <ark-form class="align-center segment"
                              action="{{ route('project.idea.submission.store', $project) }}">

                        <div slot="body">

                            <ark-textarea rich-text name="content" :rows="5"
                                          label="@lang('forms.submit-idea')"></ark-textarea>

                            <div class="small-12 divider --simple"></div>

                            <ul class="ul --inline">
                                <li>
                                    <ark-button color="primary">
                                        @lang('project.submit')
                                    </ark-button>
                                </li>
                                <li class="li --end">
                                    <ark-switcher name="visibility">
                                        <ark-switcher-option value="1">@lang('project.public')</ark-switcher-option>
                                        <ark-switcher-option
                                                value="0">@lang('project.private')</ark-switcher-option>
                                    </ark-switcher>
                                </li>
                            </ul>

                            <div class="small-12 columns form__description +center-on-mobile">
                                @lang('forms.comments-note')
                            </div>

                        </div>

                    </ark-form>
                </div>

            @endforelse

        @endif

    </div>

    @endpush

</ark-tab>
