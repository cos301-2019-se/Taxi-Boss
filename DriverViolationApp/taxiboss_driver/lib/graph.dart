import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'main.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'speed.dart';
import 'package:pie_chart/pie_chart.dart';
import 'package:shared_preferences/shared_preferences.dart';

final barColor = Colors.orange;

class Graph extends StatefulWidget {
  @override
  GraphState createState() => new GraphState();
}

class GraphState extends State<Graph> {
  Map<String, double> dataMap = new Map();
  var numPlate = "";
  var graphData;
  var totalNumViolations = 0;

  @override
  void initState(){
    dataMap.putIfAbsent('Loading...', () => 0);
    this.getGraphData();
  }

  Future<String> getGraphData() async{
    var violation;
    var violationCount = 0;
    var violationCountT = 0;

    final prefs = await SharedPreferences.getInstance();
    numPlate = prefs.getString('numPlate');
    
    String url1 = 'https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allViolationsByPlate?numberPlate';
    Map<String, String> headers = {"Content-type": "application/json","Accept":"application/json"};
    var jsonb = {"numberPlate":numPlate};
    // make POST request
    var response = await http.post(url1, headers: headers, body: json.encode(jsonb));
    // this API passes back the id of the new item added to the body
    var body = response.body;
    var toJsonData = json.decode(body);
    graphData = toJsonData;
    

    if(graphData.length == 0)//graph data is empty...add a mock entry for graph
    {
      dataMap.putIfAbsent('Clean Record', () => 0);
    }
    else//there is data...add to graph
    {
      for(var i = 0; i < graphData.length; i++)
      {
        if(dataMap.containsKey(graphData[i]['violationDescription']) == false)
        {
          violation = graphData[i]['violationDescription'];
          for(var k = 0; k < graphData.length; k++)
          {
            if(graphData[k]['violationDescription'] == violation)
            {
              violationCount++;
              violationCountT++;
            }
          }
          setState(() {
            dataMap.putIfAbsent(violation, () => violationCount.toDouble());
          });
          
          violationCount = 0;
        }
      }
    }
    dataMap.remove('Loading...');//remove loading status
    setState(() {
      totalNumViolations = violationCountT;
    });
    return 'Success';
  }

  Duration dur = new Duration(seconds:2);
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        bottomNavigationBar: CurvedNavigationBar(
          color: Colors.orange,
          index: 2,
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
            else if(index == 0)
            {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) =>  Speed()),
              );
            }
          },
        ),
        appBar: new AppBar(
          backgroundColor: barColor,
          title: new Text("Taxi Boss\nGraph"),
        ),
        body: Center(
          child: Column(
            children: <Widget>[
              //add graph and other widgets here
              Card(
                elevation: 3.0,
                child: PieChart(
                  dataMap: dataMap,
                  legendFontColor: Colors.blueGrey[900],
                  legendFontSize: 14.0,
                  legendFontWeight: FontWeight.w500,
                  animationDuration: Duration(milliseconds: 3000),
                  chartLegendSpacing: 10.0,
                  chartRadius: MediaQuery
                      .of(context)
                      .size
                      .width / 2,//2.7
                  showChartValuesInPercentage: false,
                  showChartValues: true,
                  chartValuesColor: Colors.blueGrey[900].withOpacity(0.9),
                  showLegends: true,
                )
              ),
              Container(
                height: 50,
                child: Card(
                  elevation: 3.0,
                  child: Center(
                    child: RichText(
                        text: TextSpan(
                          children: <TextSpan>[
                            TextSpan(text: 'Total Number of Violations:     ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.grey, )),
                            TextSpan(text: totalNumViolations.toString(), style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25, color: Colors.redAccent), )
                          ]
                        ), 
                    )),
                ))
            ],
          ),
        )
    );
  }
}