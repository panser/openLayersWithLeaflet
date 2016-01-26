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



    L.TopoJSON = L.GeoJSON.extend({
        addData: function(jsonData) {
            if (jsonData.type === "Topology") {
                for (var key in jsonData.objects) {
                    var geojson = topojson.feature(jsonData, jsonData.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }
            else {
                L.GeoJSON.prototype.addData.call(this, jsonData);
            }
        }
    });

    var topoLayer = new L.TopoJSON();
    //var jqxhr = $.getJSON('../../data/topojson/world-110m.json');
    var jqxhr = $.getJSON('../../data/topojson/test.topojson');
    //var jqxhr = $.getJSON('../../data/topojson/test_full.topojson');
    jqxhr.done(function(data){
        topoLayer.addData(data);
    });


    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(topoLayer);
        } else {
            map.removeLayer(topoLayer);
        }
    });

});