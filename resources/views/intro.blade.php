@extends('layouts.master', ['class' => 'profile-page', 'container' => false, 'footer' => false])

@section('content')
    <style>
        body {
            overflow: hidden
        }
    </style>
    <ark-animation composition="intro" :payload="[]" style="height: 100%; width: 100%">
    </ark-animation>
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/intro.js') }}"></script>
@endpush
