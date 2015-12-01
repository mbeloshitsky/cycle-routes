var accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'; // TODO: Obtain our token, not Leaflet's

var pos  = JSON   
        .parse(localStorage.getItem('map-position') || 'null')
  , defPos = {zoom: 16, center:L.latLng(55.75222, 37.61556)}; 

if (!pos || !pos.center)
    pos = defPos;

var map = L.map('the-map').setView([pos.center.lat, pos.center.lng], pos.zoom);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+accessToken, {
        maxZoom: 18,
        attribution: 'Картографические данные &copy; <a href="http://openstreetmap.org">OSM</a> и его сообщество, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
}).addTo(map);

// Cycle layer
map.addLayer(new L.TileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {maxZoom: 18}));

// Init selection and lines logic
var selection = [];
var polyline = L.polyline([], {color: 'red'}).addTo(map);

function drawTestLine  (ev) {
    polyline.addLatLng(ev.latlng)
};

function savePosition () {
    localStorage.setItem('map-position', 
        JSON.stringify({zoom: map.getZoom(), center: map.getCenter()}));
}

map.on('click', drawTestLine);

map.on('zoomlevelschange', tormozilka(savePosition, 300));
map.on('moveend',          tormozilka(savePosition, 300));