'use strict';

//выводит все векторные данные, не обращая внимания на размер карты
// -> из-за этого при большом количестве данные leaflet падает

var map = new L.Map('map', {
    layers: [
        L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
            layers: 'topo2',
            format: 'image/png'
        })
    ]
});
map.setView([62.5, 4.2], 5);


////http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&maxFeatures=50
////http://localhost:8080/geoserver/borders_Kommunegrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE&maxFeatures=50
//// &outputFormat=application%2Fjson
//var boundaries = new L.WFS({
//    url: 'http://localhost:8080/geoserver/borders_Kommunegrense/ows',
//    typeNS: 'borders_Kommunegrense',
//    typeName: 'ADM_enheter_Norge_Kommunegrense_KURVE',
//    geometryField: 'the_geom',
//    //crs: L.CRS.EPSG4326,
//    style: {
//        color: 'blue',
//        weight: 2
//    }
//}).addTo(map)
//    .on('load', function () {
//        map.fitBounds(boundaries);
//    })


var boundaries = new L.WFS({
    url: 'http://demo.opengeo.org/geoserver/ows',
    typeNS: 'topp',
    typeName: 'tasmania_state_boundaries',
    crs: L.CRS.EPSG4326,
    geometryField: 'the_geom',
    style: {
        color: 'blue',
        weight: 2
    }
}).addTo(map)
    .once('load', function () {
        map.fitBounds(boundaries);
    });
var cities = new L.WFS({
    url: 'http://demo.opengeo.org/geoserver/ows',
    typeNS: 'topp',
    typeName: 'tasmania_cities',
    crs: L.CRS.EPSG4326,
    geometryField: 'the_geom'
}).addTo(map);

