@include('project.partials.header', ['title' => $project->name])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding project-page__fund">

        <img src="{{ asset('img/dummy/cover-1.jpg') }}">

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorum ea laborum officia quaerat sequi
            tempore voluptatum. Inventore minus natus porro provident quae! Ducimus explicabo ipsum nam sequi tempora
            voluptates.</p>

        <div class="row align-center +margin-top-small">
            <div class="small-5">
                <ark-fields>
                    <ark-button class="--fluid" color="success">Enrol to this project</ark-button>
                    <ark-button data-modal-trigger="invent-project"
                                class="--fluid" color="primary">
                        Invest on this Project
                    </ark-button>
                </ark-fields>
            </div>
        </div>

    </div>

    <div class="small-10 columns segment --color-primary --centered --large-padding +no-round-bottom">

        <ark-statistics class="align-center" size="large">
            <statistic-item data="{{ $project->investors->unique()->count() }}">Investors</statistic-item>
            <statistic-item data="{{ $project->investors->sum('pivot.amount') }}">Collected</statistic-item>
            <statistic-item data="{{ $project->expenditures->sum('expenditurable.cost') }}">$ Goal
            </statistic-item>
        </ark-statistics>

        <div class="row align-center +left +margin-top-small">
            <div class="small-5 columns">
                <ul class="ul --fluid --tight">
                    <li>
                        <ark-progress :data="{{ $project->investors->sum('pivot.amount') }}"
                                      :max="{{ $project->expenditures->sum('expenditurable.cost') }}"
                                      label="Goal Competition" mini mode="percentage"></ark-progress>
                    </li>
                    <li>
                        <ark-progress :data="20" :max="100" label="Time Competition" color="red" mini></ark-progress>
                    </li>
                </ul>
            </div>
        </div>

    </div>

    <div class="small-10 columns">
        <ark-nav>
            @include('project.partials.tab-fund', ['active' => true])
            @include('project.partials.tab-idea')
            @include('project.partials.tab-synapse')
            @include('project.partials.tab-script')
            @include('project.partials.tab-investors')
            @include('project.partials.tab-comments')
        </ark-nav>
    </div>

    <div class="small-12 columns">
        @stack('tab-item')
    </div>

</div>

<ark-modal v-cloak trigger="invent-project" header="Become an Investor">

    <ark-form class="align-center +margin-top-small"
              action="{{ route('project.fund.store', $project) }}">

        <ark-form-step>
            @lang('forms.investment')
        </ark-form-step>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat harum id iste minus odio quasi ratione
            repellendus! Ab deserunt itaque minus, natus nobis nulla unde. Blanditiis impedit labore rerum veniam!</p>


        <ark-input name="amount"
                   required
                   type="number"
                   :min="1"
                   placeholder="@lang('forms.amount')">
        </ark-input>

        <ark-button color="success" class="--fluid --medium" class="+center-on-mobile">
            @lang('forms.invest')
        </ark-button>

    </ark-form>

</ark-modal>
