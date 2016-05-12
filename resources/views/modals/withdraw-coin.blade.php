<div id="withdraw-coin-modal" class="ui modal">
    <div class="header">
        @lang('user.withdraw-coins')
    </div>
    <div class="content">
        <form id="withdraw-coin-form" class="ui error form" method="post"
              action="{{ route('user.purchase.coin.withdraw') }}">
            {{ csrf_field() }}
            <h3>@lang('payment.coin-available'): <span class="cash">{{ ($user->bag->coins) }}</span></h3>
            @include('partials.field', ['name' => 'withdraw_amount', 'label'=> trans('payment.withdraw-amount'), 'type' => 'number'])
        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.submit')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>