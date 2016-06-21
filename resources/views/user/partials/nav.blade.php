{{--<ark-nav namespace="user">--}}
    {{--<ark-nav-item destination="{{ route('user.projects') }}" name="profile">--}}
        {{--Profile--}}
    {{--</ark-nav-item>--}}
{{--</ark-nav>--}}

<div class="row --fluid nav --hover align-center">

    <div class="row medium-uncollapse nav__content +center-on-mobile">

        <a href="#" class="columns nav__content__item {{ active('user.profile') }}">
            Profiles
        </a>

        <a href="{{ route('user.projects') }}" class="columns nav__content__item {{ active('user.projects') }}">
            Project
        </a>

        <a href="#" class="columns nav__content__item">
            Activities
        </a>

        <a href="{{ route('user.account') }}" class="columns nav__content__item {{ active('user.account') }}">
            Account
        </a>

        <a href="#" class="columns nav__content__item {{ active('user.settings') }}">
            Settings
        </a>

    </div>

</div>


