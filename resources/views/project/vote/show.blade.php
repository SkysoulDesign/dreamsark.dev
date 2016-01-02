@extends('layouts.master')

@section('content')

    @if($model instanceof DreamsArk\Models\Project\Stages\Fund)
        @include('project.fund.vote.create')
    @endif

    @if($model instanceof DreamsArk\Models\Project\Stages\Idea    ||
        $model instanceof DreamsArk\Models\Project\Stages\Synapse ||
        $model instanceof DreamsArk\Models\Project\Stages\Script)
        @include('project.vote.create')
    @endif

@endsection