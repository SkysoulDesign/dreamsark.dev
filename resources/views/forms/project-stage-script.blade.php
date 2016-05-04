<script>
    $(document).ready(function () {
        if ($('#project-idea-show-modal').length > 0)
            $('#project-idea-show-modal')
                    .modal({
                        blurring: true,
                    })
                    .modal('attach events', '#project-idea-show', 'show');

        if ($('#project-synapse-show-modal').length > 0)
            $('#project-synapse-show-modal')
                    .modal({
                        blurring: true,
                    })
                    .modal('attach events', '#project-synapse-show', 'show');

        if ($('#project-script-show-modal').length > 0)
            $('#project-script-show-modal')
                    .modal({
                        blurring: true,
                    })
                    .modal('attach events', '#project-script-show', 'show');
    });
</script>