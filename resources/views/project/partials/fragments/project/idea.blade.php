@extends('project.partials.fragments.project-item', ['color' => $color ?? 'primary'])

@section('statistics')
    <statistic-item data="{{ $project->stage->reward->amount}}" icon="star">
        @lang('project.reward')
    </statistic-item>
    <statistic-item data="{{ $project->stage->submissions->count() }}" icon="paper-plane">
        @lang('project.submissions')
    </statistic-item>
    <statistic-item icon="comments" data="{{ $project->stage->comments->count() }}">
        comments
    </statistic-item>
@overwrite

