import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/appW.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mock_get_rating_screen/login.dart';
//import 'package:permission/permission.dart';

final barColor = Colors.yellow;//const Color.fromRGBO(255, 157, 7, 0);
final bgColor = const Color(0xFFDAE0E2);

class Location extends StatefulWidget{
  String id;
  Location(String driver){
    id = driver;
  }
  createState() {
    return PickupLocation(id);
  }
}

class PickupLocation extends State<Location> {
  String id;
  GoogleMapController mapController;
  // Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  PickupLocation(String driver){
    id = driver;
    
  }
  Widget build(BuildContext context){
    
    return MaterialApp(
      home: Builder(
        builder: (context)=>
      Scaffold(
        drawer: Drawer(
            child: ListView(
              children: <Widget>[
                DrawerHeader(
                  child: Center(child: Image.network('https://cdn.dribbble.com/users/514552/screenshots/4255081/taxidup.gif', fit: BoxFit.fill,)),
                ),
                ListTile(
                  leading: Icon(Icons.location_on),
                  title: Text('Pickup Locations'),
                  onTap: () {
                    // change app state...
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  leading: Icon(Icons.star),
                  title: Text('Your Ratings'),
                  onTap: () {
                    // change app state...
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Rating(id)));
                    //Navigator.pop(context); // close the drawer
                  },
                ),
                ListTile(
                  leading: Icon(Icons.block),
                  title: Text('Logout'),
                  onTap: () {
                    // change app state...
                    //Navigator.push(context, MaterialPageRoute(builder: (context) => Login()));
                    runApp(Login());
                  },
                ),
              ],
            )
          ),
        appBar: AppBar(
          backgroundColor: barColor,
          title: Text("Pickup Locations"),
        ),
        //backgroundColor: bgColor,
        body: GoogleMap(
            initialCameraPosition: CameraPosition(target: LatLng(-25.7545, 28.2314), zoom: 16),
            mapType: MapType.normal, 
            onMapCreated: (controller){
              setState(() {
               mapController = controller; 
              });
              mapController.addMarker(
                MarkerOptions(
                  draggable: false,
                  position: LatLng(-25.750703, 28.232692),
                  infoWindowText: InfoWindowText('Stop H1', 'Sunnyside')
                ) 
              );
              mapController.addMarker(
                MarkerOptions(
                  draggable: false,
                  position: LatLng(-25.750623, 28.235500),
                  infoWindowText: InfoWindowText('Stop H2', 'Menlyn')
                ) 
              );
              mapController.addMarker(
                MarkerOptions(
                  draggable: false,
                  position: LatLng(-25.755586, 28.239173),
                  infoWindowText: InfoWindowText('Stop H3', 'Brooklyn')
                ) 
              );
              mapController.addMarker(
                MarkerOptions(
                  draggable: false,
                  position: LatLng(-25.750946, 28.231121),
                  infoWindowText: InfoWindowText('Stop H4', 'Arcadia')
                ) 
              );
            },

            // markers: Set<Marker>.of(markers.values),
            myLocationEnabled: true, // Add little blue dot for device location, requires permission from use
            trackCameraPosition: true,
            compassEnabled: true
        ),
        )
        )
      );
  } 

  void getMarkers(GoogleMapController controller){
   
  }
}