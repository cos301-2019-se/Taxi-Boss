document.getElementById("but3").addEventListener("click", begin3);

Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example

var obj3;
var ctx3;

var first = 0;
var second = 0;
var third = 0;
var fourth = 0;
var fifth = 0;


begin3();

function begin3()
{
   ctx3 = document.getElementById("myHorizontolChart");
   violationsByCity();
   
   sortObj();
   draw3();



  var today3= new Date();
  var time3 = today3.getHours() + ":" + today3.getMinutes();

  document.getElementById("chartupdated5").innerHTML = "Updated"+" " +  today3.getDate() + "/" +today3.getMonth()+ "/"+ today3.getFullYear() + " at " +time3;




}





function violationsByCity() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      obj3 = JSON.parse(this.responseText);
      

      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByCity", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}


function sortObj()
{
  obj3.sort((a, b) => (a.numViolations < b.numViolations) ? 1 : (a.numViolations === b.numViolations) ? ((a.city > b.city) ? 1 : -1) : -1 )

  


}





function draw3()
{


var myLineChart = new Chart(ctx3, {
  type: 'horizontalBar',
  data: {
    labels: [obj3[0].city, obj3[1].city, obj3[2].city, obj3[3].city, obj3[4].city, obj3[5].city, obj3[6].city, obj3[7].city, obj3[8].city, obj3[9].city],
    datasets: [{
      label: "number of violations",
      backgroundColor: "rgb(247, 17, 201)",
      borderColor: "rgb(247, 17, 201)",
      data: [obj3[0].numViolations, obj3[1].numViolations, obj3[2].numViolations, obj3[3].numViolations, obj3[4].numViolations, obj3[5].numViolations, obj3[6].numViolations, obj3[7].numViolations, obj3[8].numViolations, obj3[9].numViolations],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'city'
        },
        gridLines: {
          display: true
        },
        ticks: {
          min: 0,
          maxTicksLimit: 100
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 100
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: true
    }
  }
});

}

