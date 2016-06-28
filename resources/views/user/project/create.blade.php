@extends('layouts.master')

@section('content')

    @include('user.partials.header', ['header' => false])

    <div id="root" class="base-page__header --profile-pick" v-on:click="selectProfile">

        <div class="base-page__header__overlay"></div>

        <div id="wrapper" class="row align-middle +full-height +center">

            <div class="small-12 columns">
                <header class="header --inverted +text-shadow">
                    <small>Project</small>
                    <h1 class="+uppercase">The books is on The Table</h1>
                </header>
            </div>

        </div>

    </div>

    <form class="row align-center --overlapped" method="post" action="{{ route('user.project.store') }}">

        {{ csrf_field() }}

        <div class="small-11 medium-9 columns form__header --rounded">
            this is a very nice form header
        </div>

        <div class="small-11 medium-9 columns form__content --rounded">

            <div class="row">

                <h3 class="small-12 columns form__step">
                    <span>1</span>
                    Project Name
                </h3>

                <div class="small-12 columns form__field --required">
                    <input name="name" type="text" placeholder="Project Name">
                </div>

                <h3 class="small-12 columns form__step">
                    <span>2</span>
                    Brief Description
                </h3>

                <div class="small-12 columns form__field --required">
                    <textarea name="content" rows="5"></textarea>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet
                        consectetur deserunt dignissimos dolorum excepturi facilis ipsum laboriosam minima
                        mollitia nisi pariatur, quos recusandae totam vel veniam voluptas voluptatibus.</span>
                </div>

                <h3 class="small-12 columns form__step">
                    <span>3</span>
                    Reward
                </h3>

                <div class="small-12 medium-4 columns form__field --required">
                    <label for="">Idea Stage</label>
                    <input name="reward[idea]" type="text" placeholder="Project Name">
                </div>

                <div class="small-12 medium-4 columns form__field --optional">
                    <label for="">Synapse Stage</label>
                    <input name="reward[synapse]" type="text" placeholder="Project Name">
                </div>

                <div class="small-12 medium-4 columns form__field --optional">
                    <label for="">Script Stage</label>
                    <input name="reward[script]" type="text" placeholder="Project Name">
                </div>

                <div class="small-12 columns form__field --required">
                    <label for="">Ending Date</label>
                    <input name="voting_date" type="date" placeholder="ending date">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet beatae,
                        cum distinctio doloribus eius.</span>
                </div>

                <div class="small-12 columns divider --simple"></div>

                <div class="small-12 columns form__field +center-on-mobile">
                    <button class="button --success --fit">Create Project</button>
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
