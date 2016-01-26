'use strict';

$(document).ready(function () {

    var map = new L.Map('map', {
        layers: [
            L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
                layers: 'topo2',
                format: 'image/png'
            })]
    });
    map.setView([62.5, 4.2], 5);


    var geoLayer = new L.GeoJSON();
    var jqxhr = $.getJSON('../../data/geojson/norway.geojson');
    //var jqxhr = $.getJSON('../../data/geojson/test.geojson');
    jqxhr.done(function(data){
        geoLayer.addData(data);
    });

    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(geoLayer);
        } else {
            map.removeLayer(geoLayer);
        }
    });


});