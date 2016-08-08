@extends('layouts.master')

@section('content')
    <ark-animation style="height: 500px" composition="MyTestObject"></ark-animation>
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush
