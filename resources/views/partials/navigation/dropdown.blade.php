<ark-dropdown title="{{ auth()->user()->username }}" mode="simple">

    <ark-dropdown-option href="{{ route('user.account') }}">
        @lang('navbar.account')
    </ark-dropdown-option>

    <ark-dropdown-option href="{{ route('user.project.index') }}">
        @lang('navbar.my-projects')
    </ark-dropdown-option>

    @can('see-admin-section', auth()->user())
        <ark-dropdown-option href="{{ route('admin.index') }}">
            @lang('navbar.admin')
        </ark-dropdown-option>
    @endcan

    @can('see-committee-section', auth()->user())
        <ark-dropdown-option href="{{ route('committee.index') }}">
            @lang('navbar.committee')
        </ark-dropdown-option>
    @endcan

    {{--<ark-dropdown-option>--}}
        {{--@lang('navbar.settings')--}}
    {{--</ark-dropdown-option>--}}

    <ark-dropdown-option href="{{ route('logout') }}">
        @lang('navbar.logout')
    </ark-dropdown-option>

</ark-dropdown>
