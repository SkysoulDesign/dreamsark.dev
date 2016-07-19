<div class="ui four wide column">
    <div class="ui vertical fluid menu">
        <div class="header item">@lang('navbar.profile')</div>
        @foreach($profileList as $profile)
            <a href="{{ route('public.profile.list', [$profile->name]) }}" class="item">
                {{ $profile->display_name }}
                <div class="ui teal label">{{ $profile->userCount() }}</div>
            </a>
        @endforeach
    </div>
</div>
