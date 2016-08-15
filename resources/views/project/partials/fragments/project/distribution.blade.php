@extends('project.partials.fragments.project-item', ['color'=>'black'])

@section('statistics')
    <statistic-item icon="comments" data="{{ $project->stage->comments->count() }}">
        @lang('forms.comments')
    </statistic-item>
@overwrite

