import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/get_rating.dart';

void main(){
  final barColor = const Color(0xFFf1f442);
  final bgColor = const Color(0xFFDAE0E2);
  var ratingData = GetAvgRating();

  var app = MaterialApp(
    home: Scaffold(
        backgroundColor: bgColor,
        appBar: AppBar(
          backgroundColor: barColor,
          title: Text('Driver Rating MockApp'),
        ),
        body: Text('Display Rating Data Here!'),
        floatingActionButton: FloatingActionButton(
          backgroundColor: barColor,
          child: Icon(Icons.refresh),
          onPressed: (){
            //display and refresh rating on screen
        },
      ),
    ),
  );

  runApp(app);
}