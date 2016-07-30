@extends('layouts.master', ['class'=>'project-page'])

@section('content')
    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')
    <ark-form class="align-center --overlapped" action="{{ route('user.project.store') }}">

        <ark-form-header>
            @lang('project.start-project')
        </ark-form-header>

        <div slot="content">

            <ark-form-step>
                @lang('project.name')
            </ark-form-step>

            <ark-input model name="name" placeholder="@lang('project.name')"></ark-input>

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
                           label="@lang('forms.idea-stage')">
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
                @lang('forms.create-project')
            </ark-button>

            <div class="small-12 columns form__description +center-on-mobile">
                @lang('project.creation-notes')
            </div>

        </div>

    </ark-form>
@stop

@push('styles')
<link rel="stylesheet" media="all" href="{{ asset('css/plugins/medium/medium.css') }}">
@endpush

@push('scripts')
<script src="{{ asset('js/plugins/Medium.js') }}"></script>
@endpush
