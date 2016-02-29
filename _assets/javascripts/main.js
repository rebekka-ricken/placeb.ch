window.intercomSettings = {
    app_id: "upu5b2be"
};

$(document).ready(function () {
    $('.open-chat').on('click', function () {
        Intercom('showNewMessage');
        return false;
    });

    var hash = window.location.hash;

    if (hash) {
        $('html, body').animate({scrollTop: $(hash).offset().top - 20});
    }

});