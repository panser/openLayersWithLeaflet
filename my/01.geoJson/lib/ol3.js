'use strict';

$(document).ready(function () {

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
            zoom: 5
        })
    });


    var geoJsonSource = new ol.source.Vector({
        url: '../../data/geojson/test.geojson',
        format: new ol.format.GeoJSON()
    });
    var geoJsonTile = new ol.layer.Vector({
        title: 'borders',
        source: geoJsonSource
    });


    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(geoJsonTile);
        } else {
            map.removeLayer(geoJsonTile);
        }
    });
});