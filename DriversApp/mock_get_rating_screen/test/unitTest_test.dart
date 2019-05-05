import 'package:flutter_test/flutter_test.dart';
import 'package:mock_get_rating_screen/get_rating.dart';

void main() {
  GetAvgRating testing = new GetAvgRating();
  test("Testing Average Calculation", (){
    for(double i = 2; i <= 50; i += 2)
      for (var k = 0; k <= i; k++) {
        expect(testing.calcAvg(i,k), i/k);
        if(testing.calcAvg(i, k) == i/k)
          print("Correct");
        else
          print("Not Correct");
      }
  });
}
