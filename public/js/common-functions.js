/*
 Note: used semantic-ui
 will contain common functions like menu events, tab content related events etc
 file created: 03/09/2016
 */
$(document).ready(function () {
    $('.ui.dropdown').dropdown(); // to trigger sub-menu events on click of parent item
    if ($('.tabular.menu:not(.customCall)').length > 0)// to trigger tabbed content in page;; initially added for user/projects page
        $('.tabular.menu .item').tab();
    /**
     * prompt user to confirm onDelete event
     */
    $('.button.delete-item').on('click', function () {
        if (confirm("Are you sure to delete this item?")) {
            var deleteForm = $('<form />').html('<input type="hidden" name="_method" value="delete" />');
            deleteForm.attr('action', $(this).attr('href'));
            deleteForm.attr('method', 'POST');
            deleteForm.append('body').submit();
            return false;
        } else
            return false;
    });

    if ($('#idea-submit-modal').length > 0)
        $('#idea-submit-modal')
            .modal({
                blurring: true,
                closable: false,
                onApprove: function () {
                    $('#idea-submit-form').submit();
                }
            })
            .modal('attach events', '#idea-submit-open', 'show');

    if ($('#project-take-modal').length > 0)
        $('#project-take-modal')
            .modal({
                blurring: true,
                closable: false,
                onApprove: function () {
                    $('#project-take-form').submit();
                }
            })
            .modal('attach events', '#project-add-take', 'show');

    if ($('#project-cast-modal').length > 0)
        $('#project-cast-modal')
            .modal({
                blurring: true,
                closable: false,
                onApprove: function () {
                    $('#project-cast-form').submit();
                }
            })
            .modal('attach events', '#project-add-cast', 'show');

    if ($('#project-crew-modal').length > 0)
        $('#project-crew-modal')
            .modal({
                blurring: true,
                closable: false,
                onApprove: function () {
                    $('#project-crew-form').submit();
                }
            })
            .modal('attach events', '#project-add-crew', 'show');

    if ($('#project-expense-modal').length > 0)
        $('#project-expense-modal')
            .modal({
                blurring: true,
                closable: false,
                onApprove: function () {
                    $('#project-expense-form').submit();
                }
            })
            .modal('attach events', '#project-add-expense', 'show');

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
function validateDataIsNull(input) {
    if (input != undefined && input != '')
        return false;
    return true;
}