import 'package:flutter_test/flutter_test.dart';
import 'package:give_rating/main.dart';

void main()
{
  test("Test Sum of ratings", ()
  {
    double val = 100;
    for(double i = 0; i < val; i++)
    {
        if(i+2 < val)
        {
            expect( calc(i,i+1,i+2), i+i+1+i+2 );
            print("Correct Sum Calculated");
        }

    }
     
     
     


  });


  test("Test Average ratings", ()
  {

    
    double val = 100;
    for(double i = 1; i < val; i++)
    {
        if(i+5 < val)
        {
          double ans = (i/(i+2))*(i+5);
         
          expect( avg(i,i+2,i+5),  ans);
           print("Correct Average Calculated");
        }
    }

  });





}