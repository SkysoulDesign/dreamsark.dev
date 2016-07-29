@push('tabs')
<ark-nav>

    @include('project.partials.tab-project', [
        'title' => trans('project.idea'),
        'image' => asset('img/temp/top-bg.png')
    ])

    @include('project.partials.tab-submissions')
    @include('project.partials.tab-comments')

</ark-nav>
@endpush

@section('tab-content')
    @stack('tab-item')
@endsection
