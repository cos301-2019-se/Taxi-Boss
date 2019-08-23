
//This function places a map on the website once the "Choose from map" button is pressed.
function loadMap()
{

  var mymap = document.getElementById("map");
  mymap.style.display = "block";

  console.log("loading...");
  var mapData;

  drawMap();
  getLatLong()

  
}



var map;
function drawMap() 
{
  var coordinates = new google.maps.LatLng(-25.755647999999997,28.241100799999998);

  var settings = {
    zoom: 6,
    center: coordinates,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  }

  console.log("drawing...");

  map = new google.maps.Map(document.getElementById("map"), settings);




}



function getLatLong()
{
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      mapData = JSON.parse(this.responseText);

      sortData();
      
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allDetailedViolations", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();




}

function sortData()
{
  for(var i =0; i< mapData.length; i++)
  {
    var longitude = mapData[i].longitude;
    var latitude = mapData[i].latitude;
    console.log(longitude, latitude);

    drawMarker(latitude, longitude);
    
  }
}


function drawMarker(latitude, longitude)
{
  var coordinates = new google.maps.LatLng(latitude,longitude);

   var marker = new google.maps.Marker({
   position: coordinates, 
   draggable: false,
   map: map,
   title: "lat:" + latitude + ", long:" + longitude

  });

}
