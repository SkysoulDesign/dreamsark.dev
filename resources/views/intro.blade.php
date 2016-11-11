@extends('layouts.master', ['class' => 'intro-page', 'container' => false, 'footer' => false])

@section('content')
    <div class="intro-page__assets --background"></div>
    <ark-animation composition="intro" :payload="[]" style="height: 100%; width: 100%; background: #18142b"></ark-animation>
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/intro.js') }}"></script>
<script src="{{ asset('js/dat.gui.min.js') }}"></script>
<script src="{{ asset('js/NURBSCurve.js') }}"></script>
<script src="{{ asset('js/NURBSSurface.js') }}"></script>
<script src="{{ asset('js/NURBSUtils.js') }}"></script>
@endpush
