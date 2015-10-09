<?php

require_once '/db.inc.php';

function retrieveSecretKey()
{
	$myFile='/myFile.txt';
	$fh=fopen($myFile,'r');
	$secretKey=trim(fgets($fh));
	fclose($fh);
	return $secretKey;
}
?>
