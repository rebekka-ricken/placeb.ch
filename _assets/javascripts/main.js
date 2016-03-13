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
    };

    var reporting = {

        reportFBLead: function (eventCategory, eventAction, eventLabel, eventValue) {

            var params = {
                'value': eventValue,
                'currency': 'CHF',
                'content_name': eventLabel,
                'content_category': eventCategory
            };

            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', params);
            } else {
                console.info('fbq', 'Lead', params)
            }
        },

        reportGA: function (eventCategory, eventAction, eventLabel, eventValue) {

            var params = {
                'event': 'GAEvent',
                'eventCategory': eventCategory,
                'eventAction': eventAction,
                'eventLabel': eventLabel,
                'eventValue': eventValue
            };

            if (typeof dataLayer !== 'undefined') {
                dataLayer.push(params);
            } else {
                console.info(params)
            }
        },

        reportLiveChatShow: function (location) {
            this.reportGA('LiveChat', 'click', location, 1);
            this.reportFBLead('LiveChat', location, 1);
        },

        reportAndroid: function (location) {
            this.reportGA('storeAndroid', 'click', location, 1);
            this.reportFBLead('storeAndroid', location, 1);
        },

        reportIos: function (location) {
            this.reportGA('storeApple', 'click', location, 1);
            this.reportFBLead('storeApple', location, 1);
        },

        reportPhone: function (location) {
            this.reportGA('phone', 'click', location, 1);
            this.reportFBLead('phone', location, 1);
        },

        reportMail: function (location) {
            this.reportGA('mail', 'click', location, 1);
        },

        reportFacebook: function (location) {
            this.reportGA('facebook', 'click', location, 0);
        },

        reportClick: function (id, location) {
            this.reportGA(id, 'click', location, 0);
        }

    };

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
                reporting.reportIos('how-it-works');
                openInNewTab("https://itunes.apple.com/us/app/placeb/id1073601192");
            }
            else if (isMobile.Android()) {
                reporting.reportAndroid('how-it-works');
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

        $(document).on("click", '#intercom-launcher', function () {
            reporting.reportLiveChatShow('bubble', 1);
        });

        $('.open-chat').on('click', function (event) {
            reporting.reportLiveChatShow($(this).data('location'));
            Intercom('showNewMessage');
            event.preventDefault();
        });

        $('.open-android').on('click', function () {
            reporting.reportAndroid($(this).data('location'));
        });

        $('.open-ios').on('click', function () {
            reporting.reportIos($(this).data('location'));
        });

        $('.call-phone').on('click', function () {
            reporting.reportPhone($(this).data('location'));
        });

        $('.open-mail').on('click', function () {
            reporting.reportMail($(this).data('location'));
        });

        $('.open-facebook').on('click', function () {
            reporting.reportFacebook($(this).data('location'));
        });

        $('.track-click').on('click', function () {
            var element = $(this);
            reporting.reportClick(element.data('id'), element.data('location'));
        });


    });

})();