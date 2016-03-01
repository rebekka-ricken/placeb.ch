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
        "name": "duschkabine",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/1_duschkabine.jpg"
    },
    {
        "name": "telekabine",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/3_telekabine.jpg"
    },
    {
        "name": "gaste_wc",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/6_gaste_wc.jpg"
    }
];

var m_boxes = [
    {
        "name": "9_kleinbus",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/9_kleinbus.jpg"
    },
    {
        "name": "12_kleiner_keller",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/12_kleiner_keller.jpg"
    },
    {
        "name": "15_transporter",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/15_transporter.jpg"
    }
];

var l_boxes = [
    {
        "name": "18_einzelgarage",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/18_einzelgarage.jpg"
    },
    {
        "name": "22_kinderzimmer",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/22_kinderzimmer.jpg"
    },
    {
        "name": "23_doppelburo",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/23_doppelburo.jpg"
    }
];

var xl_boxes = [
    {
        "name": "30_wohnzimmer",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/30_wohnzimmer.jpg"
    },
    {
        "name": "26_elternschlafzimmer",
        "price": "ab CHF 39.-/Monat",
        "img": "/assets/boxes/26_elternschlafzimmer.jpg"
    }
]


var flipper = {

    start: function (size, duration, delay, boxes) {

        var current = 1;
        var site = 'bg';

        var flip = function() {
            var selector = '#' + size + '-' + site;
            var box = boxes[current];
            $(selector + "-img").attr('src', box["img"]);
            $(selector + "-name").html(box["name"]);
            $(selector + "-price").html(box["price"]);
            current += 1;
            setTimeout(function () {
                $('#' + size + '-flipper').toggleClass('hover');
            }, 1000);

            if (current >= boxes.length) {
                current = 0;
            }
            site = (site == 'fr') ? 'bg' : 'fr';
        };

        setTimeout(function () {
            flip();
            setInterval(flip, duration);
        }, delay);
    }

}

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

    flipper.start('s', 6000, 0, s_boxes);
    flipper.start('m', 6000, 2400, m_boxes);
    flipper.start('l', 6000, 3800, l_boxes);
    flipper.start('xl', 6000, 5100, xl_boxes);

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