@extends('layouts.master', [])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div class="base-page__header">

        <div class="base-page__header__overlay"></div>

        <div class="row align-middle +full-height +center">

            <div class="small-12 columns">
                <header class="header --inverted +text-shadow">
                    <small>@lang('project.project')</small>
                    <h1 class="+uppercase">@lang('project.creation')</h1>
                </header>
            </div>

        </div>

    </div>

    <ark-form class="row align-center --overlapped"
              action="{{ route('user.project.store') }}">

        <div class="small-11 medium-9 columns form__header --rounded">
            @lang('project.start-project')
        </div>

        <div class="small-11 medium-9 columns form__content --rounded +shadow +large-margin-bottom">

            <div class="row">

                <h3 class="small-12 columns form__step">
                    <span>1</span>
                    @lang('project.name')
                </h3>

                <ark-input name="name" placeholder="@lang('project.name')"></ark-input>

                <h3 class="small-12 columns form__step">
                    <span>2</span>
                    @lang('project.content')
                </h3>

                <ark-textarea name="content"
                              :rows="5"
                              placeholder="@lang('forms.content')"
                              caption="@lang('project.form-description')">
                </ark-textarea>

                <h3 class="small-12 columns form__step">
                    <span>3</span>
                    @lang('project.reward')
                </h3>

                <ark-fields>
                    <ark-input name="reward[idea]"
                               required
                               placeholder="@lang('project.name')"
                               label="@lang('forms.idea-stage')">
                    </ark-input>

                    <ark-input name="reward[synapse]"
                               optional
                               placeholder="@lang('project.name')"
                               label="@lang('forms.synapse-stage')">
                    </ark-input>

                    <ark-input name="reward[script]"
                               optional
                               placeholder="@lang('project.name')"
                               label="@lang('forms.script-stage')">
                    </ark-input>
                </ark-fields>

                <ark-input name="voting_date"
                           type="date"
                           placeholder="@lang('project.name')"
                           caption="@lang('project.creation-voting-description')"
                           label="@lang('forms.due-date')">
                </ark-input>

                <div class="small-12 columns divider --simple"></div>

                <ark-button state="success" class="+center-on-mobile">
                    @lang('forms.create-project')
                </ark-button>

                <div class="small-12 columns form__description +center-on-mobile">
                    @lang('project.creation.notes')
                </div>

            </div>

        </div>

    </ark-form>

@endsection
