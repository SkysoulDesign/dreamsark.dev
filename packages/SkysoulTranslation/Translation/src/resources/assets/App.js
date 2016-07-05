var td = require('throttle-debounce');

/**
 * Prototype
 */
$(document).ready(function () {

    $('.ui.dropdown:not(.no-default)').dropdown();

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

        var $parent = $(this).parent();
        var $name = $(this).attr('data-name');

        var $values = {};
        $values[$name] = this.value;
        $values['_token'] = $(this).attr('data-token');

        $.ajax({
                url:       $(this).attr('data-action'),
                method:    'POST',
                data:      $values,
                beforeSend:function () {
                    $parent.addClass('loading');
                }
            })
            .done(function (data) {
                if (data.status == 1) {
                    $parent.removeClass('loading');
                }
            });

    }));

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

});




