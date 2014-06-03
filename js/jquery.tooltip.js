(function ($) {
    $.tooltip = function (selector) {
        var $tooltip = $('<div id="tooltip">').appendTo('body');

        $('body')
            .on('mousemove', selector, function (e) {
                var offset = $(this).offset();
                $tooltip
                    .css({
                        top: e.pageY + 20,
                        left: e.pageX
                    })
            })
            .on('mouseover', selector, function () {
                var $this = $(this),
                    title = $this.attr('title');
                if (title) {
                    $this.data('title', title);
                    $this.attr('title', '');
                }
                $tooltip
                    .html($(this).data('title'))
                    .show();
            })
            .on('mouseout', selector, function () {
                $tooltip.hide();
            });
    }
})(jQuery);