@push('tabs')
<ark-nav>
    <ark-tab content="tab-project" active>
        @lang('project.project')
        @push('tab-item')
        <div id="tab-project" class="row project-page --margin-top">

            <div class="small-12 medium-8 columns">

                <div class="row">

                    <div class="small-12 columns">
                        <header class="header --full --small --light --with-divider +uppercase +no-margin-top">
                            Mission requirements
                        </header>
                        <section>
                            {{ $project->idea->content }}
                        </section>
                    </div>

                    <divider class="small-12 columns divider">Comments</divider>

                    <div class="comments">
                        @foreach(range(1,8) as $index)
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

                    <divider class="small-12 columns divider">Comments</divider>

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

                </div>

            </div>

            <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">
                <img src="{{ asset('img/temp/2.jpg') }}" alt="">
                <div class="project-page__info__overlay">

                    <div>
                        @lang('project.creator')
                        <span>
                            <a href="#">{{ $project->creator->name }}</a>
                        </span>
                    </div>

                    <div>
                        @lang('project.reward')
                        <span>
                            3000
                        </span>
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
                        <statistic-item data="{{ $project->stage->submissions->count() }}">Submissions</statistic-item>
                        <statistic-item data="{{ $project->present()->getRemainingDays() }}">Days to go</statistic-item>
                    </ark-statistics>

                    <div>
                        <button class="button --white --inverted" data-modal-trigger="submission">
                            @lang('project.submit')
                        </button>
                        <ark-modal trigger="submission" header="Idea Submission Form">
                            <form class="row" method="post" action="">

                                {{ csrf_field() }}

                                <div class="small-12 columns form__content --rounded">

                                    <div class="row">

                                        <h3 class="small-12 columns form__step">
                                            Make a Submission
                                        </h3>

                                        <div class="small-12 columns form__field">
                                            <select name="visibility">
                                                <option value="0">@lang('project.private')</option>
                                                <option value="1">@lang('project.public')</option>
                                            </select>
                                        </div>

                                        <div class="small-12 columns form__field">
                                            <textarea name="" id="" cols="30" rows="10"></textarea>
                                        </div>

                                        <div class="small-12 columns divider --simple"></div>

                                        <div class="small-12 columns form__field +center-on-mobile">
                                            <button class="button --success --fit">
                                                @lang('project.submit')
                                            </button>
                                        </div>

                                        <div class="small-12 columns form__description +center-on-mobile">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi
                                            architecto consequuntur deserunt dicta doloremque enim illum ipsam itaque
                                            iusto molestiae mollitia nihil quaerat, quas sapiente similique, tempora!
                                            Aperiam, tempore!
                                        </div>

                                    </div>

                                </div>

                            </form>
                        </ark-modal>
                    </div>

                </div>
            </div>

        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-submission">
        Submission
        @push('tab-item')
        <div id="tab-submission" class="row align-center project-page --tab-comments">

            @foreach(range(1,15) as $index)
                <section class="small-12 columns">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque ex laudantium molestiae
                    pariatur, placeat ratione sequi. Cum, ex, similique! Architecto aspernatur magnam quasi totam.
                    Assumenda
                    earum eos illum quis?
                </section>
            @endforeach

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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto
                            consequuntur
                            deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat,
                            quas
                            sapiente similique, tempora! Aperiam, tempore!
                        </div>

                    </div>

                </div>

            </form>
        </div>
        @endpush
    </ark-tab>
</ark-nav>
@endpush

@section('tab-content')
    @stack('tab-item')
@endsection
