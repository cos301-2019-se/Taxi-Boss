import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/appW.dart';


final barColor = const Color(0xFFf1f442);
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
                  child: Center(child: Text('Add cool location image here!')),
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
        backgroundColor: bgColor,
      )
    )
    );
  }
}