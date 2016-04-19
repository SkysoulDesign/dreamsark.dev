@extends('layouts.master-user')


@section('content')

    <div class="column">
        <div class="ui top attached tabular menu customCall create-profile">
            <div class="item" data-tab="step1">@lang('forms.step') 1</div>
            <div class="item" data-tab="step2">@lang('forms.step') 2</div>
            <div class="item" data-tab="step3">@lang('forms.step') 3</div>
        </div>
        <div class="ui bottom attached tab segment" data-tab="step1">
            <p></p>
            <p></p>
        </div>
        <div class="ui bottom attached tab segment" data-tab="step2">
            <p></p>
            <p></p>
        </div>
        <div class="ui bottom attached tab segment" data-tab="step3">
            <p></p>
            <p></p>
        </div>
    </div>

@endsection

@section('pos-scripts')
    <script>
        $(document).ready(function () {
            $('.tabular.menu.customCall .item')
                    .tab({
                        cache: false,
                        apiSettings: {
                            loadingDuration: 300
                        },
                        context: 'parent',
                        auto: true,
                        path: '{{ route('ajax.user.profile.form') }}?step={tab}'
                    })
            ;
            $('.tabular.menu.customCall .item:first-child').trigger('click')

        });
    </script>
@endsection