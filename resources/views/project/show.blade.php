@extends('layouts.master', ['class' => 'project-page'])

@section('content')

    @include("project.partials.{$project->stage->getStageName()}")

    <div class="project-page__background">

        <div class="project-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row project-page__header">
            <div class="small-12 columns align-middle">
                <header class="header --color-white --centered --large">
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
                <ark-step {{ active($stage, 'idea') }} description="@lang('project.idea')"></ark-step>
                <ark-step {{ active($stage, 'synapse') }} description="@lang('project.synapse')"></ark-step>
                <ark-step {{ active($stage, 'script') }} description="@lang('project.script')"></ark-step>
                <ark-step {{ active($stage, 'review') }} description="@lang('project.review')"></ark-step>
                <ark-step {{ active($stage, 'fund') }} description="@lang('project.fund')"></ark-step>
                <ark-step {{ active($stage, 'distribution') }} description="@lang('project.distribution')"></ark-step>
            </ark-steps>

        </div>
    </div>

    @yield('tab-content')

@endsection

@section('pos-scripts')

    <script>
        dreamsark.page("{{ request()->route()->getName() }}", '{{ $stage }}');
    </script>

@overwrite
