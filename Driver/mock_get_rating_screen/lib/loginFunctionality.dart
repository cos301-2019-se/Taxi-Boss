import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:mock_get_rating_screen/login.dart';

import 'dart:async';

class LoginFunc {
  String username = "";
  String password = "";
  bool match = false;
  bool userExist = false;

  //returns true when user is logged in
  //returns false when something went wrong
  bool requestLogin(String user, String pass)
  {
    username = user;
    password = pass;
    
    if(userRegistered() == false)
    {
      //output user not registered
      return false;
    }

    return matchUserPass(username, password);
  }

  //return true if username in database and false if not
  bool userRegistered()
  {
    //check db if user is there
    
    Future<QuerySnapshot> qS = Firestore.instance.collection('Taxi Driver').getDocuments().then((snap){
      for(int i = 0; i < snap.documents.length; i++){
        String u = snap.documents.elementAt(i).data['driverID'];
        if(username.contains(u))
        {
          print(snap.documents.elementAt(i).data['driverID']);
          userExist = true;
        }
      }
    });
    return userExist;
  }

  bool matchUserPass(String user, String pass)
  {
    //get from db and match
    
    Future<QuerySnapshot> qS = Firestore.instance.collection('Taxi Driver').getDocuments().then((snap){
      for(int i = 0; i < snap.documents.length; i++){
        if(username.contains(snap.documents.elementAt(i).data['driverID']))
        {
          if(password.contains(snap.documents.elementAt(i).data['password']))
          {
            match = true;
            snap.documents.elementAt(i).data['loggedIn'] = true;
            print("Theres a match");
          }
        }
      }
    });
    
    return match;
  }

  void logout()
  {
    Future<QuerySnapshot> qS = Firestore.instance.collection('Taxi Driver').getDocuments().then((snap){
      for(int i = 0; i < snap.documents.length; i++){
        if(username.contains(snap.documents.elementAt(i).data['driverID']))
        {
          snap.documents.elementAt(i).data['loggedIn'] = false;
          runApp(Login());
        }
      }
    });
  }
}