<!DOCTYPE html>
<?php
include_once "/svl.init.php";
include_once "core/mysql.php";
include_once 'php/login.php';

//error_reporting(0);

session_set_cookie_params(120* 60);
session_start();
//if(!validateUser()){
//log_entry("SVL6.0 not validated user");
//if(validateCurrentUserOrRegister()){
//header("Location: index.php");
//}
//exit();
//} 
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
        <script type="text/javascript" src="_script/admin2.js"></script>
        <script type="text/javascript" src="_script/jquery.tablesorter.min.js"></script> 
        <script type="text/javascript" src="_script/jquery-ui.js"></script>
        <script type="text/JavaScript">

            $(function(){
            init();
            });
        </script>
        <script>
            $(function () {
                $(".datepicker").datepicker();
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
                    Welcome <font style="font-weight: bold<?php echo substr($_SESSION['email'], 0, strpos($_SESSION['email'], '@')); ?>
                    </font>&nbsp;&nbsp;&nbsp;&nbsp; <a class="settings"
                                                       href="javascript:main()"> Home </a> <span class="main"> Home </span><a class="createProject" href="javascript:main()"> Home </a><a class="details" href="javascript:main()"> Home </a><a class="edit" href="javascript:main()"> Home </a><a class="initialDeploy" href="javascript:main()"> Home </a>|
                    <a class="main" name="ChangeRols" href="javascript:settings()">Change Roles</a> <span
                        class="settings"> Change Roles </span><a name="ChangeRols"
                        class="createProject" href="javascript:settings()"> Change Roles </a><a name="ChangeRols"
                        class="details" href="javascript:settings()"> Change Roles </a><a name="ChangeRols"
                        class="edit" href="javascript:settings()"> Change Roles </a><a name="ChangeRols"
                          class="initialDeploy " href="javascript:settings()"> Change Roles </a><span name="ChangeRols">|</span>  <a href="../SVL6.1/_files/OSRL-Guide.pdf" target="_blank"> User Guide</a> |<a id="logoff" href="?logoff">
                        Sign Out</a>
                </h4>
            </div>
            <div id="content">
                <div class="main">
                    <h1>Your Projects</h1>
                    <table>
                        <tr>
                            <th class="table_title" colspan="7" width="700px">
                        <div class="menu">
                     <!--       <span id="templates1">
                                <ul id="nav" class="nav1">
                                    <li title="Deploy New Project"><a id="template_btn" style="cursor: pointer;"
                                                                      onclick="javascript:void window.open('Deploy.php?id=', 'status=1,scrollbars=1,resizable=1');
                                                                              return false;">Deploy New Project&nbsp;</a>
                                    </li>
                                </ul> 
                      
                            </span>-->
                            <span id="buttons">


                                <span id="deployButton" style="margin-left: 8px;"><a id="deploy_btn" class="menu_btn enabled" title="Show Project Details"  onclick="deployProject()" style="font-size: 70%;cursor: pointer;"><img class="filler" src="_image/delete_normal.png"/></a></span>       
                                <span id="showDeleted"  > <a id="show_btn" class="menu_btn enabled" style="font-size: 70%;cursor: pointer;"  title="Show Closed Project" onclick="javascript:showDeletedProjects();"><img class="filler" src="_image/ProjectManagement_Normal_16.png" /> </a></span>
                                <span id="hideDeleted" style="display:none;"> <a id="hide_btn" class="menu_btn enabled" style="font-size: 70%;cursor: pointer;" title="Hide Closed Project" onclick="javascript:hideDeletedProjects();"><img class="filler"  src="_image/ProjectManagement_Normal_16.png" /> </a> </span>
                                <img id="div_temp" src="_image/table_header_divLine.png" />
                            </span>

                        </div>
                        </th>
                        </tr>
                    </table>
                    <table id="instances" class="tablesorter" >

                        <!-- adjust the width to fit the text -->
                        <!--col width="15%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15" /-->

                        <thead> 


                            <tr id="table_header" class="table_header" >
                                <!--th>ID</th-->
                              
                                <th class="col2">Description</th>
                                <th class="col3">Type</th>
                                <th class="col4">Start Date</th>   
                                <th class="col5">End Date</th>
                                <th class="col6">Project Phase</th>
                                <th class="col7">Project Leader</th>
                                <th class="col8">Labtool ID</th>
                                

                                <!--th>CDM</th-->
                            </tr>
                        </thead>
                        <tbody id="tb">


       <!-- table <tr table-empty> -->
                        </tbody>
                    </table>



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

                <div class="details">
                    <h1>Project Detail</h1>
                    <div class="projectdetailsettings">
                        <div id="sub_content" class="sub_content projectdetailsettings">
                            <table id="ProjectDetailTable">
                                <tr>
                                    <th width="170px">Project ID:</th>
                                    <th><span  id="ProjectID" class="details"></span></th>
                                </tr>
                                <tr>
                                    <th>Project Name:</th>
                                    <th><span id="ProjectName" class="details"></span></th>
                                </tr>
                                <tr>
                                    <th>ProjectType:</th> 
                                    <th><span id="ProjectType" class="details"></span></th>
                                </tr>
                                <tr>
                                    <th>Create Date:</th>
                                    <th><span id="ProjectStartDate" class="details"></span></th>
                                </tr>
                                <tr>
                                    <th>End Name:</th>
                                    <th><span id="ProjectEndDate" class="details"></span></th>
                                </tr>

                                <tr>
                                    <th>Status:</th>
                                    <th><span id="ProjectStatus" class="details"></span></th>
                                </tr>


                            </table>
                        </div>
                        <div id="sub_content" class="sub_content">                      
                            <table id="ProjectDetailTable">
                                <tr colspan="2">
                                    Current Users
                                </tr>
                                <tr>
                                    <th width="150px">Leader:</th>
                                    <th><span id="Leader" class="details"></span></th>
                                </tr>
                                <tr>
                                    <th width="100px">Participants:</th>
                                    <th><span id="Users" class="details"></span></th>
                                </tr>
                            </table>

                        </div>
                        <div id="sub_content" class="sub_content">
                            Current Machines
                            <table id="ProjectDetailTable">

                                <tr>
                                    <th><span id="Machines" class="details"></span></th>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>


                <div class="edit">
                    <h1>Project Detail</h1>
                    <div class="projectdetailsettings">
                        <div id="sub_content" class="sub_content">
                            <form id="editform">
                                <table id="ProjectDetailTable">
                                    <tr>
                                        <th width="150px">Project ID:</th>
                                        <th><input  id="ProjectID2" class="edit"></input></th>
                                    </tr>
                                    <tr>
                                        <th>Project Name:</th>
                                        <th><input id="ProjectName2" class="edit"></input></th>
                                    </tr>
                                    <tr>
                                        <th>ProjectType:</th> 
                                        <th><input id="ProjectType2" class="edit"></input></th>
                                    </tr>
                                    <tr>
                                        <th>Create Date:</th>
                                        <th><input id="ProjectStartDate2" class="edit"></input></th>
                                    </tr>
                                    <tr>
                                        <th>End Name:</th>
                                        <th><input id="ProjectEndDate2" class="edit"></input></th>
                                    </tr>

                                    <tr>
                                        <th>Status:</th>
                                        <th><input id="ProjectStatus2" class="edit"></input></th>
                                    </tr>


                                </table>

                        </div>
                        <div id="sub_content" class="sub_content">                      
                            <table id="ProjectDetailTable">
                                <tr colspan="2">
                                    Current Users
                                </tr>
                                <tr>
                                    <th width="150px">Leader:</th>
                                    <th><input id="Leader2" class="edit"></input></th>
                                </tr>
                                <tr>
                                    <th width="100px">Participants:</th>
                                    <th><input id="Users2" class="edit"></input></th>
                                </tr>
                            </table>

                        </div>
                        <div id="sub_content" class="sub_content">
                            Current Machines
                            <table id="ProjectDetailTable">

                                <tr>
                                    <th><input id="Machines2" class="edit"></input></th>
                                </tr>
                            </table>

                        </div>
                        <input type="button" ID="EditButton"
                               value="Commit"
                               onclick="javascript:showDeletion();" ></input>
                        </form>
                    </div>
                </div>

                <div class="createProject">
                    <h1>Create a Project</h1>
                    <div class="projectdetailsettings">
                        <div id="sub_content" class="sub_content">
                            <form>
                                <table id="ProjectDetailTable">
                                    <tr>
                                        <th>Twiki URL:</th>
                                        <th><input type="text" id="Twiki" oninput="javascript:requestTwiki();"/></th>
                                    </tr>
                                    <tr>
                                        <th>Project Description</th>
                                        <th><textarea type="text" id="PDesc" rows="4" cols="28"></textarea></th>
                                    </tr>
                                    <tr>
                                        <th>Project Start Date</th>
                                        <th><div><input type="text" class="datepicker" id="PSDate"/></div></th>
                                    </tr>
                                    <tr>
                                        <th>Project End Date</th>
                                        <th><div><input type="text" class="datepicker" id="PEDate"/></div></th>
                                    </tr>
                                    <tr>
                                        <th>Leader Engineer</th>
                                        <th><input type="text" id="PLEng"/></th>
                                    </tr>
                                    <tr>
                                        <th>Project Goal</th>
                                        <th><input type="text" id="Goal"/></th>
                                    </tr>
                                    <tr>
                                        <th>Keywords</th>
                                        <th><input type="text" id="Keywords"/></th>
                                    </tr>
                                    <tr>
                                        <th>Hardware Requirement</th>
                                        <th><input type="text" id="Hardware"/></th>
                                    </tr>
                                    <tr>
                                        <th>Lab Reservation ID</th>
                                        <th><input type="text" id="PLID"/></th>
                                    </tr>
                                    <tr>
                                        <th>Hardware</th>
                                        <th><table id='mtable'></table></th>

                                    </tr>
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




                                </table>
                                <input type="button" ID="CreateButton"
                                       value="Create Project"></input>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
<!--
            <div class="sidebar_T" id="sidebarS_T">
                <span class="sidetitle">Status</span>
            </div>
            <!-- changed to fit projects count for now -->
            <!-- count the no. of projects -->
       <!--     <ul class="status_list sidebar_B" id="sidebarS_B">
                <span class="vm_type">Current Projects</span><span id="vmCount"
                                                                   class="vm_num"></span>

            </ul>

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
-->
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
                <div id="projectid" style="display:none;"><?php echo $_SESSION['id']; ?></div>
                <input id="instancestatus" style="display:none;"></input>
            </div>
        </div>
    </body>
</html>
