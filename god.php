<!DOCTYPE html>
<?php
include_once "/svl.init.php";
include_once "core/mysql.php";
include_once 'php/login.php';
//include_once 'php/user.php';
//error_reporting(0);

session_set_cookie_params(120 * 60);
session_start();


if ($_SESSION['email'] == null) {

    header("Location: Expire.php", false);
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
    //Unset all of session variables.
    $_SESSION = array();

    // Delete Cookies by making them inactive
    // Redundant?

    foreach ($_COOKIE AS $key => $value) {
        setcookie($key, $value, time() - 10000, "/SVL6.1/", "osrl-dev.us.oracle.com");
        log_entry("Deleting cookie " . $key . " value :" . $value);
    }
    header("Location: https://login-stage.oracle.com/pls/orasso/orasso.wwsso_app_admin.ls_logout?p_done_url=https://osrl-dev.us.oracle.com", false);
    //exit();
}
?>


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="shortcut icon" type="image/x-icon" href="_image/favicon.ico"> 
        <link href="_css/osrl.css" rel="stylesheet" type="text/css" />
        <link href="_css/buttons.css" rel="stylesheet" type="text/css" />
        <link href="_css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <title>Oracle ISVe Labs Projects</title>
        <script type="text/javascript" src="_script/jquery.js"></script>
        <script type="text/javascript" src="_script/God.js"></script>
        <script type="text/javascript" src="_script/jquery.tablesorter.min.js"></script> 
        <script type="text/javascript" src="_script/jquery-ui.js"></script>
        <script type="text/JavaScript">
            $(function(){
                checkUserRole();
            });
        </script>


    </head>
    <body>
   


        <div id="container">
            <div id="header">
                <img src="_image/OSRL_logo.png" width="265" height="15"
                     alt="Oracle ISVe Labs Projects" />
                <h4>
                    Welcome <font style="font-weight: bold;"><?php echo substr($_SESSION['email'], 0, strpos($_SESSION['email'], '@')); ?>
                    </font>&nbsp;&nbsp;&nbsp;&nbsp; <a class="settings"
                                                       href="javascript:main()"> Home </a> <span class="main"> Home </span><a class="createProject" href="javascript:main()"> Home </a><a class="details" href="javascript:main()"> Home </a><a class="edit" href="javascript:main()"> Home </a><a class="initialDeploy" href="javascript:main()"> Home </a>|
                    <a class="main" href="javascript:settings()">Change Roles</a> <span
                        class="settings"> Change Roles </span><a
                        class="createProject" href="javascript:settings()"> Change Roles </a><a
                        class="details" href="javascript:settings()"> Change Roles </a><a
                        class="edit" href="javascript:settings()"> Change Roles </a><a
                        class="initialDeploy " href="javascript:settings()"> Change Roles </a>|  <a href="../SVL6.1/_files/OSRL-Guide.pdf" target="_blank"> User Guide</a> |<a id="logoff" href="?logoff">
                        Sign Out</a>
                </h4>
            </div>
            <div id="god-content" >
                <div class="main">
                    <h1>Manage ISVe Labs Interface Roles</h1>
                    <div style="padding-top: 10px;padding-left: 20px;"><b>SSO User to Manage</b> <input style="margin-left: 10px;width:250px" id = "RetrievePara" type="field"></input> <input type="button" style="margin-left: 10px;" class="btn" value="Retrieve Role" onclick="RetrieveRole();"></input></div>
                    <div style="padding-top: 10px;padding-left: 147px;">
                        <input type="checkbox" id="MA" name="role" value="MasterAdmin" style="width:30px;vertical-align: middle;"><div class="check-btn">Master Administrator</div><br>  
                        <input type="checkbox" id="IA" class="check-btn" name="role" value="ISVeAdmin" style="width:30px;margin-top: 10px;border:1px;vertical-align: middle;"><div class="check-btn" style="margin-top: 8px;">ISVe Administrator</div><br>
                        <input type="checkbox" id="CR" class="check-btn" name="role" value="CR" style="width:30px;margin-top: 10px;vertical-align: middle;"><div class="check-btn" style="margin-top: 8px;">CR Engineer</div><br>
                        <input type="checkbox" id="EU" class="check-btn" name="role" value="EndUser" style="width:30px;margin-top: 10px;vertical-align: middle;"><div class="check-btn" style="margin-top: 8px;">End User</div><br>
                        <input type="checkbox" id="LE" class="check-btn" name="role" value="EndUser" style="width:30px;margin-top: 10px;vertical-align: middle;"><div class="check-btn" style="margin-top: 8px;">Lead Engineer</div><br>
                    </div>
                    <hr style="margin-top: 40px;"></hr>
                    <input class='btn' style=" margin-top:10px;"  type='button' value='Save' onclick="javascript:Save();"/>
                    <input class='btn' style=" margin-top:10px; margin-left:10px;" type='button' value='Save and Close' onclick="javascript:SaveClose();"/>
                    <input class='btn' style=" margin-top:10px; margin-left:10px;" type='button' value='Cancel' onclick="javascript:Cancel();"/>
                </div>




                <div class="settings">
                    <h1>Account Settings</h1>
                    <div id="sub_content" class="sub_content">
                        <div id="title">Change Roles</div>
                        <div id="noRoletoChange" style="display:none"> You can't change to the other roles</div>
                        <div id="RoleChange" style="margin-bottom: 7px;display:none">You can change to the following roles:</div>
                        <div id="alert-desc2" class="alert-desc" style="display:none">
                            <a href="CRAdmin.php">Lab Engineer</a>
                        </div>
                        <!-- <div id="alert-desc3" class="alert-desc" style="display:none">
                            <a href="../../RAL-User/SVL6.1/EndUser.php">End User</a>
                        </div> -->
                        <div id="alert-desc4" class="alert-desc" style="display:none">
                            <a href="ProjectAdmin.php">ISVe Project Admin</a>
                        </div>
                        <div id="alert-desc5" class="alert-desc" style="display:none">
                            <a href="god.php">Tool Admin</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sidebar_T" id="sidebarR_T">
                <span class="sidetitle">Resources</span>
            </div>
            <ul class="resource_list">
                <li><a
                        href="http://twiki.us.oracle.com/" target="_blank">Twiki Link</a>
                </li>
                <li><a href="../_files/OSRL-Guide.pdf" target="_blank">User Guide</a></li>
                <li><a href="http://my.oracle.com/myhelp/index.html" target="_blank">File a Service Request</a></li>
            </ul>
            <div class="sidebar_B" id="sidebarR_B">
                <span class="sidetitle">&nbsp;</span>
            </div>



            <div id="cover" class="alert logoff upload download">&nbsp;</div>
            <div id="alert-box" class="alert">
                <div id="alert-icon"></div>
                <div id="alert-title">
                    <p id="alert-prompt"></p>
                    <p id="alert-vm-id"></p>
                    <p id="alert-vm-type"></p>
                </div>
                <div id="alert-desc">
                    <p></p>
                </div>
                <div id="alert-action">
                    <input type="button" id="btn2" /> <input type="button" id="btn1" />
                </div>
            </div>

            <div id="alert-box" class="logoff">
                <div id="alert-icon"><img src="_image/dialog-warning.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Sign Out</p>
                </div>
                <div id="alert-desc">
                    <p>Please wait, your are being logged off.</p>
                </div>
            </div>

            <div id="alert-box" class="upload">
                <div id="alert-icon"><img src="_image/dialog-ok.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Upload File</p>
                </div>
                <div id="alert-desc">
                    <form id="upload" enctype="multipart/form-data" target="sgdUpload" method="post" action="https://osrl-display.oracle.com/sgd/uploadservlet">
                        <div style="margin-bottom:.5em;">
                            <label style="width:5em; float:left; text-align:right; display:block;" for="username">Username: </label>
                            <input id="username" type="text" name="username" value="<?php echo $_SESSION['usr'] ?>" disabled>
                        </div>
                        <div style="margin-bottom:.5em;">
                            <label style="width:5em; float:left; text-align:right; display:block;" for="password">Password: </label>
                            <input id="uploadPassword" type="password" name="password">
                        </div>
                        <div style="margin-bottom:.5em;">
                            <label style="margin:auto; width:5em; float:left; text-align:right; display:block;" for="filename">File: </label>
                            <input style="height:1.8em; display:none;" id="uploadFilename" type="file" name="filename">
                            <input id="fakeFilename" type="text" name="fakeFilename">
                            <input id="fakeFilename" type="button" value="..." style="width:1.5em;"/>
                        </div>
                        <div class="err"></div>
                        <p>File will be uploaded to the /data directory. Upload will be cancelled if you leave or refresh the page before the upload completes.</p>
                        <span class="sf-instruct"> <br />
                            <div id="alert-action">
                                <input type="button" name="cancel" value="Cancel"
                                       onClick="javascript:clearUpload()" /> <input type="button"
                                       name="commit" value="Upload"
                                       onClick="javascript:requestFileUpload();" />
                            </div> </span>
                    </form>
                </div>
            </div>

            <div id="alert-box" class="download">
                <div id="alert-icon"><img src="_image/dialog-ok.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Download File</p>
                </div>
                <div id="alert-desc">
                    <form id="download" target="downloadWindow(this)" method="post" action="https://osrl-display.oracle.com/sgd/requestDownload">
                        <div style="margin-bottom:.5em;">
                            <label style="width:5em; float:left; text-align:right; display:block;" for="username">Username: </label>
                            <input id="username" type="text" name="username" value="<?php echo $_SESSION['usr'] ?>" disabled>
                        </div>
                        <div style="margin-bottom:.5em;">
                            <label style="width:5em; float:left; text-align:right; display:block;" for="password">Password: </label>
                            <input id="downloadPassword" type="password" name="password">
                        </div>
                        <div style="margin-bottom:.5em;">
                            <label style="width:5em; float:left; text-align:right; display:block;" for="fileName">File Name: </label>
                            <input id="fileName" type="text" name="fileName">
                        </div>
                        <div class="err"></div>
                        <p>File must be located in the /data directory. Download will be cancelled if you leave or refresh the page before the download completes.</p>
                        <span class="sf-instruct"> <br />
                            <div id="alert-action">
                                <input type="button" name="cancel" value="Cancel"
                                       onClick="javascript:clearDownload()" /> <input type="button"
                                       name="commit" value="Download"
                                       onClick="javascript:requestFileDownload();" />
                            </div> </span>
                    </form>
                </div>
            </div>

            <div id="footer">
                <p>&nbsp;</p>
                <div id="currentuser" style="display:none;"><?php echo $_SESSION['email']; ?></div>
                <input id="instancestatus" style="display:none;"></input>
            </div>
        </div>
    </body>
</html>