@extends('layouts.master', ['class' => 'profile-page', 'container' => false])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div class="profile-page__header">

        <div class="profile-page__header__overlay"></div>

        <div id="wrapper" class="row align-middle +full-height +center">

            <div class="small-12 align-middle columns">
                <header class="header --color-white +text-shadow" v-cloak>
                    @lang('profile.pick-position')
                    <h1 class="+uppercase">@{{ position }}</h1>
                </header>
            </div>
            {{--@lang("positions.{position}")--}}
            <ark-animation composition="main"
                           :payload="['#characters', '{{ request()->input('profile', $profiles->random()->name) }}']"
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

        <ark-form-header>
            @lang('profile.profile-creation-form')
        </ark-form-header>

        <div slot="content">

            <div id="form-container"></div>

            <div class="small-12 columns divider --simple"></div>

            <ark-button>
                @lang('profile.create-profile')
            </ark-button>

            <div class="small-12 columns form__description +center-on-mobile">
                @lang('profile.profile-creation-form-notes')
            </div>

        </div>

    </ark-form>

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush

@section('pos-scripts')

    <script>
        dreamsark.page("{{ request()->route()->getName() }}", "{{ route('user.profile.questions') }}");
    </script>

@overwrite
