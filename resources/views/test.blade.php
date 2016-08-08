@extends('layouts.master')

@section('content')
    <ark-animation composition="MyTestObject"></ark-animation>//call typescript
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush
