function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 47.3950464, lng: 8.5178379},
        zoom: 13,
        scrollwheel: false,
        draggable: !("ontouchend" in document),
        disableDoubleClickZoom: true,
    });

    var marker1 = new google.maps.Marker({
        position: {lat: 47.3849885, lng: 8.5025329},
        map: map,
        title: 'Baslerstrasse 30',
        icon: locationPin
    });

    marker1.addListener('click', function () {
        $('html, body').animate({scrollTop: $('#baslerstr').offset().top - 100});
    });

    var marker2 = new google.maps.Marker({
        position: {lat: 47.3814464, lng: 8.5178379},
        map: map,
        title: 'Hohlstrasse 192',
        icon: locationPin
    });

    marker2.addListener('click', function () {
        $('html, body').animate({scrollTop: $('#hohlstr').offset().top - 100});
    });


    var marker3 = new google.maps.Marker({
        position: {lat: 47.3927275, lng: 8.5087459},
        map: map,
        title: 'Hardturmstrasse 175',
        icon: locationPin
    });

    marker3.addListener('click', function () {
        $('html, body').animate({scrollTop: $('#hardturmstr').offset().top - 100});
    });

}