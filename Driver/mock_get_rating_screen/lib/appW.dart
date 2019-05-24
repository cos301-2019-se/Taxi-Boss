import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:mock_get_rating_screen/get_rating.dart';
import 'package:mock_get_rating_screen/locationScreen.dart';

final barColor = Colors.yellow;//const Color.fromRGBO(255, 157, 7, 0);
final bgColor = const Color(0xFFDAE0E2);

class Rating extends StatefulWidget{
  String id;
  Rating(String driver){
    id = driver;
  }
  createState(){
    return DriverRating(id);
  }
}

class DriverRating extends State<Rating> {
  double comfort = 0, safety = 0, etiquette = 0, avgRating = 0;
  var dataA = new GetAvgRating();
  String id;

  DriverRating(String driver){
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
                    Navigator.push(context, MaterialPageRoute(builder: (context) => LocationScreen()));
                    //Navigator.pop(context);
                  },
                ),
                ListTile(
                  leading: Icon(Icons.star),
                  title: Text('Your Ratings'),
                  onTap: () {
                    // change app state...
                    Navigator.pop(context); // close the drawer
                  },
                ),
              ],
            )
          ),
          backgroundColor: bgColor,
          appBar: AppBar(
            backgroundColor: barColor,
            title: Text('Taxi Boss Driver'),
          ),
          body: Center(
            child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(top: 40, bottom: 0),
                child: FittedBox(
                  fit: BoxFit.fill,
                  child: Icon(Icons.stars, size: 100),
                ),
              ),
              Text('${avgRating.toStringAsFixed(1)}', style: new TextStyle(fontSize: 40.0)),
              Padding(
                padding: const EdgeInsets.only(top: 40, bottom: 30.0),
              ),
              Text('Comfort', style: new TextStyle(fontSize: 20.0)),
              FlutterRatingBarIndicator(
                fillColor: barColor,
                rating: comfort,
                itemCount: 5,
                itemSize: 50.0,
                emptyColor: Colors.amber.withAlpha(50),
              ),
              Text('Safety', style: new TextStyle(fontSize: 20.0)),
              FlutterRatingBarIndicator(
                fillColor: barColor,
                rating: safety,
                itemCount: 5,
                itemSize: 50.0,
                emptyColor: Colors.amber.withAlpha(50),
              ),
              Text('Driver Etiquette', style: new TextStyle(fontSize: 20.0)),
              FlutterRatingBarIndicator(
                fillColor: barColor,
                rating: etiquette,
                itemCount: 5,
                itemSize: 50.0,
                emptyColor: Colors.amber.withAlpha(50),
              ),                         
            ],
            )
            ),
          
            //child: Text('Comfort: $comfort\nSafety: $safety\nEtiquette: $etiquette'),
          
          floatingActionButton: FloatingActionButton(
            backgroundColor: barColor,
            child: Icon(Icons.refresh),
            onPressed: (){
              //display and refresh rating on screen
              setState(() {
                dataA.collectData(id);//in future it should give as parameter the current driver id using the app
                //while(dataA.getAvgRatingComfort() == -1.0){}
                comfort = dataA.getAvgRatingComfort();
                //while(dataA.getAvgRatingSafety() == -1){}
                safety = dataA.getAvgRatingSafety();

                etiquette = dataA.getAvgRatingEtiquette();
                avgRating = dataA.getAvg();
              });
          },
        ),
      ),
      )
    );
    
  }
}