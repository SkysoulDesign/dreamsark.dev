<div class="notifyContainer">
    <div class="title">
        @lang('general.notification-title')
        <i class="close icon right"></i>
    </div>
    <div class="body notifications">
        <div class="message"></div>
    </div>
</div>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script>
    var socket = new io('{{ env('NODEJS_NOTIFY_URL') }}');
    socket.on('payment:DreamsArk\\Events\\Payment\\PaymentWasConfirmed', function (message) {
        var notifyMessage = '';
        if (message.transaction.paid == true)
            notifyMessage = "{{ trans('payment.payment-success') }}";
        else
            notifyMessage = "{{ trans('payment.payment-fail') }}";
        $('.notifyContainer .message').html(notifyMessage)
        $('.notifyContainer').fadeToggle(500);
    });
    $('.notifyContainer .title .close').click(function () {
        $('.notifyContainer').fadeOut('slow');
    });
</script>
<style>
    .notifyContainer {
        background-color: #f8ffff;
        border: 1px solid rgba(100, 100, 100, .4);
        box-shadow: 0 0 0 1px #a9d5de inset,0 0 0 0 transparent;
        overflow: visible;
        position: fixed;
        width: 40%;
        margin: auto 30%;
        z-index: 1002;
        display: none;
        -webkit-filter: blur(0px) grayscale(0) !important;
        filter: blur(0px) grayscale(0) !important;
    }

    .notifyContainer .title {
        font-weight: bold;
        padding: 8px;
        font-size: 13px;
        background-color: #ffffff;
        color: #276f86;
        position: relative;
        z-index: 1000;
        width: 100%;
        border-bottom: 1px solid #dddddd;
    }

    .notifyContainer .title .close {
        cursor: pointer;
        color: #ff0000;
        font-size: 1.4em;
    }

    .notifyContainer .body {
        min-height: 70px;
        width: 100%;
    }

    .notifyContainer .message {
        padding: 10px;
        text-align: center;
    }
</style>