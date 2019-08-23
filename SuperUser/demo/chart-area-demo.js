document.getElementById("but4").addEventListener("click", begin4);



var ctx4;
var obj4;

var jan;
var feb;
var mar;
var apr;
var may;
var jun;
var jul;
var aug;
var sep;
var oct;
var nov;
var dec;

begin4();

function begin4()
{
  
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';

  ctx4 = document.getElementById("myAreaChart");

  

  var today4 = new Date();
  var time4 = today4.getHours() + ":" + today4.getMinutes();
  document.getElementById("chartupdated6").innerHTML = "Updated"+" " +  today4.getDate() + "/" +today4.getMonth()+ "/"+ today4.getFullYear() + " at " +time4;

  violationsByMonth();
  draw4();


}




//get the number of violations that occure in each month
function violationsByMonth()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       jan = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=01");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       feb = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=02");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       mar = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=03");

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       apr = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=04");

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       may = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=05");

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       jun = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=06");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       jul = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=07");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       aug = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=08");

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       sep = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=09");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       oct = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin: *");
  xhttp.send("month=10");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       nov = obj4.length;
    
      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin","*" );
  xhttp.send("month=11");


  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       obj4= JSON.parse(this.responseText);
       dec = obj4.length;
      
      console.log("output");
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByMonth", false);
  xhttp.setRequestHeader("Access-Control-Allow-Origin","*" );
  xhttp.send("month=12");

}






function draw4()
{



var myLineChart = new Chart(ctx4, {
  type: 'line',
  data: {
    labels: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "September"],
    datasets: [{
      label: "number of violations",
      lineTension: 0.3,
      backgroundColor: "rgba(252, 240, 3)",
      borderColor: "rgba(252, 240, 3)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(252, 240, 3)",
      pointBorderColor: "rgba(252, 240, 3)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(252, 240, 3)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
  
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
         
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: true
    }
  }
});

}