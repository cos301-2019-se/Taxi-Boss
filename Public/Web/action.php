<?php

	include('firestore.php'); //file is on server

		use PHPFireStore\FireStoreApiClient;
		use PHPFireStore\FireStoreDocument;

		//use API key to connect to the database
		$firestore = new FireStoreApiClient(
		 'taxi-boss-3792e', 'AIzaSyC1FK6R2NLk0cfhMsMoE4EJnsNZaB47hfk'
		);
		

		//variable names
		$numberPlate = $event = $date = $time = $other = $street = $city = $province = $latitude = $longitude = $reportDate = $reportTime = "";
	

	

	if(isset($_POST['submit']))
	{
		//store the data from the HTML froms in the variable names
		$numberPlate = $_POST['numberPlate'];
		$event = $_POST['event'];
		$other = $_POST['other'];
		$date = $_POST['date'];
		$time = $_POST['time'];
		$street = $_POST['street'];
		$city = $_POST['city'];
		$province = $_POST['province'];

		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];

		$reportDate = date("Y-m-d");
		$reportTime = date("H:i");


		//If the "other" option was chosen
		if($event == "OTHER")
		{
			$lowOther = $other;
			$other = strtoupper($lowOther); //convert the user's input into capital letters
			$upperOther = $other;

			//replace whitespace with underscore
			//and store the variable		
			$event = preg_replace('/\s+/', '_', $upperOther); 
										

			//echo "$event";
		}

		//If the user inserted a street name
		if(isset($_POST['street']))
		{
			$lowStreet = $street;
			$upperStreet = strtoupper($lowStreet); //convert the user's input into capital letters

			//replace whitespace with underscore
			//and store the variable
			$street = preg_replace('/\s+/', '_', $upperStreet);

			//echo "$street";

		}

		//If the user inserted a city name
		if(isset($_POST['city']))
		{
			$lowCity = $city;
			$upperCity = strtoupper($lowCity); //convert the user's input into capital letters

			//replace whitespace with underscore
			//and store the variable
			$city = preg_replace('/\s+/', '_', $upperCity);

			//echo "$city";

		}

		//If the user inserted a province name
		if(isset($_POST['province']))
		{
			$lowProvince = $province;
			$upperProvince = strtoupper($lowProvince); //convert the user's input into capital letters

			//replace whitespace with underscore
			//and store the variable
			$province = preg_replace('/\s+/', '_', $upperProvince);

			//echo "$province";

		}

		//Create a new document
		$document = new FireStoreDocument();

		//Set the object values
		$document->setString('violationOrigin', 'WEB');
		$document->setString('time', $time);
		$document->setString('date', $date);
		$document->setString('street', $street);
		$document->setString('city', $city);
		$document->setString('province', $province);
		$document->setString('numberPlate', $numberPlate);
		$document->setString('violationDescription', $event);
		
		

		//add the document 
		$firestore->addDocument('Violations', $document);


		//set object values for the other document
		$document->setString('violationOrigin', 'WEB');
		$document->setString('time', $time);
		$document->setString('date', $date);
		$document->setString('street', $street);
		$document->setString('city', $city);
		$document->setString('province', $province);
		$document->setString('numberPlate', $numberPlate);
		$document->setString('violationDescription', $event);
		$document->setString('latitude', $latitude);
		$document->setString('longitude', $longitude);
		$document->setString('reportDate', $reportDate);
		$document->setString('reportTime', $reportTime);

		//add the document
		$firestore->addDocument('DetailedViolations', $document);


		//Thank the user
		echo "<body style='background-color: #FED428'>";
		echo "<h1 style= 'text-align:center; font-size:100px'> Thank You <h1>";


	}


?>