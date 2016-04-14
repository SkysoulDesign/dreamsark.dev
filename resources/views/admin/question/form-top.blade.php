@include('partials.field', ['name' => 'question', 'label' => trans('forms.question'), 'value' => old('question', @$question->question)])

@include('partials.checkbox', ['name' => 'is_primary', 'label' => trans('forms.is-primary'), 'options' => [1 => 'Yes'], 'default' => old('is_primary', (@$question->is_primary or '0'))])

@include('partials.select',
    ['name' => 'category', 'id'=>'category', 'label' => trans('forms.category'),
    'default' => old('category', (@$question->category ?: 'general')),
    'collection' => $masterData['category']]
    )

@include('partials.select',
    ['name' => 'type', 'id'=>'question_type', 'class' => 'question_type', 'label' => trans('forms.type'),
    'default' => old('type', (@$question->type ?: 'text')),
    'collection' => $masterData['type']]
    )