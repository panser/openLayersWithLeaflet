'use strict';

var map = new L.Map('map', {
    layers: [
        L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
            layers: 'topo2',
            format: 'image/png'
        })
    ]
});
map.setView([62.5, 4.2], 5);


//proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var crs = new L.Proj.CRS('EPSG:25833',
    '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    //{
    //    resolutions: [
    //        8192, 4096, 2048, 1024, 512, 256, 128
    //    ],
    //    origin: [0, 0]
    //}
)

//http://localhost:7070/geoserver/borders_Fylkesgrense/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE&maxFeatures=50&outputFormat=application%2Fjson
var boundaries = new L.WFS({
    url: 'http://localhost:7070/geoserver/borders_Fylkesgrense/ows',
    //typeNS: 'DescribeFeatureType',
    //typeNS: 'line',
    //typeNS: 'Borders_Fylkesgrense',
    typeNS: 'http://localhost:7070/geoserver/borders_Fylkesgrense',
    typeName: 'borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE',
    crs: crs,
    //crs: L.CRS.EPSG4326,
    style: {
        color: 'blue',
        weight: 2
    }
}).addTo(map)
    .on('load', function () {
        map.fitBounds(boundaries);
    })