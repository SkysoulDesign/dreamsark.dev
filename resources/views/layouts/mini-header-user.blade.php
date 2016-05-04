<div class="container-fluid mini-header">

    <section class="medium-12 medium-centered column bar">

        <div class="row">
            @if(auth()->check())
                <div class="medium-2 column avatar">
                    <a href="{{ route('user.account') }}">
                        <img src="{{ asset('dreamsark-assets/avatar-huge.png') }}">
                    </a>
                </div>

                <div class="medium-10 column">
                    <div class="cash">
                        <img src="{{ asset('dreamsark-assets/coin.png') }}">
                        {{ auth()->user()->bag->coins }}
                    </div>

                    <div class="ui transparent menu">
                        <a class="item" href="{{ route('user.profile.index') }}">@lang('navbar.profiles')</a>
                        <a class="item" href="{{ route('user.projects') }}">@lang('navbar.my-projects')</a>
                        <a class="item" href="{{ route('user.settings') }}">@lang('profile.settings')</a>
                    </div>
                </div>
            @endif

        </div>
    </section>

</div>

