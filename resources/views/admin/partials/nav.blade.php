<ark-nav>
    <ark-item url="{{ route('user.profile.index') }}" {{ activeRoute('user.profile.index') }}>@lang('admin.dashboard')</ark-item>
    <ark-item url="{{ route('admin.project.index') }}" {{ activeRoute('user.profile.index') }}>@lang('admin.projects')</ark-item>
    <ark-item url="{{ route('admin.transaction.index') }}" {{ activeRoute('user.project.index') }}>@lang('admin.transactions')</ark-item>
    <ark-item url="{{ route('admin.user.index') }}" {{ activeRoute('user.project.index') }}>@lang('admin.users')</ark-item>
    <ark-item url="{{ route('admin.profile.index') }}" {{ activeRoute('user.purchase.index') }}>@lang('admin.profile')</ark-item>
    <ark-item url="{{ route('admin.profile.question.index') }}" {{ activeRoute('user.purchase.index') }}>@lang('admin.question')</ark-item>
</ark-nav>
