'use strict';

$(document).ready(function () {

    var map = new L.Map('map', {
        layers: [
            L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
                layers: 'topo2',
                format: 'image/png'
            })]
    });
    map.setView([62.5, 8.2], 8);

    var geoLayer;
    var oneRegionLayer;

    var jqxhr = $.getJSON('../../data/geojson/kommuner.geojson');
    //var jqxhr = $.getJSON('../../data/geojson/norway.geojson');
    //var jqxhr = $.getJSON('../../data/geojson/test.geojson');

    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.navn);
        layer.on({
            click: function(e){
                if (oneRegionLayer != null) {
                    map.removeLayer(oneRegionLayer);
                }
                oneRegionLayer = L.geoJson(feature, {
                    style:  {color: 'red'}
                    ,fill: true
                });
                map.fitBounds(oneRegionLayer.getBounds());
                map.addLayer(oneRegionLayer);
            }
        });
    };

    jqxhr.done(function(data){
        geoLayer = L.geoJson(data, {
            onEachFeature: onEachFeature
        });
    });

    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(geoLayer);
        } else {
            map.removeLayer(geoLayer);
            if (oneRegionLayer != null) {
                map.removeLayer(oneRegionLayer);
            }
        }
    });


});