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
                        <a class="item" href="{{ route('user.projects') }}">@lang('navbar.my-project')</a>
                        <a class="item" href="{{ route('user.settings') }}">@lang('navbar.activity')</a>
                        {{--<div class="ui dropdown item">
                            @lang('navbar.activity')
                            <div class="menu">
                                <a href="{{ route('user.activity.backed.list') }}" class="item">@lang('navbar.backed-list')</a>
                                <a href="{{ route('user.activity.enrolled.list') }}" class="item">@lang('navbar.enrolled-list')</a>
                                <a href="{{ route('user.activity.earning') }}" class="item">@lang('navbar.earning-list')</a>
                                <a href="{{ route('user.purchase.index') }}" class="item">@lang('navbar.purchases')</a>
                                <a class="item" href="{{ route('user.settings') }}">@lang('navbar.setting')</a>
                            </div>
                        </div>--}}
                    </div>
                </div>
            @endif

        </div>
    </section>

</div>

