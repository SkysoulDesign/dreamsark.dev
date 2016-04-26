<link rel="stylesheet" media="all" href="{{ asset('dist/css/select2.min.css') }}">
<script type="text/javascript" src="{{ asset('dist/js/select2.js') }}"></script>
<script>
    $("#options").select2({
        tags: true
    });
    $(document).ready(function () {
        toggleOptionBlock();
        $('#question_type').bind('change', function () {
            toggleOptionBlock();
        });
    });
    /**
     * show or hide Options Block depends on Question Type
     */
    function toggleOptionBlock() {
        var typeVal        = $('#question_type').val();
        var skipOptionsArr = ['select', 'radio', 'checkbox'];
        if (skipOptionsArr.indexOf(typeVal) !== -1) {
            $('.options_block').show();
        } else
            $('.options_block').hide();
    }
</script>