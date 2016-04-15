@include('partials.field', ['name' => 'question', 'value' => old('question', @$question->question)])

@include('partials.checkbox', ['name' => 'is_primary', 'parent_class' => 'inline', 'options' => [1 => 'Yes'], 'default' => [old('is_primary', (@$question->is_primary ?: '0'))]])

@include('partials.select',
    ['name' => 'category', 'id'=>'category',
    'default' => old('category', (@$question->category ?: 'general')),
    'collection' => $masterData['category']]
    )

@include('partials.select',
    ['name' => 'type', 'id'=>'question_type', 'class' => 'question_type',
    'default' => old('type', (@$question->type ?: 'text')),
    'collection' => $masterData['type']]
    )