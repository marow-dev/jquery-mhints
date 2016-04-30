(function ($) {
    'use strict';
    var countId = 1;
    $.fn.mhint = function (options) {
        $.extend({onmouse_display: true}, options);

        function getMessage(hint) {
            var message = '';
            if (options.message) {
                message = options.message;
            } else if ($(hint).data('hint-message')) {
                message = $(hint).data('hint-message');
            }
            return message;
        }

        function calcPosition(element, hint) {
            var styles = {};

            styles.left = parseInt($(element).offset().left, 10);
            if (!options.position || options.position === 'top') {
                styles.top = parseInt($(element).offset().top, 10) - parseInt($(hint).outerHeight(), 10);
            } else if (options.position === 'bottom') {
                styles.top = $(element).offset().top + parseInt($(element).height(), 10);
            }

            if (options.offset) {
                var offsetItems = options.offset.split(';');
                if (offsetItems.length) {
                    $.each(offsetItems, function (key, val) {
                        var pos = /([xy]+)([\+\-]{1})([0-9]+)/.exec(val);
                        var change = pos[1] === 'x' ? 'left' : 'top';
                        var offset = pos[2] === '+' ? pos[3] : -pos[3];
                        styles[change] = styles[change] + parseInt(offset, 10);
                    });
                }
            }
            styles.top = styles.top + 'px';
            styles.left = styles.left + 'px';
            return styles;
        }

        return this.each(function () {
            $(this).on('mouseleave', function () {
                var id = $(this).data('hint-id');
                if (options.onmouse_display && id) {
                    $('div#hint-' + id).remove();
                    $(this).removeData('hint-id');
                }
            });
            $(this).on('mouseenter', function () {
                if (options.onmouse_display && !$(this).data('hint-id')) {
                    $('body').append('<div id="hint-' + countId + '" class="hint" style="' + buildStyles(getStyles(this)) + '">' + getMessage(this) + '</div>');
                    $(this).data('hint-id', countId);
                    countId = countId + 1;
                }
            });
            $(this).on('show_hint', function () {
                var hint = $('<div id="hint-' + countId + '" class="hint">' + getMessage(this) + '</div>');
                if (options.width) {
                    hint.css('width', parseInt(options.width, 10));
                }
                $('body').append(hint);
                $(this).data('hint-id', countId);
                $.each(calcPosition(this, hint), function (k, v) {
                    hint.css(k, v);
                });
                (function (countId) {
                    setTimeout(function () { $('div#hint-' + countId).remove(); }, parseInt(options.close_time, 10) * 1000);
                }(countId));
                countId = countId + 1;
            });
        });
    };
}(jQuery));
