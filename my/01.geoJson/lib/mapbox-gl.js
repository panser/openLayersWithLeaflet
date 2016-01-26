'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';

var map = new mapboxgl.Map({
    container: 'map',
    //style: '',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [20, 60],
    zoom: 5
});

//var url = '../../data/geojson/norway.geojson';
var url = '../../data/geojson/test.geojson';
var source = new mapboxgl.GeoJSONSource({
    "type": "geojson",
    data: url
});


map.on('style.load', function () {

    map.addSource('drone', source);
    map.addLayer({
        "id": "drone",
        "type": "line",
        "source": "drone",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 2
        }
    });
    map.setLayoutProperty('drone', 'visibility', 'none');

});


$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.setLayoutProperty('drone', 'visibility', 'visible');
    } else {
        map.setLayoutProperty('drone', 'visibility', 'none');
    }
});
