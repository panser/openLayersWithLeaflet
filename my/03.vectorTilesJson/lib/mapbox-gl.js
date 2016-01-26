'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';

//var simple = {
//    "version": 8,
//    "sources": {
//        "osm": {
//            "type": "raster",
//            "tiles": ["http://opencache.statkart.no/gatekeeper/gk/gk.open?"]
//        }
//    },
//    "layers": [
//        {
//            "id": "background",
//            "type": "background",
//            "paint": {
//                "background-color": "#41afa5"
//            }
//        }
//    ]
//};

var map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/panser/cijs7ihlp007tcakwtkq1ryjo',
    style: 'mapbox://styles/mapbox/light-v8',
    //style: simple,
    zoom: 5,
    center: [20, 60]
});

map.on('style.load', function () {
    map.addSource('bigLayer', {
        type: 'vector',
        //url: 'mapbox://panser.cwzqt7d9'
        //url: 'mapbox://panser.0j57t0mg'
        url: 'mapbox://panser.cvu9mmxu'
    });
    map.addLayer({
        "id": "bigLayer",
        "type": "line",
        "source": "bigLayer",
        //"source-layer": "adm_enheter_norge_kommunegrense_kurve",
        "source-layer": "original",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    });

    map.setLayoutProperty('bigLayer', 'visibility', 'none');

});

$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.setLayoutProperty('bigLayer', 'visibility', 'visible');
    } else {
        map.setLayoutProperty('bigLayer', 'visibility', 'none');
    }
});


