@section('pos-scripts')
    <script>
        var processUrl = '{{ route('admin.transactions.update', 'PARAM') }}';
        $(document).ready(function () {
            $('.status.button').click(function () {
                if(confirm("{{ trans('general.are-you-sure') }}?")) {
                    let newStatus = $(this).attr('type');
                    let unique_id = $(this).parents('td.actions').attr('unique_id');
                    $.ajax({
                        url:        processUrl.replace('PARAM', newStatus),
                        type:       'get',
                        data:       'transaction_id=' + unique_id,
                        beforeSend: function () {
                        },
                        success:    function (response) {
                            let message = '{{ trans('payment.error-occurred-unable-to-process') }}';
                            if (!validateDataIsNull(response.message))
                                message = response.message;

                            if (response.result == 'ok') {

                                if (response.buildForm) {

                                    let $form = document.createElement('form');
                                    $form.setAttribute('id', 'doPayment');

                                    for (let item in response.data) {
                                        let input  = document.createElement('input');
                                        input.name = item;
                                        input.setAttribute('value', response.data[item]);

                                        $form.appendChild(input);

                                    }

                                    $form.action = response.target;
                                    if (response.data['_input_charset'] != undefined && response.data['_input_charset'] != '')
                                        $form.action += '?_input_charset=' + response.data['_input_charset'];
                                    $form.method = 'post';
                                    if (navigator.userAgent.indexOf("Firefox") != -1) {
                                        $(document.body).append($form);
                                        $('#doPayment').submit()
                                    } else {
                                        $form.submit();
                                    }
                                    console.log($form);

                                } else {
                                    alert(message)
                                }
                            } else {
                                alert(message)
                            }
                        },
                        complete:   function () {
                        }
                    });
                }
            });
        });
    </script>
@endsection