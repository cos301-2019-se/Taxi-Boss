<?php
        include('firestore.php');
		use PHPFireStore\FireStoreApiClient;
		use PHPFireStore\FireStoreDocument;


		//V---Connect to Firestore Database Here---V
		$firestore = new FireStoreApiClient(
		 'taxi-boss', 'AIzaSyA_HjHtNIobFyRctyPzR4YWTjrtmDw-pbA'
		);

		//Get post request here and put correct data in fields below
		$rawBody = file_get_contents("php://input");
		$data = array();

		$data = json_decode($rawBody);

		if($data->userInput == "1")
		{
			//V---Creation of Firestore Document Here---V
			$document = new FireStoreDocument();
			$document->setString('violationOrigin', 'USSD');
			
			if($data->sessionValues[6]->indexableKey->key == "VIOLATION_VALUE")//first menu
			{
				$document->setString('numberPlate', $data->sessionValues[5]->value);
				switch ($data->sessionValues[6]->value) {
				case '1':
					# code...
					$document->setString('violationDescription', 'Illegal stop');
					break;

				case '2':
					# code...
					$document->setString('violationDescription', 'Illegal use of emergency lane');
					break;

				case '3':
					# code...
					$document->setString('violationDescription', 'Driving on wrong side of the road');
					break;

				case '4':
					# code...
					$document->setString('violationDescription', 'Illegal/unsafe overtake');
					break;
				
				default:
					# code...
					break;
				}
			}
			else//second menu
			{
				$document->setString('numberPlate', $data->sessionValues[6]->value);
				switch ($data->sessionValues[5]->value) {
					case '5':
						# code...
						$document->setString('violationDescription', 'Unroadworthy');
						break;
					
					case '6':
						# code...
						$document->setString('violationDescription', 'Violent behaviour');
						break;

					case '7':
						# code...
						$document->setString('violationDescription', 'Skipping robot');
						break;

					case '8':
						# code...
						$document->setString('violationDescription', 'Skipping a stop sign');
						break;

					case '9':
						# code...
						$document->setString('violationDescription', 'Speeding');
						break;

					case '10':
						# code...
						$document->setString('violationDescription', 'Incorrect use of indicators/hazards');
						break;

					case '11':
						# code...
						$document->setString('violationDescription', 'Cutting off drivers');
						break;

					default:
						# code...
						break;
				}
			}
			
			//V---Add Document to Actual Firestore Database---V
			$firestore->addDocument('Violations', $document);

			//V---Respond Back to Mobile Device---V
	        header('Content-Type: text/xml');
	        echo '<ussdAppResponse>
					<prompt>Thank you for your report!  Please close this window.</prompt>
					<state>end</state>
				  </ussdAppResponse>';
		}
		else
		{
			echo '<ussdAppResponse>
					<prompt>Report not sent!  Please close this window.</prompt>
					<state>end</state>
				  </ussdAppResponse>';
		}
?>

