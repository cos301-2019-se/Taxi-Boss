document.getElementById("send").addEventListener("click", violationsByTime);



loadValues();

var objD;
var objM;
var objV;

var numD;
var numM;
var numV;

function loadValues()
{
  //calls all the functions that will generate data to populate the cards
	numDrivers();
	numMonitors();
	numViolations();

  //DOM manipulation
	document.getElementById("chart1").innerHTML = numV;
	document.getElementById("chart2").innerHTML = numD;
	document.getElementById("chart3").innerHTML = numM;


	 violationsByTime();

}


function numDrivers() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objD = JSON.parse(this.responseText);
      numD = objD.numDrivers;
      //store the number of drivers
      

      
    }
  };
  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/numDrivers", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}


function numMonitors() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objM = JSON.parse(this.responseText);
      numM = objM.numMonitors;
      //store the number of monitors

      
    }
  };
   //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/numMonitors", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}


function numViolations() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objV = JSON.parse(this.responseText);
      numV = objV.length;
      //store the number of violations

      
    }
  };
  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allDetailedViolations", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

var percent;
function violationsByTime() {

  var t1 =document.getElementById("time1").value;
  var t2 =document.getElementById("time2").value;
  console.log(t1);

var numT;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var objT = JSON.parse(this.responseText);
        numT= objT.length;
        console.log(numT);


      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByTime", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("startTime="+t1+"&endTime="+ t2);



  var full;
  var full2;
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      full = JSON.parse(this.responseText);
      full2 = full.length;

      
      
    }
  };

  //call api
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allDetailedViolations", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

 percent = numT/ full2 * 100;
 console.log(percent);
draw5();

}






//draw the graph
function draw5()
{

percent = Math.round(percent); 
var other = 100 - percent;
ctx5 = document.getElementById("myDonoughtGraph");


var today6 = new Date();
var time6 = today6.getHours() + ":" + today6.getMinutes();
document.getElementById("chartupdated6").innerHTML = "Updated"+" " +  today6.getDate() + "/" +today6.getMonth()+ "/"+ today6.getFullYear() + " at " +time6;




var doughnutChart = new Chart(ctx5, {
  type: 'doughnut',
  data: {
    labels: ["% of Other violations", "% of Violations in time period"],
    datasets: [{
      label: "% of violations",
      data: [other,percent],
      backgroundColor: ['rgb(24, 20, 255)', 'rgb(255, 0, 0)']
    }],
  },
 
    legend: {
      display: true
    }
  
  });

}

