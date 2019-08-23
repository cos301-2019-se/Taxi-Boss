document.getElementById("but").addEventListener("click", begin1);




var ussd = 0;
var web = 0;
var app = 0;
var ctx;

begin1();
function begin1()
{


Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
 ctx = document.getElementById("myPieChart");


numUSSD();
numWEB();
numAPP();



var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
document.getElementById("chartupdated3").innerHTML = "Updated"+" " +  today.getDate() + "/" +today.getMonth()+ "/"+ today.getFullYear() + " at " +time;


}


function numUSSD() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	var obj= JSON.parse(this.responseText);
    	ussd = obj.numUSSD;
     	
    }
  };
  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/numUSSD", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function numWEB() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	var obj= JSON.parse(this.responseText);
    	web = obj.numWEB;

      
    }
  };
  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/numWEB", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function numAPP() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	var obj= JSON.parse(this.responseText);
    	app = obj.numAPP

      console.log(app);
      draw();
     
    }
  };
  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/numAPP", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();


}

function draw()
{
  console.log("app in draw");
	var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["USSD", "WEB", "APP"],
    datasets: [{
      data: [ussd,web,app],
      backgroundColor: ['rgb(24, 20, 255)', 'rgb(255, 0, 0)', 'rgb(255, 157, 0)'],
    }],
  },
});
}
