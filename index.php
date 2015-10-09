<!DOCTYPE html>
<?php
include_once "core/mysql.php";
include_once 'php/login.php';
//error_reporting(0);

session_set_cookie_params(120 * 60);
session_start();

if (!validateUser()) {
    log_entry("not validated user");
<<<<<<< HEAD
    $email = strtolower(getenv("REMOTE_USER"));
    $msg = "Inside validatecurrentUserOrRegister()";
    log_msg($email, $msg, 3, pathinfo($_SERVER['PHP_SELF'], PATHINFO_BASENAME));
    $usr = isValidUser($email);
    //echo '<pre>' . print_r($usr, TRUE) . '</pre>';
    set_session($usr, $email);
    header("Location: index.php");

=======
    if (validateCurrentUserOrRegister()) {
        header("Location: index.php");
    }
>>>>>>> 3e49d3f5cb911c6c1a63f6de86002f7edbbc0ae0
    exit();
}

if (isset($_GET['logoff'])) {
    //$_SESSION = array();
    if (session_id() == "") {
        session_start();
    }


    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]
        );
    }

    session_destroy();
    // Unset all of session variables.
    $_SESSION = array();

    // Delete Cookies by making them inactive
    // Redundant?

    foreach ($_COOKIE AS $key => $value) {
        setcookie($key, $value, time() - 10000, "/SVL6.1/", "osrl-dev.us.oracle.com");
        log_entry("Deleting cookie " . $key . " value :" . $value);
    }
    header("Location: https://login-stage.oracle.com/pls/orasso/orasso.wwsso_app_admin.ls_logout?p_done_url=https://osrl-dev.us.oracle.com", false);
    //exit();
<<<<<<< HEAD
}
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
=======
} 

?>
<html>
 <head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
>>>>>>> 3e49d3f5cb911c6c1a63f6de86002f7edbbc0ae0
        <link rel="shortcut icon" type="image/x-icon" href="_image/favicon.ico"> 
        <link href="_css/osrl.css" rel="stylesheet" type="text/css" />
        <link href="_css/buttons.css" rel="stylesheet" type="text/css" />
        <link href="_css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <title>Oracle ISVe Labs Projects</title>
        <script type="text/javascript" src="_script/jquery.js"></script>
        <script type="text/javascript" src="_script/index.js"></script>
        <script type="text/javascript" src="_script/jquery-ui.js"></script>
        <script>
<<<<<<< HEAD
            getUserRole("<?php echo $_SESSION['email']; ?>");
=======
          getUserRole("<?php echo $_SESSION['email']; ?>");
>>>>>>> 3e49d3f5cb911c6c1a63f6de86002f7edbbc0ae0
        </script>

    </head>
    <body>
<<<<<<< HEAD

=======
       
>>>>>>> 3e49d3f5cb911c6c1a63f6de86002f7edbbc0ae0
        <div id="container" style="height: 480px;">
            <div id="header">
                <img src="_image/OSRL_logo.png" width="265" height="15"
                     alt="Oracle Solaris Remote Lab" />
            </div>
            <div id="cover">&nbsp;</div>
            <div id="alert-box" style="display:none">
                <div id="alert-icon">
                    <img src="_image/dialog-ok.png" />
                </div>
                <div id="alert-title" >
                    <p id="alert-prompt">Hi <?php echo substr($_SESSION['email'], 0, strpos($_SESSION['email'], '@')); ?>! <br> Please select your role:</p>
                </div>
                <div id="alert-desc2" class="alert-desc" style="display:none">
<<<<<<< HEAD
                    <a href="CRAdmin.php">Lab Engineer</a>
                </div>
                <!--<div id="alert-desc3" class="alert-desc" style="display:none">
                    <a href="../../RAL-User/SVL6.1/EndUser.php">End User</a>
                </div>-->
                <div id="alert-desc4" class="alert-desc" style="display:none">
                    <a href="ProjectAdmin.php">ISVe Project Admin</a>
                </div>
                <div id="alert-desc5" class="alert-desc" style="display:none">
                    <a href="god.php">Tool Admin</a>
                </div>


            </div>
        </div>
    </body>

=======
                    <a href="../../RAL-Admin/SVL6.1/CRAdmin.php">Lab Engineer</a>
                </div>
                <div id="alert-desc3" class="alert-desc" style="display:none">
                    <a href="EndUser.php">End User</a>
                </div>
                 <div id="alert-desc4" class="alert-desc" style="display:none">
                    <a href="../../RAL-Admin/SVL6.1/ProjectAdmin.php">ISVe Project Admin</a>
                </div>
                 <div id="alert-desc5" class="alert-desc" style="display:none">
                    <a href="../../RAL-Admin/SVL6.1/god.php">Tool Admin</a>
                </div>
          
        
            </div>
        </div>
    </body>
   
>>>>>>> 3e49d3f5cb911c6c1a63f6de86002f7edbbc0ae0
</html>
