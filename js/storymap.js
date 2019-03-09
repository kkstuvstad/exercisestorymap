var ob_colors = chroma.scale('YlOrBr').colors(5)

function setColor(density1) {
  var id1 = 0;
  if (density1 > 34) { id1 = 4; }
  else if (density1 > 31 && density1 <= 34) { id1 = 3; }
  else if (density1 > 28 && density1 <= 31) { id1 = 2; }
  else if (density1 > 25 && density1 <= 28) { id1 = 1; }
  else { id1 = 0; }
  return colors[id1];
}

//color palette created for states
function style(feature) {
  return {
      fillColor: setColor(feature.properties.obesity),
      fillOpacity: 0.4,
      weight: 2,
      opacity: 1,
      color: '#b4b4b4',
      dashArray: '4'
  }
}

var legend1 = L.control({position: 'bottomleft'})

legend1.onAdd = function () {
   var div1 = L.DomUtil.create('div', 'legend');
   div1.innerHTML += '<b>Obesity Rates by State</b><br />';
   div1.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5;"></i><p>34.1%-38% Very High</p>';
   div1.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5;"></i><p>31.1%-34% High</p>';
   div1.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5;"></i><p>28.1%-31% Average</p>';
   div1.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5;"></i><p>25.1%-28% Low</p>';
   div1.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5;"></i><p>22%-25% Very Low</p>';
   // Return the Legend div containing the HTML content
   return div1;
};

var ex_colors = chroma.scale('YlOrBr').colors(5);

function setColor(density2) {
  var id2 = 0;
  if (density2 > 34) { id2 = 4; }
  else if (density2 > 31 && density2 <= 34) { id2 = 3; }
  else if (density2 > 28 && density2 <= 31) { id2 = 2; }
  else if (density2 > 25 && density2 <= 28) { id2 = 1; }
  else { id2 = 0; }
  return colors[id2];
}

//color palette created for states
function style(feature) {
  return {
      fillColor: setColor(feature.properties.obesity),
      fillOpacity: 0.4,
      weight: 2,
      opacity: 1,
      color: '#b4b4b4',
      dashArray: '4'
  }
}

var legend2 = L.control({position: 'bottomleft'});

legend2.onAdd = function () {
    var div2 = L.DomUtil.create('div', 'legend');
    div2.innerHTML += '<b>Exercise Rates by State</b><br />';
    div2.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5;"></i><p>30.1%-32.5% Very High</p>';
    div2.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5;"></i><p>26.1%-30% High</p>';
    div2.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5;"></i><p>22.1%-26% Average</p>';
    div2.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5;"></i><p>18.1%-22% Low</p>';
    div2.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5;"></i><p>13.5%-18% Very Low</p>';
    // Return the Legend div containing the HTML content
    return div2;
};

var gym_colors = chroma.scale('RdYlBu').mode('lch').colors(3);

for (i = 0; i < 3; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + gym_colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
//Load airport location points and creates clickable feature for control towers
/*
var locations = null;

locations = L.geoJson.ajax("assets/gyms.json",{
  attribution: 'Locations gathered from Google Maps | Base Map &copy; CartoDB | Map created by Kristoffer Stuvstad',
  //click for popup feature
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.PLACE_TYPE);
  },
  pointToLayer: function (feature, latlng) {
    var id = 0;
    if (feature.properties.PLACE_TYPE == "GYM") {id = 0;}
    else if (feature.properties.PLACE_TYPE == "YOGA/PILATES") {id = 1;}
    else {id = 2;} //PLACE_TYPE == MARTIAL ARTS
    return L.marker(latlng, {icon: L.divIcon({className: 'fas fa-dumbbell marker-color-' + (id + 1).toString() })});
  }
});
*/
var legend3 = L.control({position: 'bottomleft'})

legend3.onAdd = function () {
   var div3 = L.DomUtil.create('div', 'legend');
   div3.innerHTML += '<b>Location Type</b><br />';
   div3.innerHTML += '<i class="fas fa-dumbbell marker-color-1"></i><p>Gym</p>';
   div3.innerHTML += '<i class="fas fa-dumbbell marker-color-2"></i><p>Yoga/Pilates</p>';
   div3.innerHTML += '<i class="fas fa-dumbbell marker-color-3"></i><p>Martial Arts</p>';
   // Return the Legend div containing the HTML content
   return div3;
}

//layers
var layers = {
  obesity_layer: {
        layer: L.geoJson.ajax("assets/states.json", {
          color: 'yellow',
        }),
        legend: legend1,
      },
  exercise_layer: {
        layer: L.geoJson.ajax("assets/states.json", {
          color: 'purple',
        }),
        legend: legend2,
      },
  gym_layer: {
        layer: L.geoJson.ajax("assets/gyms.json", {
          color: 'red',
        }),
        legend: legend3,
  },
  layer1: {
    layer: L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	     attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	     apikey: '<your apikey>',
	     maxZoom: 22
    }),
  },
  layer2: {
    layer: L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	     attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	     apikey: '<your apikey>',
	     maxZoom: 6
    }),
  }
};

//scenes
var scenes = {
  //scene1: {lat: 44, lng: -123.5, zoom: 7, layers: [layers.layer1], name: "scene 1"}
  scene1: {lat: 44.5701158, lng: -123.2949388, zoom: 10, layers: [layers.layer1, layers.obesity_layer], name: "scene1"},
  scene2: {lat: 44.5701158, lng: -123.2949388, zoom: 12, layers: [layers.layer1, layers.exercise_layer], name: "scene2"},
  scene3: {lat: 44.5701158, lng: -123.2949388, zoom: 12, layers: [layers.layer2, layers.gym_layer], name: "scene3"}
  //scene5: {lat: 44.5701158, lng: -123.2949388, zoom: 12, layers: [layers.layer2], name: "scene 5"}
};

//storymap object
$('#storymap').storymap({
    //triggerpos: `a string of percentage`, // A percentage string'33.333%',
    scenes: scenes,
    baselayer: layers.layer1,
    legend: true,
    loader: true,
    flyto: false,
    credits: 'Map built by Kristoffer Stuvstad',
    scalebar: true,
    scrolldown: true,
    progressline: true,
    navwidget: true,
    createMap: function () {
      var map = L.map($(".storymap-map")[0], {zoomControl: false}).setView([44, -120], 7);
      basemap = this.baselayer.layer.addTo(map);
      return map;
    }
});
