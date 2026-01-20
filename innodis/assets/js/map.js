window.initMap = function() {
    if (document.getElementById('map')) {
        var mapContainer = document.getElementById('map');
        
        var map = new google.maps.Map(mapContainer, {
            center: {lat: 37.4872877, lng: 127.1197824},
            zoom: 17,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{visibility: "off"}]
                }
            ]
        });
        
        var marker = new google.maps.Marker({
            position: {lat: 37.4872877, lng: 127.1197824},
            map: map,
            icon: {
                url: './assets/images/map_marker.png',
                scaledSize: new google.maps.Size(103, 57),
                anchor: new google.maps.Point(51, 57)
            }
        });
    }
};