<h3>Please fill the form given below</h3>
<div class="ui segment form">
    {{--*/ $category='' /*--}}
    @foreach($questions as $question)
        @if($question->category!=$category)
            {{--*/ $category = $question->category /*--}}
            <h4>@lang('forms.'.$category)</h4>
        @endif
        {{--*/ $name = 'question['.$question->id.']'.($question->type=='checkbox'?'[]':'') /*--}}
        {{--*/ $label = $question->question /*--}}
        @if($question->type=='select')
            @include( 'partials.select', ['name' => $name, 'label' => $label, 'default' => old($name), 'collection' => $question->options] )
        @elseif(in_array($question->type, ['radio', 'checkbox']))
            @include('partials.checkbox', ['name' => $name, 'label' => $label, 'type' => $question->type, 'parent_class' => 'grouped', 'options' => $question->options])
        @elseif(in_array($question->type, ['file', 'text', 'date']))
            @include('partials.field', ['name' => $name, 'label' => $label, 'type' => $question->type, 'value' => old($name)])
        @elseif($question->type=='textarea')
            @include('partials.textarea', ['name' => $name, 'label' => $label, 'value' => old($name)])
        @else
            @include('partials.field', ['name' => $name, 'label' => $label, 'value' => old($name)])
        @endif
    @endforeach
</div>