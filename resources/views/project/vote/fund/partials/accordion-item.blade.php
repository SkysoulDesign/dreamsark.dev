<ark-accordion-item>

    <div slot="header" class="item --attached --hover">

        <div class="small-1 columns item__image">
            <img src="{{ $enroller->user->present()->avatar }}" alt="">
        </div>

        <div class="small-1 columns">
            <a href="#hello">{{ $enroller->user->present()->name }}</a>
        </div>

        <div class="columns +align-right">
            <header class="header +color-success">{{ $enroller->votes->sum('amount') }}</header>
        </div>

    </div>

    <div class="small-12 columns segment --centered --large-padding">
        <ark-form action="{{ route('project.fund.vote.store', $enroller) }}">
            <ark-input type="number" name="amount"
                       placeholder="@lang('forms.amount')"></ark-input>
            <ark-button color="primary">@lang('project.funding-vote')</ark-button>
        </ark-form>
    </div>
</ark-accordion-item>
