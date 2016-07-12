@push('tabs')
<ark-nav>
    <ark-tab content="tab-project" active icon="star">
        Project
        @push('tab-item')

        <div id="tab-project" class="row project-page --margin-top">

            <div class="small-12 align-center columns">
                <ark-steps>
                    <ark-step description="Listing information">1</ark-step>
                    <ark-step description="Photos & Details">2</ark-step>
                    <ark-step active description="Review & Post">3</ark-step>
                    <ark-step description="Your order">4</ark-step>
                </ark-steps>
            </div>

            <div class="small-12 medium-8 small-order-2 medium-order-1 columns">

                <section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad, architecto, ex fuga id
                    inventore natus officia quae quibusdam reiciendis reprehenderit sit vel voluptas. Accusantium est
                    porro quos veritatis voluptatem.

                    <div class="quote">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at, culpa dolorem enim error
                        facilis illum inventore ipsa ipsam, iste labore laboriosam minima nemo possimus repellendus
                        repudiandae sit ullam vero. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
                        cum deserunt eos excepturi exercitationem fuga illo impedit numquam, perferendis, possimus
                        quibusdam soluta voluptatem! Deserunt et exercitationem in ipsa quam.
                    </div>

                </section>
            </div>

            <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">

                <div class="project-page__info__overlay">

                    <h2>{{ $project->name }}</h2>

                    <span class="chart --centered" data-percent="100">
                        <span class="chart__content --reward">5000</span>
                    </span>

                    <div class="project-page__info__overlay__spacer">
                        <ark-progress :data="3000" :max="5000" symbol="¥" label="Budget" color="success"></ark-progress>
                        <ark-progress :data="10" label="Goal" color="secondary"></ark-progress>
                        <ark-progress :data="5" :max="30" symbol="days" label="Time Left"
                                      color="ternary"></ark-progress>
                    </div>

                    <div>
                        @lang('project.director')
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
    <ark-tab content="tab-crew">
        Crew
        @push('tab-item')
        <div id="tab-crew" class="row project-page --margin-top">
            Crew Tab
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
