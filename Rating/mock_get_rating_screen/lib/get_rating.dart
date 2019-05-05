import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
//import 'package:firebase_firestore/firebase_firestore.dart';

class GetAvgRating {
  bool done = false;
  double comfort = 0, safety = 0, etiquette = 0, avgRating = 0;
  String out; 
  collectData(userID){
    //connect and get data from database here
    //comfort = 0;
    //safety = 0;
    //etiquette = 0;
    
    String id = userID;
    int count = 0;
    Future<QuerySnapshot> qS = Firestore.instance.collection('Rating').getDocuments().then((snap){
      for(int i = 0; i < snap.documents.length; i++){
        if(snap.documents.elementAt(i).data['driverID'] == id)
        {
          if(i == 0)
          {
            comfort = 0;
            safety = 0;
            etiquette = 0;
            avgRating = 0;
          } 
          count++;
          comfort += snap.documents.elementAt(i).data['comfort'];
          safety += snap.documents.elementAt(i).data['safety'];
          etiquette += snap.documents.elementAt(i).data['etiquette'];
          avgRating += snap.documents.elementAt(i).data['averageRating'];
        }
      }
      comfort = comfort/count;
      safety = safety/count;
      etiquette = etiquette/count;
      avgRating = avgRating/count;
      done = true;
    });    
  }

  double getAvgRatingComfort()
  {
      return comfort;
  }

  double getAvgRatingSafety()
  {
    return safety;
  }

  double getAvg(){
    return avgRating;
  }

  double getAvgRatingEtiquette()
  {
    return etiquette;
  }
}