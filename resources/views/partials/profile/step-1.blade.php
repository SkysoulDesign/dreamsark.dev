<h3>Select Profile Type</h3>
{{--*/ $options = [] /*--}}
@foreach($profiles as $profile)
    {{--*/ $options[$profile->id] = $profile->name /*--}}
@endforeach
<div class="ui segment form">
@include('partials.select',
    ['name' => 'profile_id', 'id'=>'profile_id',
    'default' => old('profile_id'),
    'collection' => $options]
    )
</div>