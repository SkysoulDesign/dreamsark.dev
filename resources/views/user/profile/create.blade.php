@extends('layouts.master', ['class' => 'profile-page'])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div id="root" class="profile-page__header --profile-pick" v-on:click="selectProfile">

        <div class="profile-page__header__overlay"></div>

        <div id="wrapper" class="row align-middle +full-height +center">

            <div class="small-12 align-top columns">
                <header class="header --inverted +text-shadow +no-margin-bottom">
                    <small>@lang('profile.pick-position'):</small>
                    <h1 class="+uppercase">@{{ position }}</h1>
                </header>
            </div>

            <div id="canvas" class="small-12 columns align-middle profile-page__canvas">
                {{--<img src="{{ asset('img/temp/profile-1.png') }}" alt="">--}}
            </div>

            <div class="small-12 align-bottom columns +z-1">
                <div class="row">
                    @foreach(range(1,56) as $index)
                        <div class="columns profile-page__palette --color-{{ rand(1,20) }}">
                            <div class="profile-page__palette__item " data-position="{{ $index }}">
                                @php $rand = rand(1,8) @endphp
                                <img src="{{ asset("img/profile/$rand.png") }}" alt="">
                                <span>Profile {{ $index }}</span>
                            </div>
                        </div>
                    @endforeach
                    <div class="columns profile-page__palette__select">
                        <button id="selectProfile" class="button --fit --hollow">@lang('forms.select')</button>
                    </div>
                </div>
            </div>

        </div>

    </div>

    <form class="row align-center --overlapped +hidden" method="post"
          action="{{ route('user.profile.store', $profiles->first()->name) }}">

        {{ csrf_field() }}

        <div class="small-11 medium-9 columns form__header --rounded">
            this is a very nice form header
        </div>

        <div class="small-11 medium-9 columns form__content --rounded">

            <div class="row">

                @foreach($profiles->first()->questions as $index => $question)

                    <h3 class="small-12 columns form__step">
                        <span>{{ $index + 1 }}</span>
                        {{ $question->question }}
                    </h3>

                    <div class="small-12 columns form__field">
                        <input type="{{ $question->type->name }}" placeholder="{{ $question->question }}">
                    </div>

                @endforeach

                <div class="small-12 columns divider --simple"></div>

                <div class="small-12 columns form__field +center-on-mobile">
                    <button class="button --success --fit">@lang('profile.create-profile')</button>
                </div>

                <div class="small-12 columns form__description +center-on-mobile">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto consequuntur
                    deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat, quas
                    sapiente similique, tempora! Aperiam, tempore!
                </div>

            </div>

        </div>

    </form>

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/profile.js') }}"></script>
@endpush
