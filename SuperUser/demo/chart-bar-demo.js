document.getElementById("but2").addEventListener("click", begin2);

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example

var obj2;
var ctx2;

var east = 0;
var free = 0;
var gau = 0;
var kwa = 0;
var lim = 0;
var mpu = 0;
var nwest = 0;
var ncape = 0;
var wcape = 0;

begin2();

function begin2()
{
   ctx2 = document.getElementById("myBarChart");
   violationsByProvince();
   calcViolation();

  var today2 = new Date();
  var time2 = today2.getHours() + ":" + today2.getMinutes();

  document.getElementById("chartupdated4").innerHTML = "Updated"+" " +  today2.getDate() + "/" +today2.getMonth()+ "/"+ today2.getFullYear() + " at " +time2;




}





function violationsByProvince() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      obj2 = JSON.parse(this.responseText);
      

      
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/violationsByProvince", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}





function calcViolation()
{
  
  for(var i = 0; i < obj2.length; i++)
  {
    if(obj2[i].province == "EASTERN_CAPE")
    {
      east = obj2[i].numViolations;
     

    }

     if(obj2[i].province == "FREE_STATE")
    {
      free = obj2[i].numViolations;
      
      

    }

    if(obj2[i].province == "GAUTENG")
    {
      gau = obj2[i].numViolations;
      
      

    }

    if(obj2[i].province == "KWAZULU-NATAL")
    {
      kwa = obj2[i].numViolations;
      

    }

    if(obj2[i].province == "LIMPOPO")
    {
      lim = obj2[i].numViolations;
     

    }

    if(obj2[i].province == "MPUMALANGA")
    {
      mpu = obj2[i].numViolations;
     

    }

    if(obj2[i].province == "NORTH_WEST")
    {
      nwest = obj2[i].numViolations;
      

    }

    if(obj2[i].province == "NORTHEN_CAPE")
    {
      ncape = obj2[i].numViolations;
     

    }
     if(obj2[i].province == "WESTERN_CAPE")
    {
      wcape = obj2[i].numViolations;
     

    }
  }


  draw2();
}




function draw2()
{


var myLineChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ["Eastern Cape", "Free State", "Gauteng", "KwaZuluNatal", "Limpopo", "Mpumalanga", "North West","Northen Cape", "Western Cape"],
    datasets: [{
      label: "number of violations",
      backgroundColor: "rgb(10, 224, 240)",
      borderColor: "rgb(10, 224, 240)",
      data: [east, free, gau, kwa, lim, mpu, nwest,ncape,wcape],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'province'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 100
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 9
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