import 'package:flutter/material.dart';
//import './pages/give_rating.dart';
import "package:cloud_firestore/cloud_firestore.dart";

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

    appBar: new AppBar(title: new Text("Rate your Driver!"), backgroundColor: Colors.yellow),

    body: new SafeArea(
          top: false,
          bottom: false,
          child: new Center(
            
              child: new Column(
                
                children: <Widget>[
                    Image.network("https://cdn.dribbble.com/users/514552/screenshots/4255081/taxidup.gif", fit: BoxFit.fill),
                    new TextField(
                    maxLength: 1,
                    keyboardType: TextInputType.number,
                    decoration: new InputDecoration(
                    hintText: "Enter Safety Rating:"


                  ),
                
                  onSubmitted: (String res)
                  {
                    setState(() {
                    safety = res; 
                    input.safety = int.parse(safety);

                    });
                  }
                  ),
                  new Text("Safety Rating:  ${safety}"),

                  new TextField(
                    maxLength: 1,
                    keyboardType: TextInputType.number,
                    decoration: new InputDecoration(
                    hintText: "Enter Comfort Rating:"


                  ),
                
                  onSubmitted: (String res)
                  {
                    setState(() {
                    comfort = res; 
                    input.comfort = int.parse(comfort);
                    });
                  }
                  ),
                new Text("Comfort Rating:  ${comfort}"),

                new TextField(
                    maxLength: 1,
                    keyboardType: TextInputType.number,
                    decoration: new InputDecoration(
                    hintText: "Enter Etiquette Rating:"


                  ),
                
                  onSubmitted: (String res)
                  {
                    setState(() {
                    etiquette = res; 
                    input.etiquette = int.parse(etiquette);
                    
                    });
                  }
                  ),
                new Text("Etiquette Rating:  ${etiquette}"),

                new Container(
                              padding: const EdgeInsets.only(left: 40.0, top: 50.0),
                              child: new RaisedButton(
                                child: const Text('Submit'),
                                onPressed: ()
                                {
                                  int sum;
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
  int comfort = 0;
  int safety = 0;
  int etiquette = 0;
  double average = 0;

}

