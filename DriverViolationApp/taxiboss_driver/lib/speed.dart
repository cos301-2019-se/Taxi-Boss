import 'dart:async';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_speedometer/flutter_speedometer.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'main.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'graph.dart';
import 'package:location/location.dart';

final barColor = Colors.orange;

class Speed extends StatefulWidget {
  @override
  SpeedState createState() => new SpeedState();
}

class SpeedState extends State<Speed> {
  var speed = 0;
  var maxSpeed = 0;
  var speedometerWarNum = 125;
  var speedometerMaxNum = 180;
  var warningMes = "";
  var dispWar1 = true;
  var dispWar2 = false;
  var dispWar3 = false;

  @override
  void initState(){
    //print("TEST 1");
    //super.initState();
    //print("TEST 2");
    this.getMaxSpeed();
    this.getCurrentSpeed();
    Timer.periodic(new Duration(seconds: 12), (timer){
      //print('getMaxSpeed() called!');
      this.getMaxSpeed();
    });
  }

  Future<String> getMaxSpeed() async{
    var location = new Location();
    LocationData currentLocation;

    currentLocation = await location.getLocation();

    String url1 = 'https://overpass-api.de/api/interpreter?data=[out:json];way(around:140,'+currentLocation.latitude.toString()+','+currentLocation.longitude.toString()+')[maxspeed];out;';
    Map<String, String> headers = {"Content-type": "application/json","Accept":"application/json"};
    // make POST request
    var response = await http.get(url1);
    // check the status code for the result
    int statusCode = response.statusCode;
    // this API passes back the id of the new item added to the body
    var body = response.body;
    //print(body);
    var jsonData = json.decode(body);
    print('=======================Max Speed Limit================');
    print(jsonData['elements'][0]['tags']['maxspeed']);
    print('======================================================');
    //checks if body contains maxspeed

    setState(() {
      maxSpeed = (double.parse(jsonData['elements'][0]['tags']['maxspeed'])).round();
      speedometerWarNum = maxSpeed+7;
    });

    return 'Success';
  }

  Future<String> getCurrentSpeed() async{
    //LocationData currentLocation;
    var location = new Location();
    final prefs = await SharedPreferences.getInstance();
    var numPlate = prefs.getString('numPlate');
    var reported = false;

    location.onLocationChanged().listen((LocationData currentLocation) async {
      setState(() {
       speed = (currentLocation.speed*3.6).round(); 
      });
      
      if(speed > maxSpeed+15 && maxSpeed != 0 && reported == false)//report a violation
      {
        //report violation here
        //API call to get street, city, and province given the latitude and longitude
        String url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+currentLocation.latitude.toString()+'&lon='+currentLocation.longitude.toString()+'&zoom=18&addressdetails=1';
        var response = await http.get(url);
        var pcs = json.decode(response.body); //get the province, city and street
        var province = pcs['address']['state'];
        var city = pcs['address']['city'];
        var street = pcs['address']['road'];
        reported = true; //so that it doesnt add multple speeding violations

        String url1 = 'https://europe-west2-taxi-boss-3792e.cloudfunctions.net/addDetailedViolation';
        Map<String, String> headers = {"Content-type": "application/json","Accept":"application/json"};
        
        var timeH = DateTime.now().hour.toString();
        var timeM = DateTime.now().minute.toString();
        var dateY = DateTime.now().year.toString();
        var dateM = DateTime.now().month.toString();
        var dateD = DateTime.now().day.toString();
        //Format the time
        if(timeH.length == 1)
        {
          timeH = '0'+timeH;
        }
        if(timeM.length == 1)
        {
          timeM = '0'+timeM;
        }

        //Format the date
        if(dateM.length == 1)
        {
          dateM = '0'+dateM;
        }
        if(dateD.length == 1)
        {
          dateD = '0'+dateD;
        }

        var jsonb = {"numberPlate":numPlate, 
                      "violationDescription":"SPEEDING",
                      "street":street.toUpperCase().replaceAll(new RegExp(r' '), '_'),
                      "city":city.toUpperCase().replaceAll(new RegExp(r' '), '_'),
                      "province":province.toUpperCase().replaceAll(new RegExp(r' '), '_'),
                      "time":timeH+':'+timeM,
                      "reportTime":timeH+':'+timeM,
                      "date":dateY+"-"+dateM+"-"+dateD,
                      "reportDate":dateY+"-"+dateM+"-"+dateD,
                      "violationOrigin":"APP",
                      "latitude":currentLocation.latitude.toString(),
                      "longitude":currentLocation.longitude.toString()};
        //TODO: make POST request
        http.post(url1, headers: headers, body: json.encode(jsonb));

        setState(() {
          warningMes = "Reported for speeding,\nslow down!";
          dispWar1 = false;
          dispWar2 = false;
          dispWar3 = true;
        });
      }
      else if(speed > maxSpeed+7 && maxSpeed != 0)//give driver a warning
      {
        setState(() {
          warningMes = "Please slow down!";
          dispWar1 = false;
          dispWar2 = true;
          dispWar3 = false;
        });
      }
      else if(speed <= maxSpeed+15)//driver is in the green
      {
        reported = false;
        setState(() {
          warningMes = "Have a nice day!";
          dispWar1 = true;
          dispWar2 = false;
          dispWar3 = false;
        });
      }
    }); 

    return 'Success';
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        bottomNavigationBar: CurvedNavigationBar(
          color: Colors.orange,
          index: 0,
          backgroundColor: Colors.white,
          items: <Widget>[
            Icon(Icons.drive_eta, size: 30, color: Colors.white),
            Icon(Icons.warning, size: 30, color: Colors.white),
            Icon(Icons.poll, size: 30, color: Colors.white),
          ],
          onTap: (index) {
            //Handle button tap
            if(index == 1)
            {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) =>  HomePage()),
              );
            }
            else if(index == 2)
            {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) =>  Graph()),
              );
            }
          },
        ),
        appBar: new AppBar(
          backgroundColor: barColor,
          title: new Text("Taxi Boss\nSpeedometer"),
        ),
        body: Center(
          child: Column(
            children: <Widget>[
              Card(
                elevation: 3.0,
                child: Speedometer(
                  size: 250,
                  minValue: 0,
                  maxValue: maxSpeed+60,
                  currentValue: speed,
                  warningValue: speedometerWarNum,
                  backgroundColor: Colors.white,
                  meterColor: Colors.greenAccent,
                  warningColor: Colors.redAccent,
                  kimColor: Colors.orange,
                  displayNumericStyle: TextStyle(
                    fontFamily: 'Digital-Display',
                    color: Colors.black,
                    fontSize: 40),
                displayText: 'km/h',
                displayTextStyle: TextStyle(color: Colors.black, fontSize: 15),
              )),
              Container(
                height: 80,
                child: Card(
                elevation: 4.0,
                child: Center(
                  child: RichText(
                      text: TextSpan(
                        children: <TextSpan>[
                          TextSpan(text: 'Speed Limit\n', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.grey, )),
                          TextSpan(text: maxSpeed.round().toString()+' km/h', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25, color: Colors.black))
                        ]
                      ), 
                      )),
              )),
              Container(
                height: 120,
                child: Card(
                elevation: 3.0,
                child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Visibility(child: Icon(
                        Icons.sentiment_very_satisfied,
                        color: Colors.greenAccent,
                        size: 50.0,
                      ),
                      //other visibility values
                      visible: dispWar1,
                    ),
                    Visibility(child: Icon(
                        Icons.warning,
                        color: Colors.orangeAccent,
                        size: 50.0,
                      ),
                      //other visibility values
                      visible: dispWar2,
                    ),
                    Visibility(child: Icon(
                        Icons.error_outline,
                        color: Colors.redAccent,
                        size: 50.0,
                      ),
                      //other visibility values
                      visible: dispWar3,
                    ),
                    //Add the warning text here
                    RichText(
                      text: TextSpan(text: warningMes, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black)),
                    )
                  ]),
                ),
              )),
            ],
          )),
    );
  }
}