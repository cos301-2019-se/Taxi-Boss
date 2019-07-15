<?php
        include('firestore.php');
		use PHPFireStore\FireStoreApiClient;
		use PHPFireStore\FireStoreDocument;


		//V---Connect to Firestore Database Here---V
		$firestore = new FireStoreApiClient(
		 'taxi-boss', 'AIzaSyAI5mv1zwpU7VG54nzkQuIiwMOrk3iRs0k'
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
			
			if(count($data->sessionValues) == 12)//first menu
			{
				$document->setString('time', $data->sessionValues[5]);
				$document->setString('date', $data->sessionValues[8]);
				$document->setString('street', strtoupper($data->sessionValues[7]));
				$document->setString('city', strtoupper($data->sessionValues[4]));
				$document->setString('province', strtoupper($data->sessionValues[6]));
				$document->setString('numberPlate', str_replace(' ', '', strtoupper($data->sessionValues[10]->value)));
				switch ($data->sessionValues[9]->value) {
				case '1':
					# code...
					$document->setString('violationDescription', 'ILLEGAL_STOP');
					break;

				case '2':
					# code...
					$document->setString('violationDescription', 'ILLEGAL_USE_OF_EMERGENCY_LANE');
					break;

				case '3':
					# code...
					$document->setString('violationDescription', 'DRIVING_ON_WRONG_SIDE_OF_ROAD');
					break;

				case '4':
					# code...
					$document->setString('violationDescription', 'ILLEGAL/UNSAFE_OVERTAKE');
					break;
				
				default:
					# code...
					break;
				}
			}
			else if(count($data->sessionValues) == 13)//second menu
			{
				$document->setString('time', $data->sessionValues[5]);
				$document->setString('date', $data->sessionValues[9]);
				$document->setString('street', strtoupper($data->sessionValues[8]));
				$document->setString('city', strtoupper($data->sessionValues[4]));
				$document->setString('province', strtoupper($data->sessionValues[7]));
				$document->setString('numberPlate', str_replace(' ', '', strtoupper($data->sessionValues[12]->value)));
				switch ($data->sessionValues[6]->value) {
					case '5':
						# code...
						$document->setString('violationDescription', 'UNROADWORTHY');
						break;
					
					case '6':
						# code...
						$document->setString('violationDescription', 'VIOLENT_BEHAVIOUR');
						break;

					case '7':
						# code...
						$document->setString('violationDescription', 'SKIPPING_ROBOT');
						break;

					case '8':
						# code...
						$document->setString('violationDescription', 'SKIPPING_A_STOP_SIGN');
						break;

					case '9':
						# code...
						$document->setString('violationDescription', 'SPEEDING');
						break;

					case '10':
						# code...
						$document->setString('violationDescription', 'INCORRECT_USE_OF_INDICATORS/HAZARDS');
						break;

					case '11':
						# code...
						$document->setString('violationDescription', 'CUTTING_OF_DRIVERS');
						break;

					default:
						# code...
						break;
				}
			}
			else
			{
				$document->setString('time', $data->sessionValues[5]);
				$document->setString('date', $data->sessionValues[9]);
				$document->setString('street', strtoupper($data->sessionValues[8]));
				$document->setString('city', strtoupper($data->sessionValues[4]));
				$document->setString('province', strtoupper($data->sessionValues[7]));
				$document->setString('violationDescription', strtoupper($data->sessionValues[10]));
				$document->setString('numberPlate', str_replace(' ', '', strtoupper($data->sessionValues[13]->value)));
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
			header('Content-Type: text/xml');
			echo '<ussdAppResponse>
					<prompt>Report not sent!  Please close this window.</prompt>
					<state>end</state>
				  </ussdAppResponse>';
		}
?>

