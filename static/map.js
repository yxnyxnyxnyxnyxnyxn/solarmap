function initMap(){
    
 
    var default_location =  {lat: 42.38, lng:-71.08};
    var map = new google.maps.Map(document.getElementById('map'),{
                                  center: default_location,
                                  zoom: 10
                                  });
    var marker = new google.maps.Marker({
                                        position: default_location,
                                        map: map,
                                        drauggable: true
                                        });
    var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));
    google.maps.event.addDomListener(document.getElementById('button'),'click',function(){
                                     
                                   
                                     var places = searchBox.getPlaces();
                                       console.log(places)
                                     var bounds = new google.maps.LatLngBounds();
                                     var i, place;
                                     for (i = 0;place=places[i];i++){
                                        bounds.extend(place.geometry.location);
                                        marker.setPosition(place.geometry.location);
                                     
                                     }
                                    
                                     map.fitBounds(bounds);
                                     map.setZoom(10);
    });
        
    /* google.maps.event.addListener(searchBox,'places_changed',function(){
        var places = searchBox.getPlaces();
        var bounds = new google.maps.LatLngBounds();
        var i, place;
        for (i = 0;place=places[i];i++){
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
            
        }
        map.fitBounds(bounds);
        map.setZoom(10);
        
    });*/
    return [searchBox,map,marker]
    
}




