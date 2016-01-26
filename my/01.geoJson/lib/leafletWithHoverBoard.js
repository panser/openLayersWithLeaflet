'use strict';

//
//NOT WORK YET !!!
//

$(document).ready(function () {

    var map = new L.Map('map', {
        layers: [
            L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
                layers: 'topo2',
                format: 'image/png'
            }),
            //L.tileLayer.wms('http://localhost:8080/geoserver/borders_Fylkesgrense/wms?', {
            //    layers: 'borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE',
            //    format: 'image/png'
            //}),
            //L.GeoJSON('http://localhost:8080/geoserver/borders_Fylkesgrense/ows?service=WFS'),
        ]
    });
    map.setView([62.5, 4.2], 5);

    var boundaries = new L.WFS({
        url: 'http://localhost:8080/geoserver/borders_Fylkesgrense/ows?',
        //typeNS: 'topp',
        typeName: 'borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE',
        crs: L.CRS.EPSG4326,
        style: {
            color: 'blue',
            weight: 2
        }
    }).addTo(map)
        .on('load', function () {
            map.fitBounds(boundaries);
        });

    //http://localhost:8080/geoserver/borders_Fylkesgrense/wms?service=WMS&version=1.1.0&request=GetMap&layers=borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE&styles=&bbox=-86165.9,6438756.42,805691.25,7853460.76&width=484&height=768&srs=EPSG:25833&format=image%2Fjpeg
    //http://localhost:8080/geoserver/borders_Fylkesgrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE&maxFeatures=50&outputFormat=application%2Fjson
    //L.tileLayer('http://{s}.tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg').addTo(map);
    //L.tileLayer('http://{s}.tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg').addTo(map);



});