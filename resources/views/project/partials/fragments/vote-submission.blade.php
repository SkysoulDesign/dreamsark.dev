<ark-accordion-item>
    <div slot="header" class="item --attached --hover">

        <div class="small-1 columns item__image">
            <img src="{{ $submission->user->present()->avatar }}" alt="">
        </div>

        <div class="small-1 columns">
            <a href="#hello">{{ $submission->user->present()->name }}</a>
        </div>

        <div class="columns">
            {!!  mb_strimwidth(strip_tags($submission->content), 0, 70, "...")   !!}
        </div>

        <div class="small-3 columns">
            <ark-statistics class="align-center">
                <statistic-item data="0" icon="eye">@lang('vote.viewCount')</statistic-item>
                <statistic-item data="{{ $submission->votes->sum('pivot.amount') }}"
                                icon="heart">@lang('vote.voteCount')
                </statistic-item>
            </ark-statistics>
        </div>

    </div>

    <div class="small-12 columns segment --attached --large-padding">
        {!! $submission->content !!}
    </div>
    <div class="small-12 columns segment --centered --large-padding">
        <ark-form action="{{ route('project.idea.submission.vote.store', $submission) }}">
            {{ csrf_field() }}
            <ark-input type="number" name="amount"
                       placeholder="@lang('forms.amount')"></ark-input>
            <ark-button color="primary">@lang('project.idea-vote')</ark-button>
        </ark-form>
    </div>
</ark-accordion-item>
