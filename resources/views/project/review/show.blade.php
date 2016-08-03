@include('project.partials.header', ['title' => 'Review Stage'])

<div class="row align-center">

    <div class="small-10 columns segment --attached --centered --overlapped --large-padding">

        <img class="project-page__review__illustration" src="{{ asset('img/temp/mage.png') }}" alt="">
        <img class="project-page__achievements" src="{{ asset('img/svg/badge-simple-flat.svg') }}">

        <div class="header --light-weight">
            <b class="+color-success">{{ $project->name }}</b>
            <h2>Project Currently Under Review</h2>
        </div>

        <div class="row align-center project-page__review__steps">
            <ark-steps>
                <ark-step {{ active($stage, 'idea') }}></ark-step>
                <ark-step {{ active($stage, 'synapse') }}></ark-step>
                <ark-step {{ active($stage, 'script') }}></ark-step>
                <ark-step {{ active($stage, 'review') }}></ark-step>
                <ark-step {{ active($stage, 'fund') }}></ark-step>
                <ark-step {{ active($stage, 'distribution') }}></ark-step>
            </ark-steps>
        </div>

    </div>

    <div class="small-10 columns segment --color-primary --centered --large-padding +no-round-bottom">

        <ark-statistics class="align-center" size="large">
            <statistic-item data="50">Investors</statistic-item>
            <statistic-item data="1200">Collected</statistic-item>
        </ark-statistics>

    </div>

    <div class="small-10 columns">
        <ark-nav>
            <ark-item url="{{ route('user.profile.index') }}">@lang('project.idea')</ark-item>
            <ark-item url="{{ route('user.project.index') }}">@lang('project.synapse')</ark-item>
            <ark-item url="{{ route('user.activity.earning') }}">@lang('project.script')</ark-item>
            <ark-item url="{{ route('user.activity.earning') }}" icon="comments">@lang('forms.comments')</ark-item>
        </ark-nav>
    </div>

    <div class="small-12 columns +margin-top-small">
        <header class="header --with-divider +uppercase --centered">
            Submissions
        </header>
    </div>

</div>
