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


    var topoJsonSource = new ol.source.Vector({
        url: '../../data/topojson/test.topojson',
        //url: '../../data/topojson/test_full.topojson',
        //url: '../../data/topojson/world-110m.json',
        format: new ol.format.TopoJSON()
    });
    var topoJsonTile = new ol.layer.Vector({
        title: 'borders',
        source: topoJsonSource
    });

    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(topoJsonTile);
        } else {
            map.removeLayer(topoJsonTile);
        }
    });

});