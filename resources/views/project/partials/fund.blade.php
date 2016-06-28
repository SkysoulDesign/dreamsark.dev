@push('tabs')
<ark-nav>
    <ark-tab content="tab-project">Project</ark-tab>
    {{--<ark-tab content="tab-idea">Idea</ark-tab>--}}
    {{--<ark-tab content="tab-synapse">Synapse</ark-tab>--}}
    {{--<ark-tab content="tab-script">Script</ark-tab>--}}
    <ark-tab content="tab-comments">Comments</ark-tab>
</ark-nav>
@endpush

@section('tab-content')
    <div id="tab-project" class="row project-page --margin-top">
        <div class="small-12 medium-8 small-order-2 medium-order-1 columns">
            <section>
                <img src="{{ asset('img/temp/cover.jpeg') }}" width="100%" alt="">
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
                    <a href="#" class="button --white --inverted">Vote</a>
                </div>

            </div>
        </div>
    </div>
    <div id="tab-comments" class="row align-center project-page --tab-comments">

        @foreach(range(1,15) as $index)
            <section class="small-12 columns">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque ex laudantium molestiae
                pariatur, placeat ratione sequi. Cum, ex, similique! Architecto aspernatur magnam quasi totam. Assumenda
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto consequuntur
                        deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat, quas
                        sapiente similique, tempora! Aperiam, tempore!
                    </div>

                </div>

            </div>

        </form>
    </div>
@endsection
