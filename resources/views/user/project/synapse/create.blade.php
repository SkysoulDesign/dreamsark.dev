@extends('user.project.create')

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    <ark-form class="align-center --overlapped" action="{{ route('project.synapse.store', $project) }}">

        <ark-form-header>
            Create Synapse Request
        </ark-form-header>

        <div slot="content">

            <ark-form-step>
                @lang('project.content')
            </ark-form-step>

            <ark-textarea rich-text
                          name="content"
                          :rows="5" class="editable"
                          placeholder="@lang('forms.content')"
                          caption="@lang('project.form-description')">
            </ark-textarea>

            <ark-form-step>
                @lang('project.reward')
            </ark-form-step>

            <ark-fields>
                <ark-input name="reward"
                           required
                           type="number"
                           :min="0"
                           :max="{{ auth()->user()->bag->coins }}"
                           placeholder="@lang('project.amount')"
                           label="@lang('forms.synapse-stage')">
                </ark-input>
                <ark-input name="voting_date"
                           type="datetime-local"
                           placeholder="@lang('project.name')"
                           caption="@lang('project.creation-voting-description')"
                           label="@lang('forms.due-date')">
                </ark-input>
            </ark-fields>

            <div class="small-12 columns divider --simple"></div>

            <ark-button color="success" class="--medium" class="+center-on-mobile">
                Start Synapse Stage
            </ark-button>

            <div class="small-12 columns form__description +center-on-mobile">
                @lang('project.synapse-notes')
            </div>

        </div>

    </ark-form>

@stop
