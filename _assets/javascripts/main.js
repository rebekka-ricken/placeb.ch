window.intercomSettings = {
    app_id: "upu5b2be"
};

$(document).ready(function () {
    $('.open-chat').on('click', function () {
        Intercom('showNewMessage');
        return false;
    })
});

(function (window, document) {
    document.getElementById('toggle').addEventListener('click', function (e) {
        document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
        document.getElementById('toggle').classList.toggle('x');
    });
})(this, this.document);