'use strict';

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open?',
                params: {
                    LAYERS: 'topo2',
                    VERSION: '1.1.1'
                }
            })
        })
    ],
    view: new ol.View({
        center: [1891337, 9772319],
        zoom: 7
        //center: [-8908887.277395891, 5381918.072437216],
        //maxZoom: 19,
        //zoom: 12
    })
});


//http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&maxFeatures=50
//http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&maxFeatures=50
// &outputFormat=application%2Fjson
var vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        //return 'http://demo.boundlessgeo.com/geoserver/wfs?service=WFS&' +
        //    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        //    'outputFormat=application/json&srsname=EPSG:3857&' +
        //    'bbox=' + extent.join(',') + ',EPSG:3857';
        return 'http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&' +
            'version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&' +
            'outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
        //return 'http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&' +
        //    'version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&' +
        //    'outputFormat=application/json&srsname=EPSG:3857&' +
        //    'bbox=' + extent.join(',') + ',EPSG:3857';
    },
    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
        maxZoom: 19
    }))
});
var vector = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
        })
    })
});
map.addLayer(vector);