<ark-nav>
    <ark-item url="{{ route('user.profile.index') }}" {{ activeRoute('user.profile.index') }}>@lang('user.profiles')</ark-item>
    <ark-item url="{{ route('user.project.index') }}" {{ activeRoute('user.project.index') }}>@lang('user.projects')</ark-item>
    <ark-item url="{{ route('user.activity.earning') }}" {{ activeRoute('user.activity.earning') }}>@lang('user.activity')</ark-item>
    <ark-item url="{{ route('user.purchase.index') }}" {{ activeRoute('user.purchase.index') }}>@lang('user.purchases')</ark-item>
    <ark-item url="{{ route('user.account') }}" {{ activeRoute('user.account') }}>@lang('user.account')</ark-item>
    <ark-item url="{{ route('user.inventory') }}" {{ activeRoute('user.inventory') }}>Inventory</ark-item>
    {{--<ark-item url="{{ route('user.settings') }}" {{ activeRoute('user.settings') }}>@lang('user.settings')</ark-item>--}}
</ark-nav>
