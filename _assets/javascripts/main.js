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

    $('.testimonials').slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [{
        }, {
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