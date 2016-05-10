/*
 Note: used semantic-ui
 will contain common functions like menu events, tab content related events etc
 file created: 03/09/2016
 */
$(document).ready(function () {
    $('.ui.dropdown').dropdown(); // to trigger sub-menu events on click of parent item
    if ($('.tabular.menu:not(.customCall)').length > 0)// to trigger tabbed content in page;; initially added for user/projects page
        $('.tabular.menu:not(.customCall) .item').tab();
    if ($('.ui.accordion').length > 0)// to trigger accordion event if element exists
        $('.ui.accordion').accordion();
    if ($('.ui.rating').length > 0)// to trigger rating event if element exists
        $('.ui.rating').rating();
    /**
     * prompt user to confirm onDelete event
     */
    $('.button.delete-item').on('click', function () {
        if (confirm("Are you sure to delete this item?")) {
            var deleteForm = $('<form />').html('<input type="hidden" name="_method" value="delete" />' +
                '<input type="hidden" name="_token" value="' + $('input[name="app_token"]').val() + '" />'
            );
            deleteForm.attr('action', $(this).attr('href'));
            deleteForm.attr('method', 'POST');
            deleteForm.appendTo('body').submit();
            return false;
        } else
            return false;
    });

    if ($('.ui.progress').length > 0)
        $('.ui.progress').progress();

    if ($('#idea-submit-modal').length > 0)
        $('#idea-submit-modal')
            .modal({
                blurring:  true,
                closable:  false,
                onApprove: function () {
                    $('#idea-submit-form').submit();
                }
            })
            .modal('attach events', '#idea-submit-open', 'show');

    if ($('#project-take-modal').length > 0)
        $('#project-take-modal')
            .modal({
                blurring:  true,
                closable:  false,
                onApprove: function () {
                    $('#project-take-form').submit();
                }
            })
            .modal('attach events', '#project-add-take', 'show');

});
function validateDataIsNull(input) {
    if (input != undefined && input != '')
        return false;
    return true;
}
function validateDataAndReturn(input) {
    if (validateDataIsNull(input) == true)
        return '';
    return input;
}