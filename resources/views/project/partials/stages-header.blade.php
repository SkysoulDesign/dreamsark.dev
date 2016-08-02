@include('project.partials.header', ['title' => $project->name])

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

@section('pos-scripts')
    <script>
        dreamsark.page("{{ request()->route()->getName() }}", '{{ $stage }}');
    </script>
@overwrite

@push('styles')
<link rel="stylesheet" media="all" href="{{ asset('css/plugins/medium/medium.css') }}">
@endpush

@push('scripts')
<script src="{{ asset('js/plugins/Medium.js') }}"></script>
@endpush
