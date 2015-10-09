<?php

$ROOT = " osrl-dev.us.oracle.com/RAL-Admin/SVL6.1/";
include_once "/svl.init.php";
include_once "$ROOT/core/mysql.php";
include_once "$ROOT/php/fetchSK.php";

//define("RAL_DB_HOST","osrl-db-dev");
//define("RAL_DB_USER","osrl_ui2");
//define("RAL_DB_PWD","vlab");
//define("RAL_DB_DATABASE","ui_db2"); 
function usernameTaken($username) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://localhost/SW2/www/api/users");
    $data = array(
        'method' => "alreadyExists",
        'name' => $username
    );

    $data = http_build_query($data);

    $header = array(
        'Content-Length:' => strlen($data)
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "resut:");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $result = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($statusCode == 200) {
        return $result;
    } else {
        return "Error";
    }
}

function isAuthorized($email) {
    /* An Authorized user is one which has been permitted to register on OSRL.
      Entry should exist in AuthorizedTable in DB DevCloudDB_6 */

    $msg = "Validating if User is Authorized to access RAL " . $email;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    try {
        $dbs = new PDO("mysql:host=" . RAL_DB_HOST . ";dbname=" . RAL_DB_DATABASE, RAL_DB_USER, RAL_DB_PWD);
        $msg = $dbs->prepare("Select RegStatus from AuthorizedTable where LOWER(Email) = LOWER(:SSOUserId)");
        $msg->bindParam(':SSOUserId', strtolower($email));
        $msg->execute();
        $result = $msg->fetchAll(PDO::FETCH_ASSOC);
        $count = count($result);

        if ($count >= 1) {
            if ($count != 1) {
                $msg = "Duplicate entry in Authorized table! - retrieving first found user registration status.";
                log_msg($email, $msg, 2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            }
            log_msg($email, "returning from isAuthorized in login.php", 2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            return $result[0]['RegStatus'];
        } else {
            $msg = "Authorization Failure: User attempted to access RAL";
            log_msg($email, $msg, 1, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            return false;
        }
    } catch (PDOException $e) {
        $msg = $e->getMessage();
        log_msg($email, $msg, -1, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
        return false;
    }
}

function isNotValidUser($email) {
    $status = userValidityCheck($email, 0);
    return $status;
}

function isValidUser($email) {
    /* A user is valid only after its registration has completed
      Returns either null if user hasn't registered, or returns the registered ID of user. */

    $status = userValidityCheck($email, 1);

    return $status;
}

function userValidityCheck($email, $isValidValue = 1) {
    $msg = "Validating if user has been on RAL before";
    //echo '<pre>' . RAL_DB_HOST . '</pre>';
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    //echo '<pre>' . $_SERVER['PHP_SELF']. '</pre>';
    try {
        $dbs = new PDO("mysql:host=" . RAL_DB_HOST . ";dbname=" . RAL_DB_DATABASE, RAL_DB_USER, RAL_DB_PWD);
        $stmt = $dbs->prepare("Select * from UserTable where Email= :SSOUserId");
        $stmt->bindParam(':SSOUserId', strtolower($email));
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = count($result);



        if ($count == 0) {

            $msg = "User not created!";
            log_msg($email, $msg, -2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            return null;
        } else {
            $row = $result[0];
            $usr = $row['UserName'];
            if ($count > 1) {
                $msg = "Duplicate entries found";
                log_msg($email, $msg, 2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            }
            return ($isValidValue === 0) ? true : $usr;
        }
    } catch (PDOException $e) {
        $msg = $e->getMessage();
        log_msg($email, $msg, -1, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
        return false;
    }
}

function fetchDetails($email) {
    /*
      Returns either null if user hasn't registered, or returns an array with registered username and UID of user. */
    $msg = "Fetching details for user - " . $email;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    try {
        $dbs = new PDO("mysql:host=" . RAL_DB_HOST . ";dbname=" . RAL_DB_DATABASE, RAL_DB_USER, RAL_DB_PWD);
        $msg = $dbs->prepare("Select * from UserTable where Email= :SSOUserId AND UserStatus != \"Deleted\"");
        $msg->bindParam(':SSOUserId', $email);
        $msg->execute();
        $result = $msg->fetchAll(PDO::FETCH_ASSOC);
        $count = count($result);
        if ($count == 0) {
            $msg = "User Not Registered!";
            log_msg($email, $msg, -2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            return null;
        } else {
            $row = $result[0];
            $usr['username'] = $row['UserName'];
            $usr['id'] = $row['UserId'];
            if ($count > 1) {
                $msg = "Duplicate entries found";
                log_msg($email, $msg, 2, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
            }
            return $usr;
        }
    } catch (PDOException $e) {
        $msg = $e->getMessage();
        log_msg($email, $msg, -1, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
        return false;
    }
}

/**
 * 
 * @return boolean
 */
function validateCurrentUserOrRegister() {

    /*
     * Either Validates current user(by setting appropriate session variables) Or sends user to Register */
    $email = strtolower(getenv("REMOTE_USER"));
    $msg = "Inside validatecurrentUserOrRegister()";
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $usr = isValidUser($email);
    //echo '<pre>' . print_r($usr, TRUE) . '</pre>';
    set_session($usr, $email);
    return true;

/*
    $msg = "User not present in UserTable - new user needs to be created for " . $email;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
   
    $msg = "Is authorized? " . $status;
   // echo '<pre>' . print_r($status, TRUE) . '</pre>';
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    if ($status == false) {
        header('Location: ./unauthorized.html');
        return false;
    } else {
        if ($status === "Unregistered")
        // Send User to register page
            header('Location: ./unauthorized.html');
        if (($status === "Disabled") || ($status === "Expired") || ($status === "Deleted"))
        // Send User to unauthorized page
            header('Location: ./unauthorized.html');
        return false;
    }*/
}

function set_session($username, $email) {
    if (session_id() == "") {
        session_start();
    }
    log_entry("Setting session for " . $username);
    $_SESSION['email'] = $email;
    $_SESSION['usr'] = $username;
    $_SESSION['username'] = $username;
    setcookie('usr', $username);
    setcookie('username', $username);
    setcookie('email', $email);

    session_commit();
    return true;
}

function encrypt($password) {
    $salt = substr($password, 0, 1);
    return crypt($password, $salt);
}

function cp_user($password, $email) {
    $usr = fetchDetails($email);
    $username = $usr['username'];

    log_msg(null, "Checking if user is shared account user or not", 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $shared_user = isSharedAccountUser($username);
    if ($shared_user == true) {
        return false;
    }

    $encryptPass = encrypt($password);
    $dummypass = "blah";
    $ch = curl_init();
    $data = array(
        'method' => "change_pass",
        'username' => $username,
        'encryptpass' => $encryptPass
    );
    $data = http_build_query($data);

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$dummypass");
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $header = array('Content-Length:' => strlen($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

    $url = "http://localhost/SW2/www/api/users/" . $usr['id'];
    $msg = "URL - " . $url;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $msg = "DATA - " . $data;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $msg = "CURL result for chpass user - " . $result;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $msg = "CURL return code for chpass user - " . $statusCode;
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    if ($statusCode == 200) {
        return true;
    } else {
        return false;
    }
}

function validateUser() {
    // session_start();
    // echo '<pre>' . print_r($_SESSION, TRUE) . '</pre>';


    if (isset($_SESSION['usr'])) {
        return true;
    } else {
        //echo '<pre>' . print_r($_SESSION, TRUE) . '</pre>';
        return false;
    }
}

function log_entry($logMessage) {
    $fd = fopen("/tmp/a.log", "a+");
    fprintf($fd, "\n%s", $logMessage);
    fclose($fd);
}

/* FUNCTION log_msg
  Sample function call -->
  log_msg("user@osrl.com","did a boo-boo",3,pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
  Prints only msgs more severe than requested level.
 * **level -1 is max severity, level 5 is least severe.***
  3 --> Debug
  2 --> Non-Critical but needs attention
  1 --> Critical issue. Needs Urgent attention
  -1 --> Error
  -2 --> Compulsory logged notifications
  function log_msg($email=getenv("REMOTE_USER"),$logMessage,$level=0,$logOriginScript=null)
 */

function log_msg($email, $logMessage, $level = 0, $logOriginScript = null) {
    if ($level >= SVL_LOG_LEVEL)
        return;
    $fd = fopen("/tmp/a.log", "a+");
    $currentTime = date('r'); //Current time in RFC2822 format Example: Thu, 21 Dec 2000 16:01:07 +0200	
    //LOG writing format ---> [timestamp] Log level\tuser @ File name : msg 
    //fprintf($fd,"%s", "\n[".$currentTime."] ".$level."\t ".$email." @ ".$logOriginScript." : ".$logMessage);
    $msg = "\n[" . $currentTime . "] " . $level . "\t " . $email . " @ " . $logOriginScript . " : " . $logMessage;
    fprintf($fd, "%s", $msg);
    fclose($fd);
}

/* Function to authenticate access to zone. Given a Zone ID verifies if the currently logged in user owns the zone.
  authenticateAccess('xyz','passwd',804);
  where xyz is the username and 804 is the ZoneID.
  retrns true or false if user has access or not.
 */

function authenticateAccess($username, $passwd = "blah", $id) {
    $result = false;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$passwd");
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $url = "http://localhost/SW2/www/api/machines/" . $id . ";json";
    curl_setopt($ch, CURLOPT_URL, $url);
    log_msg(null, "Inside authenticateAccess..." . $url, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $results = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($statusCode == 200) {
        /* Parse Json to retrieve project ID. */
        $json_machine = json_decode($results, true);
        $projectID = $json_machine["ProjectId"];
        /* Retrieve username from project ID. */
        $ch2 = curl_init();
        curl_setopt($ch2, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch2, CURLOPT_USERPWD, "$username:$passwd");
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, 1);
        $url2 = "http://localhost/SW2/www/api/projects/" . $projectID . ";json";
        curl_setopt($ch2, CURLOPT_URL, $url2);
        $results2 = curl_exec($ch2);
        $statusCode2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
        if ($statusCode2 == 200) {
            /* Parse JSON to retrieve username, compare with session username */
            $json_projs = json_decode($results2, true);
            $retrievedUsernm = $json_projs["UserName"];
            if ($username == $retrievedUsernm) {
                $result = true;
                $msg = "User Authorized for access to VM";
            } else {
                $msg = "User Verification failed!";
            }
        } else {
            $msg = "url:" . $url2 . " Errored: " . $statusCode2;
        }
        curl_close($ch2);
    } else {
        $msg = "url:" . $url . " Errored: " . $statusCode;
    }
    log_msg(null, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    curl_close($ch);
    return $result;
}

?>
