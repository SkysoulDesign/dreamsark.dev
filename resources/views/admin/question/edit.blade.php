@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.question-menu')

    <div class="ui segment">
        <form class="ui form warning error" action="{{ route('admin.question.update', $question->id) }}" method="POST">

            {{ method_field('patch') }}

            {{ csrf_field() }}
            <h3>@lang('forms.edit-questionnaire')</h3>

            @include('admin.question.form-top')

            <div class="ui segment options_block" style="display: none;">
                {{--*/ $options = $question->options /*--}}
                @if($options)
                    @foreach($options as $key => $value)
                        @include('partials.field', ['name' => 'options['.$key.']', 'parent_class' => 'option', 'placeholder' => trans('forms.options'), 'label' => trans('forms.options'), 'value' => $value])
                    @endforeach
                @else
                    @include('partials.field', ['name' => 'options[]', 'parent_class' => 'option', 'placeholder' => trans('forms.options'), 'label' => trans('forms.options'), 'value' => ''])
                @endif
                <div class="ui small menu">
                    <a href="javascript:;" class="item add-icon"><i class="add icon"></i>@lang('forms.add-option')</a>
                    <a href="javascript:;" class="item delete-icon"><i class="delete icon"></i>@lang('forms.delete-option')
                    </a>
                </div>
            </div>

            @include('partials.field', ['name' => 'order', 'label' => trans('forms.order'), 'value' => old('order', $question->order)])

            <button class="ui submit button primary" type="submit">@lang('forms.update')</button>

            <a href="{{ route('admin.question.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection

@section('pos-scripts')
    <script type="text/javascript" src="{{ asset('js/question-form.js') }}"></script>
@endsection