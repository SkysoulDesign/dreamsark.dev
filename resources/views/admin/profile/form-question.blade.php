{{--*/ $options = [] /*--}}
@foreach($questions as $question)
    {{--*/ $options[$question->id] = $question->question /*--}}
@endforeach

@include('partials.checkbox', [
'name' => 'question[]',
'parent_class' => 'grouped',
'label' => trans('forms.select-questions'),
'options' => $options,
'default' => (@$selectedQuestions?:[])])
