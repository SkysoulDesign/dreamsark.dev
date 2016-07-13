@extends('layouts.master')

@section('content')

    @include("project.partials." . class_basename($project->stage))

    <div class="base-page__background">

        <div class="base-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row">
            <div class="small-12">
                <header class="header --inverted +center">
                    {{ $project->name }}
                </header>
            </div>
        </div>

        @stack('tabs')

    </div>

    <div class="row +margin-top">
    <div class="small-12 align-center columns">

        @set($stage, $project->stage->getStageName())

        <ark-steps>
            <ark-step {{ active($stage, 'idea') }} description="@lang('project.idea')">1</ark-step>
            <ark-step {{ active($stage, 'script') }} description="@lang('project.script')">2</ark-step>
            <ark-step {{ active($stage, 'synapse') }} description="@lang('project.synapse')">3</ark-step>
            <ark-step {{ active($stage, 'fund') }} description="@lang('project.fund')">4</ark-step>
            <ark-step {{ active($stage, 'distribution') }} description="@lang('project.distribution')">5</ark-step>
        </ark-steps>

    </div>
    </div>

    @yield('tab-content')

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Chart.js') }}"></script>
@endpush
