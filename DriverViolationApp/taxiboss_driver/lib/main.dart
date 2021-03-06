import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'speed.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'graph.dart';
import 'package:shared_preferences/shared_preferences.dart';


final barColor = Colors.orange;

//void main() => runApp(new MaterialApp(
//      home: new HomePage(),
//    ));

void main() => runApp(new MaterialApp(
      home: new login(),//TODO: dsdfsdf
));

var numPlateG = "";

class HomePage extends StatefulWidget {
  @override
  HomePageState createState() => new HomePageState();
}

class HomePageState extends State<HomePage> {
  final String url="https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allViolationsByPlate?numberPlate="+numPlateG;
  List data;

  @override
  void initState(){
    //print("TEST 1");
    super.initState();
    //print("TEST 2");
    this.getJsonData();
  }

  Future<String> getJsonData() async{
    //print("TEST 3");
    //var response = await http.get(
      //Uri.encodeFull(url),
      //headers: {"Accept": "application/json"},

    //);
    String url1 = 'https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allViolationsByPlate?numberPlate';
    Map<String, String> headers = {"Content-type": "application/json","Accept":"application/json"};
    var jsonb = {"numberPlate":numPlateG};
    // make POST request
    var response = await http.post(url1, headers: headers, body: json.encode(jsonb));
    // check the status code for the result
    int statusCode = response.statusCode;
    // this API passes back the id of the new item added to the body
    var body = response.body;
    //print(body);

    setState(() {
      var toJsonData = json.decode(body);
      data = toJsonData;
    });

    return "Success";
}

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        bottomNavigationBar: CurvedNavigationBar(
          color: Colors.orange,
          index: 1,
          backgroundColor: Colors.white,
          items: <Widget>[
            Icon(Icons.drive_eta, size: 30, color: Colors.white),
            Icon(Icons.warning, size: 30, color: Colors.white),
            Icon(Icons.poll, size: 30, color: Colors.white),
          ],
          onTap: (index) {
            //Handle button tap
            if(index == 0)
            {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) =>  Speed()),
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
          title: new Text("Taxi Boss\nYour Violations"),
        ),
        body: //Container(color: Colors.blueAccent),
            new ListView.builder(
            itemCount: data == null ? 0 : data.length,
            itemBuilder: (BuildContext context, int index) {
              return new Container(
                  child: new Center(
                      child: new Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Icon(
                    Icons.airport_shuttle,
                    color: Colors.orange[200],
                    size: 30.0,
                  ),
                  new Card(
                    elevation: 3.0,
                    child: new Row(
                      children : <Widget>[
                        Padding(padding: EdgeInsets.all(9), child:Icon(
                          Icons.error,
                          color: Colors.redAccent,
                          size: 50.0,
                        )),
                        new RichText(
                          text: TextSpan(
                            style: DefaultTextStyle.of(context).style,
                            children: <TextSpan>[
                              TextSpan(text: "\n"+data[index]['violationDescription'].replaceAll(new RegExp(r'_'), ' ')+"\n", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: Colors.redAccent)),
                              TextSpan(text: data[index]['street']+"\n", style: TextStyle(fontWeight: FontWeight.w500, color: Colors.black.withOpacity(0.4), fontSize: 14)),
                              TextSpan(text: data[index]['city']+"\n", style: TextStyle(fontWeight: FontWeight.w500, color: Colors.black.withOpacity(0.4), fontSize: 14)),
                              TextSpan(text: data[index]['province']+"\n", style: TextStyle(fontWeight: FontWeight.w500, color: Colors.black.withOpacity(0.4), fontSize: 14)),
                              TextSpan(text: "Time: "+data[index]['time']+"   Date: "+data[index]['date']+"\n", style: TextStyle(fontWeight: FontWeight.w500, color: Colors.black.withOpacity(0.4), fontSize: 13)),
                            ],
                        ),
                      ),
                      ],
                      //padding: const EdgeInsets.all(20),
                  ))
                ],
              )));
            }));
  }
}
//-----------------------------------------------------

class login extends StatefulWidget {
  @override
  loginState createState() => new loginState();
}

class loginState extends State<login> {

  final String url="";
  List data;

  final myControllerNP = TextEditingController();
  final myControllerPass = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myControllerNP.dispose();
    myControllerPass.dispose();
    super.dispose();
  }

  @override
  void initState(){
    super.initState();
    //this.getJsonData();
  }

  var loginSuccess;

  Future<String> getLogin(var numPlate, var pass) async{
    print(numPlate+"-----------------------------------------");
    var response = await http.get(
      Uri.encodeFull("https://europe-west2-taxi-boss-3792e.cloudfunctions.net/loginDriver?numberPlate="+numPlate+"&password="+pass),//enter URL here
      headers: {"Accept": "application/json"},
    );

    print(response.body);

    //setState(() {
      var toJsonData = json.decode(response.body);
      loginSuccess = toJsonData["status"];
      if(loginSuccess == "success")
      {
        numPlateG = myControllerNP.text;
        final prefs = await SharedPreferences.getInstance();
        prefs.setString('numPlate', numPlateG);
        
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  HomePage()),
        );
      }

    return "Success";
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          backgroundColor: barColor,
          title: new Text("Taxi Boss"),
        ),
        body: Column(
        children: <Widget>[
          Padding(padding: EdgeInsets.only(top: 20),child: Card(
            elevation: 3.0,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
                Padding(padding: EdgeInsets.only(top: 20),child: Center(child: Icon(Icons.lock_open, size: 120, color: Colors.orange[300]))),
                Padding(
                  padding: const EdgeInsets.all(25.0),
                  child: TextField(
                    textAlign: TextAlign.center,
                    controller: myControllerNP,
                    //expands: true,
                    //autofocus: true,
                    decoration: InputDecoration(
                      labelText: 'Number Plate', 
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.orangeAccent, width: 1.0),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.orangeAccent, width: 1.0),
                      ),  
                    ),
                  )
                ),
                Padding(
                  padding: const EdgeInsets.all(25.0),
                  child: TextField(
                    controller: myControllerPass,
                    obscureText: true,
                    textAlign: TextAlign.center,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.orangeAccent, width: 1.0),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.orangeAccent, width: 1.0),
                      ),
                    ),
                    )
                ),
          ]
          ),
          )),
        ]),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          getLogin(myControllerNP.text, myControllerPass.text);
        },
        tooltip: 'Login!',
        child: Icon(Icons.navigate_next),
        backgroundColor: Colors.orange,
      ),
    );
  }
}

