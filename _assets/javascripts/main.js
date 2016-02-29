window.intercomSettings = {
    app_id: "upu5b2be"
};

$(document).ready(function () {
    $('.open-chat').on('click', function () {
        Intercom('showNewMessage');
        return false;
    })
});