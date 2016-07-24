<ark-nav basic color="transparent-white">
    <ark-item url="{{ route('user.profile.index') }}" {{ activeRoute('user.profile.index') }}>@lang('admin.dashboard')</ark-item>
    <ark-item url="{{ route('admin.project.index') }}" {{ activeRoute('admin.project.index') }}>@lang('admin.projects')</ark-item>
    <ark-item url="{{ route('admin.transaction.index') }}" {{ activeRoute('admin.transaction.index') }}>@lang('admin.transactions')</ark-item>
    <ark-item url="{{ route('admin.user.index') }}" {{ activeRoute('admin.user.index') }}>@lang('admin.users')</ark-item>
    <ark-item url="{{ route('admin.profile.index') }}" {{ activeRoute('admin.profile.index') }}>@lang('admin.profiles')</ark-item>
</ark-nav>


{{--<ul class="ul --inline --tab">--}}
    {{--<li class="li --active"><a href="#">dashboard</a></li>--}}
    {{--<li><a href="{{ route('admin.project.index') }}">@lang('admin.projects')</a></li>--}}
    {{--<li><a href="{{ route('admin.profile.index') }}">@lang('admin.profile')</a></li>--}}
    {{--<li><a href="{{ route('admin.profile.question.index') }}">@lang('admin.question')</a></li>--}}
{{--</ul>--}}
