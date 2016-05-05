<script>
    $(document).ready(function () {
        $('.button.view-modal').each(function () {
            $('#' + $(this).attr('data-modal'))
                    .modal({
                        blurring: true,
                    })
                    .modal('attach events', '#' + $(this).attr('id'), 'show')
            ;
            $('#' + $(this).attr('data-modal') + ' .ui.embed').embed();
        });
    });
</script>