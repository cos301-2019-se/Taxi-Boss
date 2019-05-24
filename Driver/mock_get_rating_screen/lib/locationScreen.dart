import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/appW.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'dart:async';
import 'package:geoflutterfire/geoflutterfire.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:rxdart/rxdart.dart';
//import 'package:permission/permission.dart';

final barColor = Colors.yellow;//const Color.fromRGBO(255, 157, 7, 0);
final bgColor = const Color(0xFFDAE0E2);

class LocationScreen extends StatelessWidget{
  Widget build(BuildContext context){
    return MaterialApp(
        home: Scaffold(
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
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Rating('1')));
                    //Navigator.pop(context); // close the drawer
                  },
                ),
              ],
            )
          ),
        appBar: AppBar(
          backgroundColor: barColor,
          title: Text("Pickup Locations"),
        ),
          body: PickUpLocation(),
        )
    );
  }
}

class PickUpLocation extends StatefulWidget{
  // String id;
  // Location(String driver){
  //   id = driver;
  // }
  // createState() {
  //   return PickupLocation(id);
  // }
  State createState() => PickUpLocationState();
}

class PickUpLocationState extends State<PickUpLocation> {
  // String id;
  GoogleMapController mapController;
  int count=0;
  Location location = new Location();
  Firestore firestore = Firestore.instance;
  Geoflutterfire geo = Geoflutterfire();
  BehaviorSubject<double> radius = BehaviorSubject(seedValue: 100.0);
  Stream<dynamic> query;
  // Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  // PickupLocation(String driver){
  //   id = driver;
    
  // }
  Widget build(BuildContext context){
    
    return Stack(children: [
      GoogleMap(
            initialCameraPosition: CameraPosition(target: LatLng(-25.7545, 28.2314), zoom: 16),
            mapType: MapType.normal, 
            onMapCreated: _onMapCreated,
            // markers: Set<Marker>.of(markers.values),
            myLocationEnabled: true, // Add little blue dot for device location, requires permission from use
            trackCameraPosition: true,
            compassEnabled: true
        ),
        Positioned(
          bottom: 50,
          right: 10,
          child: 
          FlatButton(
            child: Icon(Icons.pin_drop, color:Colors.white),
            color: Colors.green,
            onPressed: _addGeoPoint,
          )
        )
    ]);
  } 

  _onMapCreated(GoogleMapController controller){
    setState(() {
      mapController = controller; 
    });
    // var pos = location.getLocation();
    // double distance = pos.data['distance'];
    mapController.addMarker(
      MarkerOptions(
        draggable: false,
        position: LatLng(-25.750703, 28.232692),
        infoWindowText: InfoWindowText('Stop H1: Sunnyside', ' kilometers from your locaiton.')
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
  }

  _addMarker(){
    count++;
    var marker = MarkerOptions(
      position: mapController.cameraPosition.target,
      icon: BitmapDescriptor.defaultMarker,
      infoWindowText: InfoWindowText('Magic Marker',count.toString()),
    );
    mapController.addMarker(marker);
  }
  _animateToUser() async{
    var pos = await location.getLocation();
    mapController.animateCamera(CameraUpdate.newCameraPosition(
      CameraPosition(
        target: LatLng(pos['latitude'], pos['longitude']),
        zoom: 17.0,
        )
      )
    );
  }

  Future<DocumentReference> _addGeoPoint() async {
    var pos = await location.getLocation();
    GeoFirePoint point = geo.point(latitude: pos['latitude'],longitude: pos['longitude']);
    return firestore.collection('Geolocations').add({
      'position': point.data,
      'name':'Taxi Location'
    });
  }
  // void getMarkers(GoogleMapController controller){
   
  // }
}