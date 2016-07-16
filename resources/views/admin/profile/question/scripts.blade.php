<link rel="stylesheet" media="all" href="{{ asset('css/select2.min.css') }}">
<script type="text/javascript" src="{{ asset('js/select2.js') }}"></script>
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
     * @todo fix sending values of options
     */
    function toggleOptionBlock() {

        let selectedValue = document.querySelector("#question_type").selectedOptions[0].text.toLowerCase(),
            options       = ['select', 'radio', 'checkbox'];

        if (options.indexOf(selectedValue) !== -1) {
            $('.options_block').show();
        } else
            $('.options_block').hide();
    }
</script>
