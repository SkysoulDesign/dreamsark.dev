<div class="four wide column">
    <div class="ui vertical fluid menu">
        <div class="item header">@lang('navbar.activity-list')</div>
        @php
            $sideMenuArr = [
                ['url' => 'user.settings', 'label' => trans('user.settings')],
                ['url' => 'user.purchase.index', 'label' => trans('user.purchases')],
                ['url' => 'user.activity.backed.list', 'label' => trans('user.backed-list')],
                ['url' => 'user.activity.enrolled.list', 'label' => trans('user.enrolled-list')],
                ['url' => 'user.activity.earning', 'label' => trans('user.earning-list')],
                ['url' => '', 'label' => trans('user.social-media')],
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
    </div>
</div>
<div class="ui vertical no-content divider"></div>