document.getElementById("tablebut").addEventListener("click", removeElement);




removeElement();

function removeElement() 
{
   var e = document.getElementById("box"); 
    // e.innerHTML = ""; 
   var child = e.lastElementChild;  
   while (child) 
   { 
   		e.removeChild(child); 
   		child = e.lastElementChild; 
   } 

   var objTable;



   beginTable();


}


function beginTable()
{
	allDetailedViolations();
	

	var todayT = new Date();
	var timeT = todayT.getHours() + ":" + todayT.getMinutes();
	document.getElementById("tableDate").innerHTML = "Updated"+" " +  todayT.getDate() + "/" +todayT.getMonth()+ "/"+ todayT.getFullYear() + " at " +timeT;


}

function allDetailedViolations()
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	objTable = JSON.parse(this.responseText);
    	
     	
    }
  };
  xhttp.open("POST", "https://europe-west2-taxi-boss-3792e.cloudfunctions.net/allDetailedViolations", false);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

  createTable();


}


function createTable(){

var myTableDiv = document.getElementById("box");
var table = document.createElement('TABLE');
table.id='tableId'
table.border='1';
table.class = 'table table-bordered';

var header = table.createTHead();
var row = header.insertRow(0);
var cell = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);
var cell6 = row.insertCell(6);
var cell7 = row.insertCell(7);


cell.innerHTML = "<b>Number Plate</b>";
cell1.innerHTML = "<b>Violation</b>";
cell2.innerHTML = "<b>Violation Origin</b>";


cell3.innerHTML = "<b>Date</b>";
cell4.innerHTML = "<b>Time</b>";

cell5.innerHTML = "<b>Street</b>";
cell6.innerHTML = "<b>City</b>";
cell7.innerHTML = "<b>Province</b>";



var tableBody = document.createElement('TBODY');
table.appendChild(tableBody);


for (var i=0; i<objTable.length; i++){
var tr = document.createElement('TR');
tableBody.appendChild(tr);


   var td = document.createElement('TD');
   val = objTable[i].numberPlate;
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

   var td = document.createElement('TD');
   val = objTable[i].violationDescription;
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

   var td = document.createElement('TD');
   val = objTable[i].violationOrigin;
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

   var td = document.createElement('TD');
   val = objTable[i].date;
   td.width = "100";
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

   var td = document.createElement('TD');
   val = objTable[i].time;
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

    var td = document.createElement('TD');
    val = objTable[i].street;
   	td.appendChild(document.createTextNode(val));
   	tr.appendChild(td);

    var td = document.createElement('TD');
   	val = objTable[i].city;
   	td.appendChild(document.createTextNode(val));
   	tr.appendChild(td);

   var td = document.createElement('TD');
   val = objTable[i].province;
   td.appendChild(document.createTextNode(val));
   tr.appendChild(td);

}

myTableDiv.appendChild(table);
$("#tableId").dataTable({

	 "dom": '<"dt-buttons"Bf><"clear">lirtp',
        "buttons": [
        	{
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                className: 'btn-danger btn-lg' 
            },
            { extend: 'copy', className: 'btn-primary btn-lg'},
            { extend: 'excel', className: 'btn-success btn-lg' },
             { extend: 'print', className: 'btn-warning btn-lg' }
            
            
        ]
  });








}








