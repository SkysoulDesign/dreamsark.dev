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

    @yield('tab-content')

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Chart.js') }}"></script>
@endpush
