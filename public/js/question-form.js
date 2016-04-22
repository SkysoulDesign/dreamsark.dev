/**
 * Created by Vivek on 4/13/16.
 */
$(document).ready(function () {
    toggleOptionBlock();
    $('.question_type').bind('change', function () {
        toggleOptionBlock();
    });

    var optionStr = '.options_block .option:nth-child';
    $('.options_block .add-icon').bind('click', function () {
        var optionHtml = $(optionStr + '(1)').html();
        $(optionHtml).insertBefore('.options_block .ui.small.menu').addClass('option');
        var textObj = $(optionStr + '(' + getOptionsLen() + ')').children('input[type="text"]');
        textObj.attr('name', 'options[]').val('')
    });
    $('.options_block .delete-icon').bind('click', function () {
        var optionLength = getOptionsLen();
        if (optionLength > 1)
            $(optionStr + '(' + optionLength + ')').remove();
    });
});

/**
 * show or hide Options Block depends on Question Type
 */
function toggleOptionBlock() {
    var typeVal = $('#question_type').val();
    var skipOptionsArr = ['select', 'radio', 'checkbox'];
    if (skipOptionsArr.indexOf(typeVal) !== -1) {
        $('.options_block').show();
    } else
        $('.options_block').hide();
}
/**
 *
 */
function getOptionsLen() {
    return $('.options_block .option').length;
}