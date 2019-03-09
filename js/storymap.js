//layers
var layers = {
  obesity_layer: {
        layer: L.geoJson.ajax("assets/states.json", {
          color:
          {
            colors = chroma.scale('YlOrBr').colors(5)

            function setColor(density) {
              var id = 0;
              if (density > 34) { id = 4; }
              else if (density > 31 && density <= 34) { id = 3; }
              else if (density > 28 && density <= 31) { id = 2; }
              else if (density > 25 && density <= 28) { id = 1; }
              else { id = 0; }
              return colors[id];
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
        }),
        legend:
        {
         var legend = L.control({position: 'bottomleft'})

         legend.onAdd = function () {
            var div = L.DomUtil.create('div', 'legend');
            div.innerHTML += '<b>Obesity Rates by State</b><br />';
            div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5;"></i><p>34.1%-38% Very High</p>';
            div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5;"></i><p>31.1%-34% High</p>';
            div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5;"></i><p>28.1%-31% Average</p>';
            div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5;"></i><p>25.1%-28% Low</p>';
            div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5;"></i><p>22%-25% Very Low</p>';
            // Return the Legend div containing the HTML content
            return div;
        }
  }),
  exercise_layer: {
        layer: L.geoJson.ajax("assets/states.json"),
        color:
        {
          colors = chroma.scale('Greens').colors(5);

          function setColor(density) {
              var id = 0;
              if (density > 30) { id = 4; }
              else if (density > 26 && density <= 30) { id = 3; }
              else if (density > 22 && density <= 26) { id = 2; }
              else if (density > 18 && density <= 22) { id = 1; }
              else { id = 0; }
              return colors[id];
          }

          //color palette created for states
          function style(feature) {
              return {
                  fillColor: setColor(feature.properties.exercise),
                  fillOpacity: 0.4,
                  weight: 2,
                  opacity: 1,
                  color: '#b4b4b4',
                  dashArray: '4'
              };
        },
        legend:
        {
          var legend = L.control({position: 'bottomleft'});

          legend.onAdd = function () {
              var div = L.DomUtil.create('div', 'legend');
              div.innerHTML += '<b>Exercise Rates by State</b><br />';
              div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5;"></i><p>30.1%-32.5% Very High</p>';
              div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5;"></i><p>26.1%-30% High</p>';
              div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5;"></i><p>22.1%-26% Average</p>';
              div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5;"></i><p>18.1%-22% Low</p>';
              div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5;"></i><p>13.5%-18% Very Low</p>';
              // Return the Legend div containing the HTML content
              return div;
          };
  },
  gym_layer: {
        layer: L.geoJson.ajax("assets/gyms.json"),
        color:
        {
          var gym_colors = chroma.scale('RdYlBu').mode('lch').colors(3);

          for (i = 0; i < 3; i++) {
              $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + gym_colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
          }

          //Load airport location points and creates clickable feature for control towers
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
        },
        legend:
        {
          var legend = L.control({position: 'bottomleft'});

          legend.onAdd = function () {
              var div = L.DomUtil.create('div', 'legend');
              div.innerHTML += '<hr><b>Location Type<b><br />';
              div.innerHTML += '<i class="fas fa-dumbbell marker-color-1"></i><p>Gym</p>';
              div.innerHTML += '<i class="fas fa-dumbbell marker-color-2"></i><p>Yoga/Pilates</p>';
              div.innerHTML += '<i class="fas fa-dumbbell marker-color-3"></i><p>Martial Arts</p>';
              // Return the Legend div containing the HTML content
              return div;
          };
  },
  layer1: {
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 11,
        minZoom: 6,
        detectRetina: true, //support Retina Display if the client uses high resolution monitor.
        attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB'
    }),
  layer2:
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        zoom: 6,
        detectRetina: true, //support Retina Display if the client uses high resolution monitor.
        attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB'
    }),
  }
}

//scenes
var scenes = {
  //scene1: {lat: 44, lng: -123.5, zoom: 7, layers: [layers.layer1], name: "scene 1"}
  scene2: {lat: 44.5701158, lng: -123.2949388, zoom: 10, layers: [layers.layer1, layers.obesity_layer], name: "scene 2"},
  scene3: {lat: 44.5701158, lng: -123.2949388, zoom: 12, layers: [layers.layer1, layers.exercise_layer], name: "scene 3"},
  scene4: {lat: 44.5701158, lng: -123.2949388, zoom: 12, layers: [layers.layer2, layers.gym_layer], name: "scene 4"}
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
