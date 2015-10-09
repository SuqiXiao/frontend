<!DOCTYPE html>
<?php
include_once "/svl.init.php";
include_once "core/mysql.php";
include_once 'php/login.php';

//error_reporting(0);

session_set_cookie_params(120 * 60);
session_start();
if (!validateUser()) {
    log_entry("not validated user");
    if (validateCurrentUserOrRegister()) {
        header("Location: index.php");
    }
    exit();
}
if ($_SESSION['usr'] == null) {

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
        <script type="text/javascript" src="_script/admin2.js"></script>
        <script type="text/javascript" src="_script/jquery.tablesorter.min.js"></script> 
        <script type="text/javascript" src="_script/jquery-ui.js"></script>
        <script type="text/JavaScript">
            $(function(){
            getUserName();
            checkUserRoleforDeploy();
              
            });
        </script>

    </head>
    <body>
        <iframe id="sgdSetup" style="height: 1px; width: 1px"
                src="https://osrl-sgd-gtw-dev.us.oracle.com/<?php echo (strlen($_SESSION['vlanId']) == 3) ? "vlan" . strval($_SESSION['vlanId'] - 500) : $_SESSION['vlanId']; ?>">
        </iframe>
        <iframe id="sgd" style="height: 1px; width: 1px"></iframe>
        <iframe id="sgdUpload" name="sgdUpload" onload="clearProgress()" style="height: 1px; width: 1px"></iframe>
        <div id="container">
            <div id="header">
                <img src="_image/OSRL_logo.png" width="265" height="15"
                     alt="Oracle ISVe Labs Projects" />
                <h4>
                    Welcome <font style="font-weight: bold;"><span id="user"> </span> 
                    </font>&nbsp;&nbsp;&nbsp;&nbsp; <a class="settings"
                                                       href="javascript:main()"> Home </a> <span class="main"> Home </span><a class="createProject" href="javascript:main()"> Home </a><a class="details" href="javascript:main()"> Home </a><a class="edit" href="javascript:main()"> Home </a><a class="initialDeploy" href="javascript:main()"> Home </a>|  <a href="../SVL6.1/_files/OSRL-Guide.pdf" target="_blank"> User Guide</a> | <a id="logoff" href="?logoff">
                        Sign Out</a>
                </h4>
            </div>
            <div id="content" style="width:90%" >
               <h1>Project <?php echo isset($_GET['labtoolID']) ? ($_GET['labtoolID']):(null) ?></h1>

                <div id="sub_content" >
                    <form>
                        <table id="InitialDeployTable"> 

                            <tr>
                                <th><b >Project twiki URL</b></th>
                                <th ><span  title="Source:Local Database"><a type="text" style="cursor:pointer" id="PId" onclick="hrefTwiki()" > </a></span> <span style="margin-bottom:2px;"><input class='btn'  style="margin-right:21px;float:right" type='button' value='Refresh' onclick="refresh();"/></span></th>

                            </tr>
                            <tr>
                                <th><b>Project Name</b></th>
                                <th><input type="text" title="Source:Twiki" id="ProjectName" class="changeinput" disabled/></th>
                            </tr>
                            <tr>
                                <th><b>Project Description</b></th>
                                <th><textarea type="text"  title="Source:Twiki"  id="ProjectDescription" rows="4" disabled ></textarea></th>
                            </tr>
                            <tr>
                                <th><b>Project Phase</b></th>
                                <th><input id="ProjectStatus"  title="Source:Twiki"  type="text" disabled></input> </th>
                            </tr>
                            <tr>
                                <th><b>Project Type</b></th>
                                <th><input type="text"  title="Source:Twiki"  id="ProjectType"  disabled/></th>
                            </tr>
                            <tr>
                                <th><b>Project Start Date</b></th>
                                <th><div><input type="text"  title="Source:Labtool"  class="datepicker" id="ProjectStartDate" disabled/></div></th>
                            </tr>
                            <tr>
                                <th><b>Project End Date </b></th>
                                <th><div><input type="text"  title="Source:Labtool" class="datepicker" id="ProjectEndDate"  disabled/></div></th>
                            </tr>
                            <tr>
                                <th><b>Lead Engineer</b></th>
                                <th><input type="text"  title="Source:Labtool" id="ProjectLeader" disabled/></th>
                            </tr>
                            <tr>
                                <th style="width:205px;"><b>External Project ID</b></th>
                                <th><a type="text" id="LabtoolProjectId"  title="Source:Labtool" onclick="hrefLabtool()" style="cursor:pointer"></a></th>
                            </tr>
                            <tr>
                                <th><b>Vlan ID</b></th>
                                <th><input type="text"  title="Source:Labtool" id="vlanId"  disabled/></th>
                            </tr>
                        </table>
                        <hr></hr>
                        <h1>Hardware Info</h1>
                        <table id='mtable'class="selectable"  title="Source:Labtool">
                       <!--  <tr>
                             <td id="CreateProjectMachinesTableTitle" colspan="7">
                                 <div> <span id="buttons">
                                         <a id="add_btn" class="menu_button enabled"  title="Add a new Machine to project" onclick="javascript:addCreateProjectMachine();" style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Add </a> 
                                       
                                         <a id="delete_btn" class="menu_btn enabled" title="Delete Machine" onclick="deleteEntry()" style="cursor: pointer;"><img class="filler" src="_image/delete_normal.png" /> Delete </a> 
                                         <a id="apply_btn" class="menu_button enabled"  title="Apply the Change" onclick='createProjectSubmitMachine()' style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Apply </a> 
                                     </span>
                                 </div>
                             </td>
                         </tr>-->
                            <tr class="table_header_for_create_project_table" >
                                <!--th>ID</th-->
                                <td>Type</td>
                                <td>ID</td>
                                <td>Start Date</td>
                                <td>End Date</td>
                                <td>SP Address</td>
                                <td>Machine IP</td>
                                <td>Hostname</td>
                                <td>OS type</td>
                            </tr>
                            <tr id="empty_tr1" ><td colspan="8">There is no machines currently. </td> </tr> 
                        </table>
                        <br></br>
                        <!--<input type="button" ID="DeployOnInternet" class="btnGray"
                               value="Deploy on Internet" onclick="javascript:deployoninternet();"></input>-->
                        <!--<input type="button" ID="Deploy" class="btnGray"
                               value="Deploy on Internal Network" onclick="javascript:deployoninternalnetwork();"></input>-->
                    </form>
                </div>
            </div>

   <div id="cover" class="alert password deletion deleteSplash logoff upload download">&nbsp;</div>
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

            <div id="alert-box" class="deletion">
                <div id="alert-icon"><img src="_image/dialog-error.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Delete Account</p>
                </div>
                <div id="alert-desc">
                    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                </div>
                <div id="alert-action">
                    <input type="button" name="cancel" value="Cancel"
                           onClick="javascript:hideDeletion()" /> 
                    <input type="button"
                           name="delete" value="Delete"
                           onClick="javascript:requestAccountDeletion();" />
                </div>
            </div>

            <div id="alert-box" class="deleteSplash">
                <div id="alert-icon"><img src="_image/dialog-error.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Delete Account</p>
                </div>
                <div id="alert-desc">
                    <p>Please wait, your account is being deleted. You will be logged off once deletion has completed.</p>
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
                    <form id="upload" enctype="multipart/form-data" target="sgdUpload" method="post" action="https://osrl-sgd-gtw-dev.us.oracle.com/sgd/uploadservlet">
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
                        <p>File will be uploaded to the /data directory. Upload will be canceled if you leave or refresh the page before the upload completes.</p>
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
                    <form id="download" target="downloadWindow(this)" method="post" action="https://osrl-sgd-gtw-dev.us.oracle.com/sgd/requestDownload">
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
                        <p>File must be located in the /data directory. Download will be canceled if you leave or refresh the page before the download completes.</p>
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

            <div id="alert-box" class="password">
                <div id="alert-icon"><img src="_image/dialog-warning.png" /></div>
                <div id="alert-title">
                    <p id="alert-prompt">Change Password</p>
                </div>
                <div id="alert-desc">
                    <!--  <form id="change-password">-->

                    <label class="sf-lbl" for="password1"> New Password: </label> <input
                        type="password" id="password1" name="password1"
                        title=" Please enter a Password" value="" maxlength="255"
                        class="sf-pwdbox" /> <br /> <br /> <label class="sf-lbl"
                        for="password2"> Repeat Password: </label> <input type="password"
                        id="password2" name="password2" title=" Please enter a Password"
                        value="" maxlength="255" class="sf-pwdbox" />
                    <div class="err"></div>
                    <span class="sf-instruct"> <br />
                        <div id="alert-action">
                            <input type="button" name="commit" value="Cancel"
                                   onClick="javascript:hidePassword()" /> <input type="button"
                                   name="commit" value="Update"
                                   onClick="javascript:requestPasswordVerification();" />
                        </div> </span>
                    <!-- </form>-->
                </div>
            </div>

            <div id="footer">
                <p>&nbsp;</p>
                <div id="currentuser" style="display:none;"><?php echo $_SESSION['usr']; ?></div>
                <div id="projectid" style="display:none;"><?php echo isset($_GET['id']) ? ($_GET['id']) : (null) ?></div>
                 <div id="refreshlog" style="display:none;"></div>
                  <div id="detaillog" style="display:none;"></div>
            </div>
        </div>
    </body>

</html>


