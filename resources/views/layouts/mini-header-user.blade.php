<div class="container-fluid mini-header">

    <section class="medium-12 medium-centered column bar">

        <div class="row">

            <div class="medium-2 column avatar">
                <a href="{{ route('profile') }}">
                    <img src="{{ asset('dreamsark-assets/avatar-huge.png') }}">
                </a>
            </div>

            <div class="medium-10 column">

                <div class="cash">
                    <img src="{{ asset('dreamsark-assets/coin.png') }}">
                    {{ auth()->user()->bag->coins }}
                </div>

                <ul>
                    <li><a href="{{ route('projects') }}">@lang('navbar.discover-project')</a></li>
                    <li><a href="{{ route('user.projects') }}">@lang('navbar.my-projects')</a></li>
                    <li><a href="{{ route('user.settings') }}">@lang('profile.settings')</a></li>
                </ul>
            </div>

        </div>
    </section>

</div>
