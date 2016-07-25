@extends('layouts.master', ['class'=>'project-page'])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div class="project-page__header --default --animated">

        <div class="project-page__header__overlay --animated"></div>

        <div class="row align-middle +full-height +center">

            <div class="small-12 columns">
                <header class="header +color-white +text-shadow">
                    @lang('project.project')
                    <h1 class="+uppercase">@lang('project.creation')</h1>
                </header>
            </div>

        </div>

    </div>

    <ark-form class="align-center --overlapped" action="{{ route('user.project.store') }}">

        <ark-form-header>
            @lang('project.start-project')
        </ark-form-header>

        <div slot="content">

            <ark-form-step>
                @lang('project.name')
            </ark-form-step>

            <ark-input name="name" placeholder="@lang('project.name')"></ark-input>

            <ark-form-step>
                @lang('project.content')
            </ark-form-step>

            <ark-textarea name="content"
                          :rows="5"
                          placeholder="@lang('forms.content')"
                          caption="@lang('project.form-description')">
            </ark-textarea>

            <ark-form-step>
                @lang('project.reward')
            </ark-form-step>

            <ark-fields>
                <ark-input name="reward[idea]"
                           required
                           type="number"
                           :min="0"
                           :max="{{ auth()->user()->bag->coins }}"
                           placeholder="@lang('project.amount')"
                           label="@lang('forms.idea-stage')">
                </ark-input>

                <ark-input name="reward[synapse]"
                           optional
                           type="number"
                           :min="0"
                           :max="{{ auth()->user()->bag->coins }}"
                           placeholder="@lang('project.amount')"
                           label="@lang('forms.synapse-stage')">
                </ark-input>

                <ark-input name="reward[script]"
                           optional
                           type="number"
                           :min="0"
                           :max="{{ auth()->user()->bag->coins }}"
                           placeholder="@lang('project.amount')"
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

            <ark-button color="success" class="--fluid --medium" class="+center-on-mobile">
                @lang('forms.create-project')
            </ark-button>

            <div class="small-12 columns form__description +center-on-mobile">
                @lang('project.creation.notes')
            </div>

        </div>

    </ark-form>

@endsection
