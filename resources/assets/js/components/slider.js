module.exports = (function ($) {

    var slider = {

        s: null,
        items: null,
        index: 0,
        autoSlide: true,

        init: function () {

            this.s     = $('section.slider');
            this.items = this.s.children();

            $('.next').click(this.next.bind(this));
            $('.prev').click(this.prev.bind(this));

            if (this.autoSlide)
                this.auto();

        },

        auto: function () {
            setInterval(this.next.bind(this), 10000);
        },

        next: function () {
            this.circle(this.index++);
        },

        prev: function () {
            this.circle(this.index--);
        },

        circle: function (index) {

            if (this.index > this.items.length - 1) {
                this.index = 0;
            }

            var item = this.items.eq(this.index);
            this.items.hide();
            item.css('display', 'block');

        }
    };

    slider.init();

})(jQuery);