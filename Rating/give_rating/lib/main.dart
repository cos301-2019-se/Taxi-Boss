import 'package:flutter/material.dart';
//import './pages/give_rating.dart';
import "package:cloud_firestore/cloud_firestore.dart";
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

void main()
{
  runApp(new MaterialApp(
    home: new MyTextInput(),
    

 

  ));
}


class MyTextInput extends StatefulWidget
{
  @override
  MyTextInputState createState() => new MyTextInputState();

  GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  
  void showMessage(String message, [MaterialColor color = Colors.red]) 
  {
    _scaffoldKey.currentState
        .showSnackBar(new SnackBar(backgroundColor: color, content: new Text(message)));
  }
}


  

class MyTextInputState extends State<MyTextInput>
{
  Input input = new Input();
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  
  
  

  String safety = "";
  String comfort = "";
  String etiquette = "";


  @override
  Widget build(BuildContext context)
  {

  
  return new Scaffold(

    appBar: new AppBar(title: new Text("Give Us Your Feedback"), backgroundColor: Colors.yellow),

    body: new SafeArea(
          top: false,
          bottom: false,
          child: new Center(
            
              child: new Column(
                
                children: <Widget>[
                    Image.network("https://cdn.dribbble.com/users/514552/screenshots/4255081/taxidup.gif", fit: BoxFit.fill),
                 

                  new Text("Rate your Driver!", style: new TextStyle(color: Colors.red, fontSize:30,) ,),
                 Padding (
                   padding: const EdgeInsets.only(top:30)
                 ),


                 new Text("Safety Rating: ", style: new TextStyle(fontSize:20,) ,),
                 FlutterRatingBar(
                    initialRating: 0,
                    fillColor: Colors.amber,
                    itemSize: 50.0,
                    borderColor: Colors.amber.withAlpha(50),
                    allowHalfRating: true,
                    onRatingUpdate: (rating) {
                    print(rating);
                    input.safety = rating;
                     },
                    ),
                  

              

                
            
                 new Text("Comfort Rating: ", style: new TextStyle(fontSize:20,) ,),
                 FlutterRatingBar(
                    initialRating: 0,
                    fillColor: Colors.amber,
                     itemSize: 50.0,
                    borderColor: Colors.amber.withAlpha(50),
                    allowHalfRating: true,
                    onRatingUpdate: (rating) {
                    print(rating);
                    input.comfort = rating;
                     },
                    ),
                

              new Text("Etiquette Rating: ", style: new TextStyle(fontSize:20,) ,),
                 FlutterRatingBar(
                    initialRating: 0,
                    fillColor: Colors.amber,
                    itemSize: 50.0,
                    borderColor: Colors.amber.withAlpha(50),
                    allowHalfRating: true,
                    onRatingUpdate: (rating) {
                    print(rating);
                    input.etiquette = rating;
                     },
                    ),
                

                new Container(
                              padding: const EdgeInsets.only(left: 40.0, top: 50.0),
                              child: new RaisedButton(
                                child: const Text('Submit'),
                                onPressed: ()
                                {
                                  double sum;
                                  sum = input.comfort + input.safety + input.etiquette;

                                  input.average = (sum/15) * 5;
                                  Firestore.instance.collection("Rating").document().setData({'averageRating': input.average, 'comfort':input.comfort, 'driverID':"1" ,'etiquette':input.etiquette, 'safety':input.safety});

                                }
                                
                              )
                              ),
                ]
        )
     
    
       
          
        
        )
     
     
     
     
      )
    );

  
  }



  
  void submit_values()
  {
    

  // final FormState form = _formKey.currentState;
   //form.save();
  // print('Submitting to back end...');

      



  }





}

class Input
{
  double comfort = 0;
  double safety = 0;
  double etiquette = 0;
  double average = 0;

}

