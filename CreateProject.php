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

        <link href="_css/buttons.css" rel="stylesheet" type="text/css" />
        <link href="_css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        <link href="_css/osrl.css" rel="stylesheet" type="text/css" />
        <title>Oracle ISVe Labs Projects</title> 
        <script type="text/javascript" src="_script/jquery.js"></script>
        <script type="text/javascript" src="_script/ProjectList.js"></script>
        <script type="text/javascript" src="_script/jquery.tablesorter.min.js"></script> 
        <script type="text/javascript" src="_script/jquery-ui.js"></script>
        <script type="text/JavaScript">
            $(function(){
            getUserName();
            });
        </script>

    </head>
    <body>
  
        <iframe id="sgd" style="height: 1px; width: 1px"></iframe>
        <iframe id="sgdUpload" name="sgdUpload" onload="clearProgress()" style="height: 1px; width: 1px"></iframe>
        <div id="container">
            <div id="header">
                <img src="_image/OSRL_logo.png" width="265" height="15"
                     alt="Oracle ISVe Labs Projects" />
                <h4>
                    Welcome <font style="font-weight: bold;"><span id="user"> </span> 
                    </font>&nbsp;&nbsp;&nbsp;&nbsp; <a class="settings"
                                                       href="javascript:main()"> Home </a> <span class="main"> Home </span><a class="createProject" href="javascript:main()"> Home </a><a class="details" href="javascript:main()"> Home </a><a class="edit" href="javascript:main()"> Home </a><a class="initialDeploy" href="javascript:main()"> Home </a>| <a id="logoff" href="?logoff">
                        Sign Out</a>
                </h4>
            </div>
            <div id="content" style="height:auto;width:90%">
                <h1>Create New Project</h1>
                <hr></hr>
                <p style="font-size:12px;margin-top:2px;"> You can use the data from Twiki and ISVe Labtool by inputing the Twiki URL of the specific project.</p>
                <table class="ProjectDetailTable">
                    <tr>
                        <th style="width:155px"><b>Twiki URL  </b></th>
                        <th><input type="text"  id="Twiki" onchange="javascript:requestTwiki();"/> <span style="margin-bottom:3px;"><input class='btn'  style="margin-right:120px;float:right" type='button' value='Search for a Twiki' onclick="javascript:goToTwiki();" /></span></th></th>

                    </tr>
                </table>
                <div class="projectdetailsettings">
                    <p style="font-size:12px;margin-top:2px;"> The data retrieved from twiki and labtool follows:</p>

                    <hr></hr>
                    <b> Project Details</b>

                    <table id="ProjectDetailTable" class="ProjectDetailTable">


                        <tr>
                            <th><b>Project Name</b></th>
                            <th><input type="text" id="ProjectName" title="Source:Twiki" disabled/></th>
                        </tr>
                        <tr>
                            <th><b>Project Description</b></th>
                            <th><textarea type="text" id="ProjectDescription" rows="4"  title="Source:Twiki" disabled ></textarea></th>
                        </tr>
                        <tr>
                            <th><b>Project Type</b></th>
                            <th><input type="text" id="ProjectType" title="Source:Twiki" disabled></input>
                                </th>
                        </tr>
                          <tr>
                            <th><b>Project Phase</b></th>
                            <th><input type="text" id="ProjectStatus" title="Source:Twiki" disabled></input>
                                </th>
                        </tr>
                        <tr>
                            <th><b>Project Start Date </b></th>
                            <th><div><input title="Source:Labtool" type="text" class="datepicker" id="ProjectStartDate" disabled /></div></th>
                        </tr>
                        <tr>
                            <th><b>Project End Date </b></th>
                            <th><div><input title="Source:Labtool" type="text" class="datepicker" id="ProjectEndDate" disabled/></div></th>
                        </tr>
                        <tr>
                            <th><b>ISVe Lead Engineer</b></th>
                            <th><input title="Source:Labtool" type="text" id="ProjectLeader" disabled/></th>
                        </tr>
                       
                      </table>
                    <hr></hr>
                    <b style="margin-top:5px">Hardware Info</b>
                    <table id="ProjectMachineTable">

                         <tr>
                            <th style="width:155px"><b>ISVe Lab ID</b></th>
                            <th><input title="Source:Labtool" type="text" id="LabtoolProjectId" disabled/></th>
                        </tr>    
                    
                        <tr>
                            <th ><b>VLAN ID</b></th>
                            <th><input title="Source:Labtool"  type="text" id="vlanId" disabled/></th>
                        </tr> 
                             
                          
                    </table>




                    <table id='mtable'class="selectable" title="Source:Labtool" >
                      <!--  <tr>
                            <td id="CreateProjectMachinesTableTitle" colspan="7">
                                <div> <span id="buttons">
                                        <a id="add_btn" class="menu_button enabled"  title="Add a new Machine to project" onclick="javascript:addCreateProjectMachine();" style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Add </a>
                                        <a id="delete_btn2" class="menu_btn enabled" title="Delete Machine" onclick="deleteEntry()" style="cursor: pointer;"><img class="filler" src="_image/delete_normal.png" /> Delete </a> 
                                        <a id="apply_btn" class="menu_button enabled"  title="Apply the Change" onclick='createProjectSubmitMachine()' style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Apply </a> 
                                    </span>
                                </div>
                            </td>
                        </tr> -->
                        <tr class="table_header_for_create_project_table" >
                            <!--th>ID</th-->
                  
                            <td>Type</td>
                            <td>ID</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td>SP Address</td>
                            <td>Machine IP</td>
                            <td>Hostname</td>
                            <td>OS Type</td>
                         <!--    <td>Machine SP</td>-->
                        </tr>
                        <tr id="empty_tr" ><td colspan="8">There is no machines currently. </td> </tr> 
                    </table>
                    <table id='tempmachinetable'></table>



                    <hr id="div_machine"></hr>
                    <b >Authorized Users</b>
                    <p style="font-size:10px;margin-top:2px;">To Add or Delete users from the list, edit the labtool entry.</p>

                    <table style="margin-top:15px;" id="CreateProjectUsersTable" class="selectable" title="Source:Labtool" >
                    <!--    <tr>
                            <td id="CreateProjectUsersTableTitle" colspan="2">
                                <div> <span id="buttons">
                                        <a id="add_btn" class="menu_button enabled"  title="Add a new user to project" onclick="javascript:addCreateProjectUser();" style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Add </a> 
                                     
                                        <a id="delete_btn" class="menu_btn enabled" title="Delete User" onclick="deleteEntry()" style="cursor: pointer;"><img class="filler" src="_image/delete_normal.png" /> Delete </a> 
                                        <a id="apply_btn" class="menu_button enabled"  title="Apply the Change" onclick='createProjectSubmitUser()'style="cursor: pointer;"><img class="filler" src="_image/edit_normal.png" /> Apply </a> 
                                    </span></div>
                            </td>
                        </tr>-->




                        <tr class="table_header_for_create_project_table" >
                            <!--th>ID</th-->
                            <td width="200px">User Name</td>
                            <td>Email</td>


                        </tr>
                        <tr id="empty_tr_user" ><td colspan="2">There is no users currently. </td> </tr>


       <!-- table <tr table-empty> -->

                    </table>
                    <table id='tempusertable'></table>

            <!--<tr>
                <th><span style="padding-left:30px;"><span>Machine Name</th>
               <th><input type="text" id="Mname"/></th>
           </tr>
            <tr>
                <th><span style="padding-left:30px;"><span>Machine ID</th>
               <th><input type="text" id="MID"/></th>
           </tr>
    
           <tr>
                <th><span style="padding-left:30px;"><span>Status</th>
               <th><input type="text" id="MStatus"/></th>
           </tr>
            <tr>
                <th><span style="padding-left:30px;"><span>Machine Start</th>
               <th><input type="text" id="MStart"/></th>
           </tr>
           <tr>
                <th><span style="padding-left:30px;"><span>Machine End</th>
               <th><input type="text" id="MEnd"/></th>
           </tr>-->





                    <input class='btnGray' style=" margin-top:10px;"  type='button' value='Create' onclick="javascript:CreateProject();"/>
                    <input class='btnGray' style=" margin-top:10px; margin-left:10px;" type='button' value='Clear' onclick="javascript:Clear();"/>
                    <input class='btnGray' style=" margin-top:10px; margin-left:10px;" type='button' value='Cancel' onclick="javascript:Cancel();"/>
                    </form>


                </div>

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
                <div id="projectid" style="display:none;"><?php echo $_GET['id'] ?></div>
                <div id="projecttype" style="display:none;"><?php echo $_GET['projecttype'] ?></div>
                  <div id="refreshlog" style="display:none;"></div>
                  <div id="detaillog" style="display:none;"></div>
            </div>
        </div>
    </body>
</html>


