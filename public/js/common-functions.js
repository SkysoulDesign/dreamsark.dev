/*
 Note: used semantic-ui
 will contain common functions like menu events, tab content related events etc
 file created: 03/09/2016
 */
$(document).ready(function () {
    $('.ui.dropdown').dropdown(); // to trigger sub-menu events on click of parent item
    if ($('.tabular.menu').length > 0)// to trigger tabbed content in page;; initially added for user/projects page
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
});
function validateDataIsNull(input) {
    if (input != undefined && input != '')
        return false;
    return true;
}