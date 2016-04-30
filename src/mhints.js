(function ($) {
    'use strict';
    var countId = 1;
    $.fn.mhint = function (options) {
        options = $.extend({onmouse_display: true}, options);

        function getMessage(hint) {
            var message = '';
            if (options.message) {
                message = options.message;
            } else {
                if (options.message_attribute) {
                    message = $(hint).attr(options.message_attribute);
                } else if ($(hint).data('hint-message')) {
                    message = $(hint).data('hint-message');
                }
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

        function hide(element) {
            var id = $(element).data('hint-id');
            $('div#hint-' + id).remove();
            $(element).removeData('hint-id');
        }

        function display(element, message) {
            message = message || getMessage(element);
            var hint = $('<div id="hint-' + countId + '" class="hint">' + message + '</div>');
            if (options.width) {
                hint.css('width', parseInt(options.width, 10));
            }
            $('body').append(hint);
            $(element).data('hint-id', countId);
            $.each(calcPosition(element, hint), function (k, v) {
                hint.css(k, v);
            });
            if (options.close_time && options.onmouse_display === false) {
                (function (countId) {
                    setTimeout(function () { hide(element) }, parseInt(options.close_time, 10) * 1000);
                }(countId));
            }
            countId = countId + 1;
        }

        return this.each(function () {
            $(this).on('mouseleave', function () {
                if (options.onmouse_display && $(this).data('hint-id')) {
                    hide(this);
                }
            });
            $(this).on('mouseenter', function () {
                if (options.onmouse_display && !$(this).data('hint-id')) {
                    display(this);
                }
            });
            $(this).on('show_hint', function (event, message) {
                var message = message || '';
                display(this, message);
            });
        });
    };
}(jQuery));
