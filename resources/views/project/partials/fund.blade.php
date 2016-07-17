@push('tabs')
<ark-nav>
    <ark-tab content="tab-project" active icon="star">
        @lang('project.project')
        @push('tab-item')
        <div id="tab-project" class="row project-page +margin-top">

            <div class="small-12 medium-8 small-order-2 medium-order-1 columns">
                <section>
                    <header class="header --with-divider --full --small +no-margin-top">Description</header>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad, architecto, ex fuga id
                    inventore natus officia quae quibusdam reiciendis reprehenderit sit vel voluptas. Accusantium est
                    porro quos veritatis voluptatem.

                    <h4>@lang('project.idea')</h4>
                    <ark-quote expand-text="@lang('forms.expand')">
                        {{ $project->idea->content }}
                    </ark-quote>

                    <h4>@lang('project.synapse')</h4>
                    <ark-quote expand-text="@lang('forms.expand')">
                        {{ $project->synapse->content }}
                    </ark-quote>

                    <h4>@lang('project.script')</h4>
                    <ark-quote expand-text="@lang('forms.expand')">
                        {{ $project->script->content }}
                    </ark-quote>

                    <div class="small-12 columns">

                        <ul class="ul --inline --meta --right">
                            <li>
                                @lang('project.script')
                            </li>
                            <li>
                                <a href="#read-mode">
                                    <i class="fa fa-book fa-fw" aria-hidden="true"></i>@lang('forms.read-mode')
                                </a>
                            </li>
                            <li>
                                <a href="#download" title="@lang('forms.download-as-pdf')">
                                    <i class="fa fa-file fa-fw" aria-hidden="true"></i>@lang('forms.download')
                                </a>
                            </li>
                        </ul>

                    </div>

                </section>
            </div>

            <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">

                <div class="project-page__info__overlay">

                    <h2>{{ $project->name }}</h2>

                    @set($cost, $project->expenditures->pluck('expenditurable')->sum('cost'))

                    <span class="chart --centered" data-percent="{{ ($project->totalCollected() / $cost) * 100 }}">
                        <span class="chart__content --reward">{{ $cost }}</span>
                    </span>

                    <div class="project-page__info__overlay__spacer">
                        <ark-progress :data="{{ $cost }}" :max="{{ $cost }}" symbol="¥" label="Budget" color="success"></ark-progress>
                        <ark-progress :data="{{ $project->totalCollected() }}" label="Goal" :max="{{ $cost }}" mode="percentage" color="secondary"></ark-progress>
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
                        <a class="button --white --inverted"
                           href="{{ route('project.fund.create', $project) }}">
                            Back this project
                        </a>

                    </div>

                    <div>
                        <a class="button --white --inverted"
                           href="{{ route('project.enroll.create', $project) }}">
                            Enrol
                        </a>
                    </div>

                </div>
            </div>
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-crew" icon="users">
        @lang('project.crew')
        @push('tab-item')
        <div id="tab-crew" class="row project-page +margin-top">

            <div class="small-12 columns">
                <section>

                    <ark-animation composition="project"
                                   :payload="{{ json_encode($project->enrollable->pluck('expenditurable.profile.name')) }}">
                    </ark-animation>

                </section>
            </div>

        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-comments" icon="comments">
        Comments
        @push('tab-item')
        <div id="tab-comments" class="row align-center project-page +margin-top">

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

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush

