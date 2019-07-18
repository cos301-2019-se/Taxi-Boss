import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:mock_get_rating_screen/get_rating.dart';
import 'package:mock_get_rating_screen/locationScreen.dart';

final barColor = Colors.yellow;
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
  //var dataA = new GetAvgRating();
  String id;

  DriverRating(String driver){
    id = driver;
  }

  Widget build(BuildContext context){
    return MaterialApp(
      home: Builder(
        builder: (context)=>
        Scaffold(
          backgroundColor: bgColor,
          appBar: AppBar(
            backgroundColor: barColor,
            title: Text('Taxi Boss Driver'),
          ),
          body: Center(
            child: Column(
            children: <Widget>[
              //add violation stuff here                         
            ],
            )
          ),

          
          floatingActionButton: FloatingActionButton(
            backgroundColor: barColor,
            child: Icon(Icons.refresh),
            onPressed: (){
              //Refresh violations list
              setState(() {
                
              });
          },
        ),
      ),
      )
    );
    
  }
}