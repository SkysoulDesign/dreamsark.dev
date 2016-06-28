@push('tabs')
<ark-nav>
    <ark-tab content="tab-project">
        Project
        @push('tab-item')

        <div id="tab-project" class="row project-page --margin-top">

            <div class="small-12 medium-8 columns">

                <div class="row">

                    <div class="small-12 columns">
                        <section>
                            {{ $project->idea->content }}
                        </section>
                    </div>

                    <divider class="small-12 columns divider">Comments</divider>

                    <div class="collection">
                        @foreach(range(1,8) as $index)
                            <div class="small-12 columns">
                                <section>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque ex
                                    laudantium
                                    molestiae pariatur, placeat ratione sequi. Cum, ex, similique! Architecto aspernatur
                                    magnam quasi totam.Assumenda earum eos illum quis?
                                </section>
                            </div>
                        @endforeach
                    </div>

                    <div class="small-12 columns">
                        <form method="post" class="row" action="#">

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
                                        architecto
                                        consequuntur
                                        deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil
                                        quaerat,
                                        quas
                                        sapiente similique, tempora! Aperiam, tempore!
                                    </div>

                                </div>

                            </div>

                        </form>
                    </div>

                </div>

            </div>

            <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">
                <img src="{{ asset('img/temp/2.jpg') }}" alt="">
                <div class="project-page__info__overlay">

                    <div>
                        CREATOR:
                    <span>
                        <a href="#">{{ $project->creator->name }}</a>
                    </span>
                    </div>

                    <div>
                        VOTING DATE:
                        <span>{{ $project->present()->getVotingDate() }}</span>
                    </div>

                    <div>
                        CLOSE DATE:
                        <span>{{ $project->present()->getCloseVotingDate() }}</span>
                    </div>

                    <ark-statistics>
                        <statistic-item data="{{ $project->stage->submissions->count() }}">Submissions</statistic-item>
                        <statistic-item data="{{ $project->present()->getRemainingDays() }}">Days to go</statistic-item>
                    </ark-statistics>

                    <div>
                        <ark-modal class="button --white --inverted">
                            Submit
                            <ark-modal-window>
                                <section>hello</section>
                            </ark-modal-window>
                        </ark-modal>
                    </div>

                </div>
            </div>

        </div>

        @endpush
    </ark-tab>
    {{--<ark-tab content="tab-idea">Idea</ark-tab>--}}
    {{--<ark-tab content="tab-synapse">Synapse</ark-tab>--}}
    {{--<ark-tab content="tab-script">Script</ark-tab>--}}
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
