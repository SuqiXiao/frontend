<?php
include_once "login.php";

/* Function to authenticate access to zone. Given a Zone ID verifies if the currently logged in user owns the zone.
	authenticateAccess('xyz','passwd',804);
	where xyz is the username and 804 is the ZoneID.
	retrns true or false if user has access or not.
*/

require 'login.php';
function authenticateAccess($username,$passwd="blah",$id)
{
	$result = false;
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt ($ch, CURLOPT_USERPWD, "$username:$passwd");
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $url = "http://localhost/SW/www/api/machines/" . $id . ";json";
        curl_setopt ($ch, CURLOPT_URL, $url);
	log_msg($email,"Inside authenticateAccess...".$url,3,pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
        $results=curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);	
	if($statusCode ==200)
	{
		/* Parse Json to retrieve project ID.*/
		$json_machine=json_decode($results,true);
		$projectID=$json_machine["ProjectId"];
		/* Retrieve username from project ID.*/
		$ch2 = curl_init();
	        curl_setopt ($ch2, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	        curl_setopt ($ch2, CURLOPT_USERPWD, "$username:$passwd");
	        curl_setopt ($ch2, CURLOPT_RETURNTRANSFER, 1);
	        curl_setopt ($ch2, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt ($ch2, CURLOPT_FOLLOWLOCATION, 1);
		$url2 = "http://localhost/SW/www/api/projects/" . $projectID . ";json";
		curl_setopt ($ch2, CURLOPT_URL, $url2);
		$results2=curl_exec($ch2);
		$statusCode2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
		if ($statusCode2 == 200)
		{
			/* Parse JSON to retrieve username, compare with session username */
			$json_projs=json_decode($results2,true);
			$retrievedUsernm=$json_projs["UserName"];
			if($username==$retrievedUsernm)
			{
				$result=true;
				$msg="User Authorized for access to VM";
			}
			else
			{
				$msg="User Verification failed!";
			}
		}
		else
		{
			$msg="url:".$url2." Errored: ".$statusCode2;
		}
		curl_close($ch2);
	}
	else
	{
		$msg="url:".$url." Errored: ".$statusCode;
	}
	log_msg($email,$msg,3,pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
	curl_close($ch);
	return $result;
}
?>
