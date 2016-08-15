@extends('project.partials.fragments.project-item', ['color'=>'danger'])

@section('statistics')
    <statistic-item icon="comments" data="{{ $project->stage->comments->count() }}">
        @lang('project.fund')
    </statistic-item>
@overwrite

