import 'package:flutter/material.dart';
import 'package:mock_get_rating_screen/loginFunctionality.dart';
import 'package:mock_get_rating_screen/appW.dart';

    class Login extends StatefulWidget {
      @override
      LoginScreen createState() => LoginScreen();
    }

    class LoginScreen extends State<Login> {
      TextStyle style = TextStyle(fontFamily: 'Montserrat', fontSize: 20.0);
      TextEditingController emailController = new TextEditingController();
      TextEditingController passController = new TextEditingController();
      LoginFunc login = new LoginFunc();

      @override
      Widget build(BuildContext context) {
        final key = new GlobalKey<ScaffoldState>();
        login.logout();
        final emailField = TextField(
          controller: emailController,
          obscureText: false,
          style: style,
          decoration: InputDecoration(
              contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
              hintText: "Email",
              border:
                  OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
        );
        final passwordField = TextField(
          controller: passController,
          obscureText: true,
          style: style,
          decoration: InputDecoration(
              contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
              hintText: "Password From Monitor",
              border:
                  OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
        );
        final loginButon = Material(
          elevation: 5.0,
          borderRadius: BorderRadius.circular(30.0),
          color: Colors.yellow,
          child: MaterialButton(
            
            onPressed: () {
              //code to log user in
              bool loggedIn = false;
              loggedIn =  login.requestLogin(emailController.text, passController.text);
              
              if(loggedIn == true)
              {
                //switch screens
                //Navigator.push(context, MaterialPageRoute(builder: (context) => Rating(emailController.text)));
                runApp(Rating(emailController.text));
              }
              else{
                //show message to try again
                key.currentState.showSnackBar(new SnackBar(
                  content: new Text("Wrong Email or Password!"),
                ));
              }
            },
            child: Text("Login",
                textAlign: TextAlign.center,
                style: style.copyWith(
                    color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        );

        return MaterialApp(home: Scaffold(
          key: key,
          body: Center(
            child: Container(
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(36.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    SizedBox(
                      height: 155.0,
                      child: Image.asset(
                        "images/taxidup.gif",
                        fit: BoxFit.contain,
                      ),
                    ),
                    SizedBox(height: 45.0),
                    emailField,
                    SizedBox(height: 25.0),
                    passwordField,
                    SizedBox(
                      height: 35.0,
                    ),
                    loginButon,
                    SizedBox(
                      height: 15.0,
                    ),
                  ],
                ),
              ),
            ),
          ),
        )
        );
      }
    }