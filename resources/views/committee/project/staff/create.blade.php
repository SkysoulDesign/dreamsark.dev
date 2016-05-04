@extends('layouts.master-admin')

@section('content')

    <div class="column">

        <div class="ui segment">
            @include('forms.staff-creation', $review)
        </div>

    </div>

@endsection

@section('pos-scripts')
    <script>
        $(document).ready(function () {
            if ($('#project-cast-modal').length > 0)
                $('#project-cast-modal')
                        .modal({
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                $('#project-cast-form').submit();
                            }
                        })
                        .modal('attach events', '#project-add-cast', 'show');

            if ($('#project-crew-modal').length > 0)
                $('#project-crew-modal')
                        .modal({
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                $('#project-crew-form').submit();
                            }
                        })
                        .modal('attach events', '#project-add-crew', 'show');

            if ($('#project-expense-modal').length > 0)
                $('#project-expense-modal')
                        .modal({
                            blurring:  true,
                            closable:  false,
                            onApprove: function () {
                                $('#project-expense-form').submit();
                            }
                        })
                        .modal('attach events', '#project-add-expense', 'show');

            $('.publish-review.button').on('click', function () {
                if (confirm("Are you sure to publish this project?"))
                    return true;
                else
                    return false;
            });
        });
    </script>
    @include('forms.project-stage-script')
@endsection