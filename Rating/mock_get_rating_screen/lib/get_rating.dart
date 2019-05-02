import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class GetAvgRating {
  
  int comfort = 0, safety = 0, etiquette = 0;

  void collectData(){
    //connect and get data from database here
    String id;
    final db = Firestore.instance;
  }

  int getAvgRatingComfort()
  {
    return 0;
  }

  int getAvgRatingSafety()
  {
    return 0;
  }

  int getAvgRatingEtiquette()
  {
    return 0;
  }
}