@include('project.partials.header', ['title' => $project->name])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding project-page__fund">

        <img src="{{ asset('img/dummy/cover-1.jpg') }}">

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorum ea laborum officia quaerat sequi
            tempore voluptatum. Inventore minus natus porro provident quae! Ducimus explicabo ipsum nam sequi tempora
            voluptates.</p>

    </div>

    <div class="small-10 columns segment --color-primary --attached --centered --large-padding +no-round-bottom">

        <ark-statistics class="align-center" size="large">
            <statistic-item data="12">
                @lang('general.investor')
            </statistic-item>
            <statistic-item data="123123">
                @lang('general.collect')
            </statistic-item>
            <statistic-item data="42">
                @lang('project.invest-goalMoney')
            </statistic-item>
        </ark-statistics>

    </div>

    <div class="small-10 columns">
        <ark-nav>
            @include('project.partials.tab-distribution', ['active' => true])
            @include('project.distribution.partials.tab-crew', [
                'expenditures' => $expenditures->where('expenditurable_type', 'crews')
            ])
            @include('project.distribution.partials.tab-expenses', [
                'expenditures' => $expenditures->where('expenditurable_type', 'expenses')
            ])
            {{--@include('project.partials.tab-fund')--}}
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
