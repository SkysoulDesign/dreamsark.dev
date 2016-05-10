@section('pos-scripts')
    <script>
        $(document).ready(function () {
            $('.ui.form')
                    .form({
                        fields: {!! json_encode($formValidateArr) !!}
                    })
            ;
        });
    </script>
@endsection