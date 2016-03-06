window.intercomSettings = {
    app_id: "upu5b2be"
};

(function () {

    var showBoxes = (typeof l_boxes !== 'undefined');

    var isMobile = {
        Android: function () {
            return /Android/i.test(navigator.userAgent);
        },
        iOS: function () {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
    };

    var openInNewTab = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
    }


    if (showBoxes) {
        var sizes = [
            {"size": "l", "boxes": l_boxes, "current_idx": 0, "current_side": 'fr'},
            {"size": "m", "boxes": m_boxes, "current_idx": 0, "current_side": 'fr'},
            {"size": "xl", "boxes": xl_boxes, "current_idx": 0, "current_side": 'fr'},
            {"size": "s", "boxes": s_boxes, "current_idx": 0, "current_side": 'fr'}
        ];
    }

    var flipper = {

        flip: function (size, boxes, side, current) {
            var selector = '#' + size + '-' + side;
            var box = boxes[current];
            $(selector + "-img").attr('src', box["img"]);
            $(selector + "-name").html(box["name"]);
            $(selector + "-price").html(box["price"]);
            setTimeout(function () {
                $('#' + size + '-flipper').toggleClass('rotate');
            }, 1000);
        },

        start: function (duration) {

            var current_size = 0, size, current_side, current_idx, current_boxes, self = this;

            setInterval(
                function () {

                    size = sizes[current_size];
                    current_idx = size['current_idx'] + 1;
                    current_boxes = size['boxes'];
                    current_side = (size['current_side'] == 'fr') ? 'bg' : 'fr';

                    if (current_idx >= current_boxes.length) {
                        current_idx = 0;
                    }

                    self.flip(size['size'], current_boxes, current_side, current_idx)

                    sizes[current_size]['current_side'] = current_side;
                    sizes[current_size]['current_idx'] = current_idx;

                    current_size += 1;
                    if (current_size >= sizes.length) {
                        current_size = 0;
                    }

                },
                duration);
        }
    };

    $(document).ready(function () {

        $('.download-app').on('click', function (event) {
            if (isMobile.iOS()) {
                //reporting.reportIos('how-it-works');
                openInNewTab("https://itunes.apple.com/us/app/placeb/id1073601192");
            }
            else if (isMobile.Android()) {
                //reporting.reportAndroid('how-it-works');
                openInNewTab("https://play.google.com/store/apps/details?id=com.kg.placeb");
            } else {
                $('html, body').animate({scrollTop: $('#mobile-app').offset().top - 20});
            }
            event.preventDefault();
        });

        if (showBoxes) {
            flipper.start(2000);
        }

        $('.testimonials').slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            responsive: [{}, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            }, {
                breakpoint: 450,
                settings: "unslick" // destroys slick
            }]
        });

        var hash = window.location.hash;

        if (hash) {
            $('html, body').animate({scrollTop: $(hash).offset().top - 20});
        }

        //$(document).on("click", '#intercom-launcher', function () {
        //    reporting.reportLiveChatShow('bubble', 1);
        //});

        $('.open-chat').on('click', function (event) {
            Intercom('showNewMessage');
            event.preventDefault();
        });

    });

})();