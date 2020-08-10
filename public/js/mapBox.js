/*eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoidG9taXdhb2JhbmxhIiwiYSI6ImNrZG94OTVuMzBwYW4zM21xcm53ZHdidW0ifQ.8Ta_QL_5li8qaEp_Fu8n6g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tomiwaobanla/ckdozfzxx060s1inwna2emn6j',
  scrollZoom: false,
  //   center: [-118.113491, 34.111745],
  //   zoom: 4,
  //   interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  //  create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //  add marker

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  //  add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p> Day ${location.day}: ${location.description} </p>`)
    .addTo(map);

  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    left: 100,
    right: 100,
    bottom: 150,
  },
});


