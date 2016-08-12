@extends('layouts.master')

@section('content')
    <div class="" style="background: #000; height: 800px">
        <ark-animation composition="test" style="height: 100%;"></ark-animation>
    </div>
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush
