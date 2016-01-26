'use strict';

//
//NOT WORK !!!
//

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

        // build an initial index of tiles
        var tileIndex = geojsonvt(data);
        //// request a particular tile
        //var features = tileIndex.getTile(z, x, y).features;
        //// show an array of tile coordinates created so far
        //console.log(tileIndex.tileCoords); // [{z: 0, x: 0, y: 0}, ...]

        var tileLayer = L.tileLayer.canvas()
            //.params({ debug: false, padding: 5 })
            //.drawing(drawingOnCanvas);
        canvasTiles.drawTile = drawingOnCanvas()
            tileLayer.addTo(map);

    });



    function drawingOnCanvas(canvasOverlay, params) {

        var bounds = params.bounds;
        params.tilePoint.z = params.zoom;

        var ctx = params.canvas.getContext('2d');
        ctx.globalCompositeOperation = 'source-over';


        console.log('getting tile z' + params.tilePoint.z + '-' + params.tilePoint.x + '-' + params.tilePoint.y);

        var tile = tileIndex.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
        if (!tile) {
            console.log('tile empty');
            return;
        }

        ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);

        var features = tile.features;

        ctx.strokeStyle = 'grey';


        for (var i = 0; i < features.length; i++) {
            var feature = features[i],
                type = feature.type;

            ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba(255,0,0,0.05)';
            ctx.beginPath();

            for (var j = 0; j < feature.geometry.length; j++) {
                var geom = feature.geometry[j];

                if (type === 1) {
                    ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
                    continue;
                }

                for (var k = 0; k < geom.length; k++) {
                    var p = geom[k];
                    var extent = 4096;

                    var x = p[0] / extent * 256;
                    var y = p[1] / extent * 256;
                    if (k) ctx.lineTo(x  + pad, y   + pad);
                    else ctx.moveTo(x  + pad, y  + pad);
                }
            }

            if (type === 3 || type === 1) ctx.fill('evenodd');
            ctx.stroke();
        }

    };


    $('#jsonCheckBox').change(function () {
        if ($(this).is(":checked")) {
            map.addLayer(geoLayer);


        } else {
            map.removeLayer(geoLayer);
        }
    });


});