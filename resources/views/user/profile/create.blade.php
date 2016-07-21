@extends('layouts.master', ['class' => 'profile-page', 'container' => false])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div class="profile-page__header">

        <div class="profile-page__header__overlay"></div>

        <div id="wrapper" class="row align-middle +full-height +center">

            <div class="small-12 align-top columns">
                <header class="header --inverted +text-shadow +no-margin-bottom">
                    <small>@lang('profile.pick-position'):</small>
                    <h1 class="+uppercase">@{{ position }}</h1>
                </header>
            </div>

            <ark-animation composition="main"
                           :payload="['#characters', '{{ $profiles->random()->name }}']"
                           class="small-12 columns align-middle profile-page__canvas"></ark-animation>

            <div class="small-12 align-bottom columns +z-1">
                <div id="characters" class="row">
                    @foreach($profiles as $profile)
                        <div data-profile-name="{{ $profile->name }}"
                             data-localized-name="@lang("positions.$profile->name")"
                             class="columns profile-page__palette --color-{{ rand(1,20) }}">
                            <div class="profile-page__palette__item">
                                @php $rand = rand(1,8) @endphp
                                <img src="{{ asset("img/profile/$profile->name.png") }}" alt="">
                                <span>@lang("positions.$profile->name")</span>
                            </div>
                        </div>
                    @endforeach
                    <div class="small-12 columns profile-page__palette__select">
                        <button id="selectProfile" class="button --fit --hollow">@lang('forms.select')</button>
                    </div>
                </div>
            </div>

        </div>

    </div>

    <ark-form class="row align-center --overlapped +hidden"
              action="{{ route('user.profile.store') }}">

        {{ csrf_field() }}

        <div class="small-11 medium-9 columns form__header --rounded">
            @lang('profile.profile-creation-form')
        </div>

        <div class="small-11 medium-9 columns form__content --rounded">

            <div class="row">

                <div></div>

                <div class="small-12 columns divider --simple"></div>

                <div class="small-12 columns form__field +center-on-mobile">
                    <button class="button --success --fit">@lang('profile.create-profile')</button>
                </div>

                <div class="small-12 columns form__description +center-on-mobile">
                    @lang('profile.profile-creation-form-notes')
                </div>

            </div>

        </div>

    </ark-form>

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush

@section('pos-scripts')

    <script>
        dreamsark.page("{{ request()->route()->getName() }}", "{{ route('user.profile.fields') }}");
    </script>

@overwrite
