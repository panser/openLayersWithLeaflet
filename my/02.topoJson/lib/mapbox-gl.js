'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';

var map = new mapboxgl.Map({
    container: 'map',
    //style: '',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [20, 60],
    zoom: 5
});




//var jqxhr = $.getJSON('../../data/topojson/world-110m.json');
var jqxhr = $.getJSON('../../data/topojson/test.topojson');
//var jqxhr = $.getJSON('../../data/topojson/test_full.topojson');
map.on('style.load', function () {

    var source = new mapboxgl.GeoJSONSource({
        //data: geoJsonData
    });

    jqxhr.done(function(jsonData){

        //var geoJsonData = topojson.feature(jsonData, jsonData.objects.countries);
        //var geoJsonData = topojson.feature(jsonData, jsonData.objects.ADM_enheter_Norge_Kommunegrense_KURVE);
        if (jsonData.type === "Topology") {
            var geojson;
            for (var key in jsonData.objects) {
                geojson = topojson.feature(jsonData, jsonData.objects[key]);
            }
            //TODO: refactor and make for all objects in TopoJSON
            source.setData(geojson);
        }


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
});




$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.setLayoutProperty('drone', 'visibility', 'visible');
    } else {
        map.setLayoutProperty('drone', 'visibility', 'none');
    }
});
