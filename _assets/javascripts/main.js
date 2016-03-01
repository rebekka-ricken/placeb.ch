window.intercomSettings = {
    app_id: "upu5b2be"
};

var isMobile = {
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
};

var s_boxes = [
    {
        "name": "1/2 Duschkabine",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/1_duschkabine.jpg"
    },
    {
        "name": "Telefonkabine",
        "price": "ab CHF 75.-/Monat",
        "img": "/assets/boxes/3_telekabine.jpg"
    }
];

var m_boxes = [

    {
        "name": "Gäste WC",
        "price": "ab CHF 115.-/Monat",
        "img": "/assets/boxes/6_gaste_wc.jpg"
    },
    {
        "name": "Kleinbus",
        "price": "ab CHF 151.-/Monat",
        "img": "/assets/boxes/9_kleinbus.jpg"
    },
    {
        "name": "Kleiner Keller",
        "price": "ab CHF 161.-/Monat",
        "img": "/assets/boxes/12_kleiner_keller.jpg"
    }
];

var l_boxes = [
    {
        "name": "Transporter",
        "price": "ab CHF 188.-/Monat",
        "img": "/assets/boxes/15_transporter.jpg"
    },
    {
        "name": "Einzelgarage",
        "price": "ab CHF 225.-/Monat",
        "img": "/assets/boxes/18_einzelgarage.jpg"
    },
    {
        "name": "Kinderzimmer",
        "price": "ab CHF 245.-/Monat",
        "img": "/assets/boxes/22_kinderzimmer.jpg"
    }
];

var xl_boxes = [
    {
        "name": "Wohnzimmer",
        "price": "ab CHF 377.-/Monat",
        "img": "/assets/boxes/30_wohnzimmer.jpg"
    },
    {
        "name": "Elternschlafzimmer",
        "price": "ab CHF 305.-/Monat",
        "img": "/assets/boxes/26_elternschlafzimmer.jpg"
    },
    {
        "name": "Doppelbüro",
        "price": "ab CHF 280.-/Monat",
        "img": "/assets/boxes/23_doppelburo.jpg"
    }
];

var sizes = [
    {"size": "l", "boxes": l_boxes, "current_idx": 0, "current_side": 'fr'},
    {"size": "m", "boxes": m_boxes, "current_idx": 0, "current_side": 'fr'},
    {"size": "xl", "boxes": xl_boxes, "current_idx": 0, "current_side": 'fr'},
    {"size": "s", "boxes": s_boxes, "current_idx": 0, "current_side": 'fr'}
];

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
    $('.open-chat').on('click', function () {
        Intercom('showNewMessage');
        return false;
    });

    $('.download-app').on('click', function () {

        if (isMobile.iOS()) {
            window.location.href = "https://itunes.apple.com/us/app/placeb/id1073601192";
        }
        else if (isMobile.Android()) {
            window.location.href = "https://play.google.com/store/apps/details?id=com.kg.placeb";
        } else {
            $('html, body').animate({scrollTop: $('#mobile-app').offset().top - 20});
        }

        return false;
    });

    flipper.start(2000);

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
});