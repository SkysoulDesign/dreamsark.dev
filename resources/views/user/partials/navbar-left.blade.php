<div class="four wide column">
    <div class="ui vertical fluid menu">
        <div class="item header">@lang('navbar.activity-list')</div>
        @php
            $sideMenuArr = [
                ['url' => 'user.settings', 'label' => trans('navbar.account-settings')],
                ['url' => 'user.purchase.index', 'label' => trans('navbar.purchases')],
                ['url' => 'user.activity.backed.list', 'label' => trans('navbar.backed-list')],
                ['url' => 'user.activity.enrolled.list', 'label' => trans('navbar.enrolled-list')],
                ['url' => 'user.activity.earning', 'label' => trans('navbar.earning-list')],
                ['url' => '', 'label' => trans('navbar.social-media')],
            ];
        @endphp
        @foreach($sideMenuArr as $item)
            @php $isActive = request()->route()->getName()==$item['url'] ? true : false; @endphp
            <a class="item{!! $isActive?' active':'' !!}" href="{{ $item['url']?route($item['url']):'javascript:;' }}">
                {{ $item['label'] }}
                @if($isActive)
                    <i class="icon angle double right"></i>
                @endif
            </a>
        @endforeach
        {{--<a class="item" href="{{ route('user.settings') }}">
            @lang('navbar.account-settings')
        </a>
        <a class="item" href="{{ route('user.purchase.index') }}">
            @lang('navbar.purchases')
        </a>
        <a href="{{ route('user.activity.backed.list') }}" class="item">@lang('navbar.backed-list')</a>
        <a href="{{ route('user.activity.enrolled.list') }}" class="item">@lang('navbar.enrolled-list')</a>
        <a href="{{ route('user.activity.earning') }}" class="item">@lang('navbar.earning-list')</a>
        <a class="item" href="javascript:;">
            @lang('navbar.social-media')
        </a>--}}

    </div>
</div>
<div class="ui vertical no-content divider"></div>