
//option: clear polygon
var markers = [], coordinates= [];
var polygon;
var latc,lonc;
function initMap(){
    
 
    var default_location =  {lat: 42.38, lng:-71.08};
    var map = new google.maps.Map(document.getElementById('map'),{
                                  center: default_location,
                                  zoom: 10
                                  });
    var marker = new google.maps.Marker({
                                position: default_location,
                                map: map,
                                drauggable: true,
                                visible: false
                               
    });
    var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));
    google.maps.event.addDomListener(document.getElementById('button'),'click',function(){
                                     var places = searchBox.getPlaces();
                                     var bounds = new google.maps.LatLngBounds();
                                     var i, place;
                                     for (i = 0;place=places[i];i++){
                                        bounds.extend(place.geometry.location);
                                        marker.setPosition(place.geometry.location);
                                     
                                     }
                                    
                                     map.fitBounds(bounds);
                                     map.setZoom(10);
    });
    
    var bounds_tmp = new google.maps.LatLngBounds();
    
    google.maps.event.addDomListener(document.getElementById('addcoor'),'click',function(){
                                     latc =document.getElementById('lat').value;
                                     lonc =document.getElementById('lng').value;
                                     console.log(typeof(latc));
                                     var lat = parseFloat(latc);
                                     var lng = parseFloat(lonc);
                                     latc = lat;
                                     lonc = lng;
                                     var marker = new google.maps.Marker({
                                        position: {lat:lat,lng:lng},
                                        map: map,
                                        drauggable: true,
                                                                
                                     });
                                     markers.push(marker.getPosition());
                                     coordinates.push([lat,lng]);
                                     bounds_tmp.extend(marker.getPosition());
                                     map.fitBounds(bounds_tmp);


    });
                                     
                                     
    google.maps.event.addDomListener(document.getElementById('polygon'),'click',function(){
                                        polygon= new google.maps.Polygon({
                                        paths: markers,
                                        strokeColor: '#FF0000',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: '#FF0000',
                                        fillOpacity: 0.35
                                     });
                                     polygon.setMap(map);
                                      
                                     

    });
    google.maps.event.addDomListener(document.getElementById('power'),'click',function(){
                                     const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
                                     const  date = new Date();
                                     const months = [];
                                     months[0] = ["January", 31];months[1] = ["February", 28];
                                     months[2] = ["March", 31];months[3] = ["April", 30];
                                     months[4] = ["May", 31];months[5] = ["June",30];
                                     months[6] = ["July", 31];months[7] = ["August", 31];
                                     months[8] = ["September", 30];months[9] = ["October", 31];
                                     months[10] = ["November", 30];months[11] = ["December", 31];
                                     
                                     const month = date.getMonth();
                                     const cur_month =  months[month][0];
                                     const month_len = months[month][1];
                                    
                                     console.log(markers[0].lat);
                                     var url ="https://developer.nrel.gov/api/pvwatts/v6.json?api_key=o3bfKfFAnSM8PRsTfUpYtHS1NKAoBxlqwrbBZ7Mk&format=JSON&lat="+ latc+"&lon=" +lonc+"&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10"
                                     fetch(url)
                                     .then ((resp)=>resp.json())
                                     .then(function(data){
                                           const monthlyenergy = Math.round(data.outputs.solrad_monthly[month]*area*month_len);
                                           const annual = Math.round(data.outputs.solrad_annual*area*365);
                                           
                                           var info = document.getElementById('info');
                                          
                                           info.innerHTML = `<br> Monthly nominal power during ${cur_month}: <b style='color:red'>${monthlyenergy} </b> kWh <br> <br> Annual nomial power: <b style='color:red'>${annual} </b> kWh <br> <br>` ;
                                        
                                           
                                           })
                                     
                                     
                                     
                                     
    });
    
    google.maps.event.addDomListener(document.getElementById('drawthreed'),'click',function(){
                                     const height = parseFloat(document.getElementById('height').value);
                                     var pairs = [],
                                     polygons = [];
                                     
                                     
                                     // build line pairs for each wall
                                     for (var i=0; i<coordinates.length; i++) {
                                     
                                     var point = coordinates[i],
                                     otherIndex = (i == coordinates.length-1) ? 0 : i+1,
                                     otherPoint = coordinates[otherIndex];
                                     
                                     pairs.push([point, otherPoint]);
                                     }
                                     
                                     // draw excrusions
                                     for (var i=0; i<pairs.length; i++) {
                                     
                                     var first = pairs[i][0],
                                     second = pairs[i][1],
                                     wallCoordinates =  [
                                                         new google.maps.LatLng(first[0],first[1]),
                                                         new google.maps.LatLng(first[0]+height,first[1]),
                                                         new google.maps.LatLng(second[0]+height,second[1]),
                                                         new google.maps.LatLng(second[0],second[1])
                                                         ],
                                     polygon = new google.maps.Polygon({
                                                                       paths: wallCoordinates,
                                                                       strokeColor: 'black',
                                                                       strokeOpacity: 0.8,
                                                                       strokeWeight: 2,
                                                                       fillColor: 'black',
                                                                       fillOpacity: 0.35,
                                                                       zIndex: i
                                                                       });
                                     
                                     polygon.setMap(map);
                                     
                                     polygons.push(polygon);
                                     }
                                     
                                     roof = []
                                     for (var i = 0; i < coordinates.length;i++){
                                        roof.push(new google.maps.LatLng(coordinates[i][0]+height,coordinates[i][1]));
                                     }
                                     
                                     polygon = new google.maps.Polygon({
                                                                       paths: roof,
                                                                       strokeColor: 'blue',
                                                                       strokeOpacity: 0.8,
                                                                       strokeWeight: 2,
                                                                       fillColor: 'blue',
                                                                       fillOpacity: 0.35,
                                                                       zIndex: i
                                                                       });
                                     
                                     polygon.setMap(map);

                                     
                                     

    });
    
}



