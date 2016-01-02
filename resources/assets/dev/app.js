global.jQuery = require("jquery");
global.$ = global.jQuery;

var td = require('throttle-debounce');
var moment = require('moment');
var datapicker = require('jquery-datetimepicker');

/**
 * Prototype
 */
$(document).ready(function () {

    $('#datetime').datetimepicker({
        lang: $('#datetime').attr('data-lang'),
        minDate: 0,
        minTime:0,
        step:1,
        todayButton: false,
    });

    /**
     * Countdown
     */
    $('#flipclock').FlipClock($('#flipclock').attr('data-time'), {
        countdown: true
    });

    $('.ui.dropdown:not(.no-default)').dropdown();
    $('.ui.form .ui.checkbox').checkbox();
    $('.ui.accordion').accordion();
    $('.ui.rating').rating();
    $('.ui.embed').embed();
    $('.tabular.menu .item, #menu .item').tab();
    $('.dimmable.image').dimmer({
        on:'hover'
    });

    $('#translation-language').dropdown({
        onChange:function ($value, text, $choice) {

            var pathArray = window.location.pathname.split('/');

            var group = pathArray[3];

            if (!group) {
                group = '';
            }

            window.location.href = 'http://' + window.location.host + '/translation/' + $value + '/' + group;

        }
    });

    $('#translation-group').dropdown({
        onChange:function ($value, text, $choice) {

            var pathArray = window.location.pathname.split('/');

            var language = pathArray[2];

            if (!language) {
                language = '1'
            }
            window.location.href = 'http://' + window.location.host + '/translation/' + language + '/' + $value;
        }
    });

    $('.translation-value input').keyup(td.debounce(250, function () {

        $parrent = $(this).parent();


        $name = $(this).attr('data-name');

        var $values = {};
        $values[$name] = this.value;
        $values['_token'] = $(this).attr('data-token');

        $.ajax({
                url:       $(this).attr('data-action'),
                method:    'POST',
                data:      $values,
                beforeSend:function () {
                    $parrent.addClass('loading');
                }
            })
            .done(function (data) {
                if (data.status == 1) {
                    $parrent.removeClass('loading');
                }
            });

    }));

    $('#idea-submit-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#idea-submit-form').submit();
            }
        })
        .modal('attach events', '#idea-submit-open', 'show');

    $('#project-take-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#project-take-form').submit();
            }
        })
        .modal('attach events', '#project-add-take', 'show');

    $('#project-cast-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#project-cast-form').submit();
            }
        })
        .modal('attach events', '#project-add-cast', 'show');

    $('#project-crew-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#project-crew-form').submit();
            }
        })
        .modal('attach events', '#project-add-crew', 'show');

    $('#project-expense-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#project-expense-form').submit();
            }
        })
        .modal('attach events', '#project-add-expense', 'show');

    $('#project-idea-show-modal')
        .modal({
            blurring: true,
        })
        .modal('attach events', '#project-idea-show', 'show');

    $('#project-synapse-show-modal')
        .modal({
            blurring: true,
        })
        .modal('attach events', '#project-synapse-show', 'show');

    $('#project-script-show-modal')
        .modal({
            blurring: true,
        })
        .modal('attach events', '#project-script-show', 'show');

    $('#translation-translation-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#translation-new-translation-form').submit();
            }
        })
        .modal('attach events', '#translation-new-translation', 'show')

    $('#translation-language-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#translation-new-language-form').submit();
            }
        })
        .modal('attach events', '#translation-new-language', 'show')

    $('#translation-group-modal')
        .modal({
            blurring: true,
            closable: false,
            onApprove:function () {
                $('#translation-new-group-form').submit();
            }
        })
        .modal('attach events', '#translation-new-group', 'show')

    $('#report-modal')
        .modal({
            blurring: true,
            closable: false,
            onShow:   function () {
                $('#urlAddress').val(window.location.href)
            },
            onDeny:   function () {

            },
            onApprove:function () {
                $('#reportForm').submit();
            }
        })
        .modal('attach events', '#showReport', 'show')

});




