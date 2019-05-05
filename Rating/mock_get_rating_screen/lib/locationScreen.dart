import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/appW.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

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
              ],
            )
          ),
        appBar: AppBar(
          backgroundColor: barColor,
          title: Text("Pickup Locations"),
        ),
        //backgroundColor: bgColor,
        body: GoogleMap(
            initialCameraPosition: CameraPosition(target: LatLng(24.150, -110.32), zoom: 10),
            mapType: MapType.normal, 
            onMapCreated: (controller){
              setState(() {
               mapController = controller; 
              });
            },
            //myLocationEnabled: true, // Add little blue dot for device location, requires permission from user
            
            //trackCameraPosition: true
        ),
        )
        )
      );
  }

  //void _onMapCreated(GoogleMapController controller){
   // setState(() {
     //mapController=controller; 
    //});
  //}
}