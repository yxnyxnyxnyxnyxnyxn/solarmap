function Search(){
    var data= initMap()
    var map = data[1]
    var searchBox = data[0]
    var marker = data[2]
    
    google.maps.event.addListener(searchBox,'places_changed',function(){
                                  var places = searchBox.getPlaces();
                                  var bounds = new google.maps.LatLngBounds();
                                  var i, place;
                                  for (i = 0;place=places[i];i++){
                                  bounds.extend(place.geometry.location);
                                  marker.setPosition(place.geometry.location);
                                  
                                  }
                                  map.fitBounds(bounds);
                                  map.setZoom(10);
                                  console.log("fnaj")
    });

    console.log("tshua88i")
    
}




