@extends('project.partials.fragments.project-item', ['color'=>'success'])

@section('statistics')
    <statistic-item icon="comments" data="{{ @$project->stage->comments->count() }}">
        macarrao
    </statistic-item>
    <statistic-item icon="comments" data="{{ @$project->stage->comments->count() }}">
        fund
    </statistic-item>
@overwrite

