<ark-nav>
    <ark-item url="{{ route('user.profile.index') }}" {{ active('user.profile.index') }}>@lang('user.profiles')</ark-item>
    <ark-item url="{{ route('user.project.index') }}" {{ active('user.project.index') }}>@lang('user.projects')</ark-item>
    <ark-item>@lang('user.activity')</ark-item>
    <ark-item url="{{ route('user.purchase.index') }}" {{ active('user.purchase.index') }}>@lang('user.purchases')</ark-item>
    <ark-item url="{{ route('user.account') }}" {{ active('user.account') }}>@lang('user.account')</ark-item>
    <ark-item url="{{ route('user.settings') }}" {{ active('user.settings') }}>@lang('user.settings')</ark-item>
</ark-nav>
