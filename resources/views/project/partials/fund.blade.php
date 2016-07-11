@push('tabs')
<ark-nav>
    <ark-tab content="tab-project" active>
        Project
        @push('tab-item')
        <div id="tab-project" class="row project-page --margin-top">
            <div class="small-12 medium-8 small-order-2 medium-order-1 columns">
                <section>
{{--                    <img src="{{ asset('img/temp/cover.jpeg') }}" width="100%" alt="">--}}
                </section>
            </div>
            <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">
                <img src="{{ asset('img/temp/2.jpg') }}" alt="">
                <div class="project-page__info__overlay">

                    <div>
                        DIRECTOR:
                        <span>Rafael Milewski</span>
                    </div>

                    <div>
                        DIRECTOR:
                        <span>Rafael Milewski</span>
                    </div>

                    <div>
                        RELEASE DATE:
                        <span>June 18, 2015</span>
                    </div>

                    <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam cum iure laboriosam laborum,
                    laudantium, minus nisi nobis possimus, provident quaerat quod repellendus velit veniam voluptatem.
                    Architecto libero quos suscipit!
                </span>

                    <ark-statistics>
                        <statistic-item data="¥120">COLLECTED</statistic-item>
                        <statistic-item data="4">BACKERS</statistic-item>
                        <statistic-item data="2">CREW MEMBERS</statistic-item>
                    </ark-statistics>

                    <div>
                        @if($project->stage->vote->active)
                            <a class="button --white --inverted"
                               href="{{ route('project.vote.show', $project->stage->vote) }}">
                                Vote
                            </a>
                        @endif
                    </div>

                </div>
            </div>
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-idea">
        Idea
        @push('tab-item')
        <div id="tab-idea" class="row project-page --margin-top">
            Idea Tab
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-synapse">
        Synapse
        @push('tab-item')
        <div id="tab-synapse" class="row project-page --margin-top">
            Synapse Tab
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-script">
        Script
        @push('tab-item')
        <div id="tab-script" class="row project-page --margin-top">
            Script Tab
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-comments">
        Comments
        @push('tab-item')
        <div id="tab-comments" class="row align-center project-page --tab-comments">

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
