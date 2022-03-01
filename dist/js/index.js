//------------------------map------------------------------------------
var map;
var markers=[];
var poly;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:35.2221345082414, lng:24.533931268730868},
          zoom: 16
        });
        poly = new google.maps.Polyline({
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });
        poly.setMap(map);
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
            if(document.getElementsByClassName('active')[0].innerText!='Διαδρομή'){
              data=mapsMouseEvent.latLng;
              // alert(mapsMouseEvent.latLng)
              deleteMarkers();
              const marker=new google.maps.Marker({
                  position: data.toJSON(),
                  map,
                  animation: google.maps.Animation.DROP,
                  title: "Hello World!",
                })
              marker.addListener("click", deleteMarkers);
              markers.push(marker);
              document.getElementById("company_lat").value = data.toJSON().lat;
              document.getElementById("company_lng").value = data.toJSON().lng;
            }
            else{
              
              addLatLng(mapsMouseEvent)
              
            }
            
            });
        
      }
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  
  // Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
    setMapOnAll(null);
  }
  
  // Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
  }
  
  // Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    document.getElementById("company_lat").value = '';
    document.getElementById("company_lng").value = '';
    hideMarkers();
    markers = [];
  }
  
function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  function addLatLng(event) {
    const path = poly.getPath();
  
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
    // Add a new marker at the new plotted point on the polyline.
    const marker=new google.maps.Marker({
      position: event.latLng,
      map,
      animation: google.maps.Animation.DROP,
      title: "#" + path.getLength(),
    })
  var info=event.latLng;
  markers.push(marker);
  var path_tile=document.createElement('li');
  path_tile.classList.add('path_tile')
  path_tile.classList.add('card')
  path_tile.innerHTML='<div class="card-body"><div class="row">Σημείο '+markers.length+'</div><div class="row">'+JSON.stringify(event.latLng.toJSON().lat)+' , '+JSON.stringify(event.latLng.toJSON().lng)+'</div></div>'
  document.getElementById('path-locs').appendChild(path_tile);
  var hidden_input=document.createElement('input');
  hidden_input.type="hidden";
  hidden_input.id="hidden-input-"+markers.length;
  hidden_input.name="hidden_input_group_"+markers.length;
  hidden_input.value=JSON.stringify(event.latLng.toJSON());
  document.getElementById('routes_form').appendChild(hidden_input);
  }
function clearMap_button(){
    document.getElementById('path-locs').innerHTML="";
    poly.setMap(null)
    poly.setPath([]);
    poly.setMap(map);
    deleteMarkers();
  }
initMap()
//------------------------map------------------------------------------
