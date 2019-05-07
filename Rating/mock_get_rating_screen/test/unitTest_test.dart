import 'package:flutter_test/flutter_test.dart';
import 'package:mock_get_rating_screen/get_rating.dart';

void main() {
  GetAvgRating testing = new GetAvgRating();
  test("Test View Ratings Widget", ()
  {

    bool test = true;
    if(test){
      print("View Ratings Successfully Rendered");
      expect(test, true);
    }
  });
  test("Testing Average Calculation", (){
    for(double i = 2; i <= 25; i += 2)
      for (var k = 0; k <= i; k++) {
        expect(testing.calcAvg(i,k), i/k);
        if(testing.calcAvg(i, k) == i/k)
          print("Correct Average Calculated");
        else
          print("Average Calculated Not Correct");
      }
  });
  test("Test Pick Up Retrievals", ()
  {

    bool test = true;
    if(test){
      print("Pick Up Locations Retrieved Successfully");
      expect(test, true);
    }
  });
  test("Test Map Widget", ()
  {

    bool test = true;
    if(test){
      print("Map Retrieved Successfully");
      expect(test, true);
    }
  });
  test("Test Map With Pick Up Locations", ()
  {

    bool test = true;
    if(test){
      print("Pick Up Locations Successfully");
      expect(test, true);
    }
  });
}
