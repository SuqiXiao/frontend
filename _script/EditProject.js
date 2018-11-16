var alertType = {
    INIT: 0,
    SPLASH: 1,
    SUCCESS: 2,
    FAILURE: 3,
    ERR: 4
};
var alertIcon = {
    ERROR: {path: "<img src=\"_image/dialog-error.png\" />"},
    WARNING: {path: "<img src=\"_image/dialog-warning.png\" />"},
    OK: {path: "<img src=\"_image/dialog-ok.png\" />"}
};
var alertBtn = {
    OK_CANCEL: {btn1: "Ok", btn2: "Cancel"},
    RETRY_CLOSE: {btn1: "Retry", btn2: "Close"},
    CLOSE: {btn1: "Close", btn2: null},
    NONE: null
};
var VM = {};
var TEMPLATE = {};
var FUNCTION = {
    NO_VM: {
        ALERT: {
            INIT: {
                icon: alertIcon.WARNING,
                title: "No Virtual Machine selected. Please select a Virtual Machine.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            }
        },
        text: null
    },
    PROJECT_REFRESH: {
        ALERT: {
            SPLASH: {
                icon: alertIcon.OK,
                title: "Refreshing",
                showId: false,
                showInstType: false,
                desc: "Syncing up with Twiki and Labtool...",
                btn: alertBtn.NONE
            },
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to update the infomation right now.",
                showId: false,
                showInstType: false,
                desc: "Please try again later or contact the system admin.",
                btn: alertBtn.CLOSE
            },
            SUCCESS: {
                icon: alertIcon.OK,
                title: "Successfully refreshed the page",
                showId: false,
                showInstType: false,
                desc: "The info is up-to-date now",
                btn: alertBtn.NONE
            },
            ERR: {
                icon: alertIcon.ERROR,
                title: "Unable to refresh the page right now.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            },
        }
    },
    PROJECT_DETAIL: {
        ALERT: {
            ERR: {
                icon: alertIcon.ERROR,
                title: "Unable to get the project details right now.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            },
        }
    },
    DEPLOY: {
        ALERT: {
            ERR: {
                icon: alertIcon.ERROR,
                title: "Unable to set up the SGD server right now.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            },
            SUCCESS: {
                icon: alertIcon.OK,
                title: "Successfully set up the SGD server.",
                showId: false,
                showInstType: false,
                desc: "The machines are ready to use now.",
                btn: alertBtn.NONE
            }
        }
    },
    VM_CREATE: {
        ALERT: {
            INIT: {
                icon: alertIcon.WARNING,
                title: "Create Virtual Machine",
                showId: false,
                showInstType: true,
                desc: "Are you sure you want to create a new Virtual Machine?",
                btn: alertBtn.OK_CANCEL
            },
            SPLASH: {
                icon: alertIcon.OK,
                title: "Creating Virtual Machine",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.NONE
            },
            SUCCESS: null,
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to create Virtual Machine.",
                showId: false,
                showInstType: false,
                desc: "The system administrator has been notified by email.",
                btn: alertBtn.RETRY_CLOSE
            },
            ERR: {
                icon: alertIcon.ERROR,
                title: "Unable to create Virtual Machine. Max Number of Virtual Machines already reached.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            }
        },
        MENU_BUTTON: {
            REBOOT: false,
            DELETE: false,
            SGD: false,
            CDM: false
        },
        text: null
    },
    VM_DELETE: {
        ALERT: {
            INIT: {
                icon: alertIcon.WARNING,
                title: "Delete Virtual Machine?",
                showId: true,
                showInstType: true,
                desc: "This action cannot be undone.",
                btn: alertBtn.OK_CANCEL
            },
            SPLASH: {
                icon: alertIcon.OK,
                title: "Deleting Virtual Machine",
                showId: true,
                showInstType: true,
                desc: null,
                btn: alertBtn.NONE
            },
            SUCCESS: null,
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to delete Virtual Machine.",
                showId: true,
                showInstType: true,
                desc: "The system administrator has been notified by email.",
                btn: alertBtn.RETRY_CLOSE
            }
        },
        MENU_BUTTON: {
            REBOOT: false,
            DELETE: true,
            SGD: false,
            CDM: false
        },
        text: "delete"
    },
    VM_REBOOT: {
        ALERT: {
            INIT: {
                icon: alertIcon.WARNING,
                title: "Reboot Virtual Machine?",
                showId: true,
                showInstType: true,
                desc: "",
                btn: alertBtn.OK_CANCEL
            },
            SPLASH: {
                icon: alertIcon.OK,
                title: "Rebooting Virtual Machine",
                showId: true,
                showInstType: true,
                desc: null,
                btn: alertBtn.NONE
            },
            SUCCESS: null,
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to reboot Virtual Machine.",
                showId: true,
                showInstType: true,
                desc: "The system administrator has been notified by email.",
                btn: alertBtn.RETRY_CLOSE
            }
        },
        MENU_BUTTON: {
            REBOOT: true,
            DELETE: true,
            SGD: false,
            CDM: false
        },
        text: "reboot"
    },
    VM_REFRESH: {
        ALERT: {
            INIT: null,
            SPLASH: null,
            SUCCESS: null,
            FAILURE: null
        },
        text: "refreshstate"
    },
    SGD_DESKTOP: {
        ALERT: {
            INIT: null,
            SPLASH: {
                icon: alertIcon.OK,
                title: "Starting a desktop session",
                showId: true,
                showInstType: true,
                desc: null,
                btn: alertBtn.NONE
            },
            SUCCESS: null,
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to start an SGD Desktop Session.",
                showId: true,
                showInstType: true,
                desc: "The system administrator has been notified by email.",
                btn: alertBtn.RETRY_CLOSE
            }
        },
        MENU_BUTTON: {
            REBOOT: true,
            DELETE: true,
            SGD: false,
            CDM: false
        },
        text: "desktop"
    },
    SGD_XTERM: {
        ALERT: {
            INIT: null,
            SPLASH: {
                icon: alertIcon.OK,
                title: "Starting an XTerm session",
                showId: true,
                showInstType: true,
                desc: null,
                btn: alertBtn.NONE
            },
            SUCCESS: null,
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to start an SGD Xterm Session.",
                showId: true,
                showInstType: true,
                desc: "The system administrator has been notified by email.",
                btn: alertBtn.RETRY_CLOSE
            }
        },
        MENU_BUTTON: {
            REBOOT: true,
            DELETE: true,
            SGD: false,
            CDM: false
        },
        text: "xterm"
    },
    CLEAR: {
        ALERT: null,
        text: "clear"
    },
    UPLOAD: {
        ALERT: {
            SUCCESS: {
                icon: alertIcon.OK,
                title: "File uploaded successfully.",
                showId: false,
                showInstType: false,
                desc: null,
                btn: null
            }
        }
    }
};
/***************************************************************************** */
/* BEGIN CODE */
/***************************************************************************** */

var refreshIntervalID;
var quickIntervalID;
var refreshState;
var createInstance;
var progress;
var progressInterval;
var progressFrame;
var fieldsTable = {};
function init() {

    refreshState = true;
    //getUserName();
    var currentuser;
    currentuser = $("#currentuser").html();
    checkUserRole(currentuser);
}
function getUserName() {
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'POST',
        //async: 'false',
        // timeout: 5000,
        url: 'php/api.php',
        data: {oper: "getUserName", id: currentuser},
        dataType: 'json',
        // contentType: 'application/json',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                alert('This action is \"' + data['http']['http_message'].toString() + '\"\n Didn\'t get user data');
            }
            else
            {

                checkUserRole(checkJSON(data['data']["username"]));
                $("#user").html(checkJSON(data['data']["username"]));
            }
        },
        error: function(data) {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Get uesrname action is not successful. Please try again later!');
        }
    });
}
function checkUserRole(currentuser) {

    $.ajax({
        type: 'GET',
        //async: 'false',
        //timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {

            if (!checkForValue(data['data'], "ISVe_Project_Admin")) {
                alert("Sorry, you do not have the access to Project Admin's page. Please go back and check the URL!");
                window.location.href = "index.php";
                
            }
            else
                requestProjectDetails();
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });
}

function checkForValue(json, value) {
    for (key in json) {
        if (json[key] === value) {
            return true;
        }
    }
    return false;
}
function requestFileDownload() {
    $('#download>.err').html('');
    if ($('#download>div>#downloadPassword').val() === "") {
        $('#download>.err').append('Please enter a password. ');
    }
    if ($('#download>div>#fileName').val() === "") {
        $('#download>.err').append('Please enter a filename. ');
    }
    if (!$('#download>.err').is(':empty')) {
        return;
    }

    hideDownload();
    $.ajax({
        type: 'POST',
        url: 'php/account.php',
        data: {commit: "encrypt", password: $('#downloadPassword').val()},
        dataType: 'text',
        async: false,
        cache: true,
        success: function(xhr) {
            $('#downloadPassword').val(xhr);
            $('#download').submit();
        },
        error: function(xhr, status, error) {
            //Display Error
        },
        complete: function(xhr, status) {
        }
    });
    clearDownload();
}

function downloadWindow(form) {
    window.open('', 'downloadWin');
    form.target = 'downloadWin';
}

function requestFileUpload() {
    $('#upload>.err').html('');
    if ($('#upload>div>#uploadPassword').val() === "") {
        $('#upload>.err').append('Please enter a password. ');
    }
    if ($('#upload>div>#uploadFilename').val() === "") {
        $('#upload>.err').append('Please select a file. ');
    }
    if (!$('#upload>.err').is(':empty')) {
        return;
    }
    hideUpload();
    $.ajax({
        type: 'POST',
        url: 'php/account.php',
        data: {commit: "encrypt", password: $('#uploadPassword').val()},
        dataType: 'text',
        async: false,
        cache: true,
        success: function(xhr) {
            $('#uploadPassword').val(xhr);
            requestProgress();
            $('#upload').submit();
        },
        error: function(xhr, status, error) {
            //Display Error
        },
        complete: function(xhr, status) {
        }
    });
    clearUpload();
}

function requestProgress() {
    progress = window.open("", "progress", "width=500, height=40");
    progressInterval = setInterval(updateProgress, 1000);
}

function updateProgress() {
    if (!progress.closed) {
        progress = window.open("", "progress", "width=500, height=40");
    } else {
        clearProgress();
    }
}

function clearProgress() {
    var contents = $('#sgdUpload').contents();
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
        showAlert(FUNCTION.UPLOAD, alertType.SUCCESS, null);
    }
    if (progress) {
        progress.close();
    }
}

function requestPasswordVerification() {
    var pass1 = $('#password1').val();
    var pass2 = $('#password2').val();
    $.ajax({
        type: 'POST',
        url: 'php/account.php',
        data: {commit: 'verify', password1: pass1, password2: pass2},
        dataType: 'json',
        async: true,
        cache: false,
        beforeSend: function(xhr) {
        },
        success: function(results) {
            if (results.length == 0) {
                requestPasswordReset(pass1, pass2);
            } else {
                $('.password>.err').html('');
                for (var result in results) {
                    var msg = results[result];
                    $('div.err').append(msg + '<br\>');
                }
                ;
            }
        },
        error: function(xhr, status, error) {
            $('.err').html('An error occured. Please try again or contact a system administrator.');
        },
        complete: function(xhr, status) {
        }
    });
}

function requestPasswordReset() {
    var pass1 = $('#password1').val();
    var pass2 = $('#password2').val();
    $.ajax({
        type: 'POST',
        url: 'php/account.php',
        data: {commit: 'update', password1: pass1, password2: pass2},
        dataType: 'json',
        async: true,
        cache: false,
        beforeSend: function(xhr) {
        },
        success: function(results) {
        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {
        }
    });
    hidePassword();
}

function requestAccountDeletion() {
    $.ajax({
        type: 'POST',
        url: 'php/account.php',
        data: {commit: 'delete'},
        dataType: 'json',
        async: true,
        cache: false,
        beforeSend: function(xhr) {
        },
        success: function(results) {
        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {
            window.location.href = "?logoff";
        }
    });
    showDeletionSplash();
}

function requestTemplates() {
    $.ajax({
        type: 'POST',
        url: 'php/templateXML.php',
        dataType: 'xml',
        async: false,
        cache: false,
        beforeSend: function(xhr) {
        },
        success: function(templates) {
            setTemplates(templates);
        },
        error: function(xhr, status, error) {
            //document.location.reload();
        },
        complete: function(xhr, status) {
            var tmp = 0;
        }
    });
}


function requestInstances() {
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //  async: 'false',
        // timeout: 5000,
        data: {oper: 'getMachineList', projectId: projectid, id: currentuser},
        //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            requestInstancesSuccess(data);
            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });
}
//!!!!!!!!!!!!!!!need change
function requestUpdateCustomName(customName) {
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //async: 'false',
        // timeout: 5000,
        data: {oper: 'updateProjectDetail', projectId: projectid, id: currentuser, projectFields: fieldsTable},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            var r = confirm("You have successfully submitted your changes! Do you want to close this window?");
            if (r == true)
            {
                window.close();
            }
            else
            {
                location.reload();
            }
            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });
}

function requestZoneCreate(template, proc) {
    $.ajax({
        type: 'POST',
        url: "php/create_vm.php",
        data: {mid: template, proc: proc},
        async: true,
        cache: false,
        beforeSend: function(xhr) {
            quickRefresh();
        },
        success: function(result, status, xhr) {
            showAlert(FUNCTION.VM_CREATE, alertType.SUCCESS, null);
        },
        error: function(xhr, status, error) {
            //showAlert(FUNCTION.VM_CREATE,alertType.FAILURE, null);
        },
        complete: function(xhr, status) {
            var tmp = null;
        }
    });
}

function requestVMAction(func, vm) {
    var command = func.text;
    $.ajax({
        type: 'POST',
        url: "php/ralview.php",
        data: {oper: command, id: vm.IP},
        async: true,
        cache: false,
        beforeSend: function(xhr) {
            quickRefresh();
        },
        success: function(result, status, xhr) {
            //showAlert(func,alertType.SUCCESS, vm);
        },
        error: function(xhr, status, error) {
            showAlert(func, alertType.FAILURE, vm);
        },
        complete: function(xhr, status) {
        }
    });
}

function requestClear(ip) {
    $.ajax({
        type: 'POST',
        url: "php/ralview.php",
        data: {oper: "clear", id: ip},
        async: true,
        cache: false,
        beforeSend: function(xhr) {
        },
        success: function(result, status, xhr) {
        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {
        }
    });
}

function requestSGDSession(func, user, ip) {
    var command = func.text;
    var url = "" +
            "u=" + user + "&i=" + ip + "&o=" + command;
    $('#sgd').attr("src", url);
}

function slowRefresh() {
    if (refreshIntervalID) {
        clearInterval(refreshIntervalID);
    }
    refreshIntervalID = setInterval(function() {
        clearInterval(quickIntervalID);
        quickIntervalID = null;
        requestInstances();
    }, 300000);
}


function quickRefresh() {
    if (quickIntervalID == null) {
//quickIntervalID = setInterval("requestInstances()",3000);
    }



}

//function to sort the table
function sortTable() {
    $("#instances").tablesorter({
    });
}
//function to clear the tablesorter cache
function clearTablesorterCache() {
    $('#instances').trigger("update");
}

/****************************************************************************************************/

/****************************************************************************************************/

function actionVM(func, vm) {
//var command = func.text;
    var user = getUserName();
    var ip = null;
    var customName = null;
    if (vm != null) {
        ip = vm.IP;
        customName = vm.containerCustomName;
    }

    if (func.ALERT.SPLASH != null) {
        showAlert(func, alertType.SPLASH, vm);
    }

    switch (func) {
        case FUNCTION.VM_CREATE:
            requestZoneCreate(vm.internalName, vm.proc);
            break;
        case FUNCTION.VM_DELETE:
        case FUNCTION.VM_REBOOT:
        case FUNCTION.VM_CLEAR:
            requestVMAction(func, vm);
            break;
        case FUNCTION.VM_RENAME:
            requestUpdateCustomName(ip, customName);
            break;
        case FUNCTION.SGD_XTERM:
        case FUNCTION.SGD_DESKTOP:
            requestSGDSession(func, user, ip);
            break;
        default:
            break;
    }
}

function createActionFunction(func, instance) {
    return function() {
        actionVM(func, instance);
        return false;
    }
}





function checkJSON(prop) {
    if (prop) {
        return prop;
    } else {
        return '';
    }
}

/*************************************************************************************/
/**Progress Bar Functions **/
/*************************************************************************************/
function enableProgressBar(instance) {
    $("#VM" + instance.ID).find(".idle").hide();
    $("#VM" + instance.ID).find(".working").show();
    quickRefresh();
}

function disableProgressBar(instance) {
    $("#VM" + instance.ID).find(".working").hide();
    $("#VM" + instance.ID).find(".idle").show();
}

/*************************************************************************************/
/**Custom Name Functions **/
/*************************************************************************************/

function enableCustomName(instance) {
    var currentField = $('#VM' + instance.ID).find('#CustomName');
    var name = instance.containerCustomName;
    // alert(eval(name));
    if (typeof foo !== "string") {
        name = "Custom Name";
    }

    currentField.html("<input type=\"text\" " +
            "style=\"width:78px;\" " +
            "maxlength=16 " +
            "value=\"" + name + "\" " +
            "onfocus=\"removeWatermark(VM['VM" + instance.ID + "']);\" " +
            "onblur=\"addWatermark(VM['VM" + instance.ID + "']);\" " +
            "onkeyup=\"requestUpdateCustomName(VM['VM" + instance.ID + "'],this.value);\">" +
            "</input>");
}

function disableCustomName(instance) {
    var currentField = $('#VM' + instance.ID).find('#CustomName');
    var name = instance.containerCustomName;
    if (name == "") {
        name = "Custom Name";
    }
    currentField.html(name);
}

function removeWatermark(instance) {
    var currentField = $('#VM' + instance.ID).find('#CustomName>:input');
    var name = instance.containerCustomName;
    if (name == "") {
        currentField.val("");
    }
    return false;
}

function addWatermark(instance) {
    var currentField = $('#VM' + instance.ID).find('#CustomName>:input');
    var name = instance.containerCustomName;
    if (name == "") {
        currentField.val("Custom Name");
    }
    return false;
}


/***********************************************************************************/
/**Alert Functions **/
/***********************************************************************************/
function createOnClickFunction(func) {
    var conf = func.ALERT.INIT;
    var tmp = this;
    return function() {
        var selectedInstances = $('.instance.selected');
        if (selectedInstances.length == 0) {
            showAlert(FUNCTION.NO_VM);
        } else if (conf == null) {
            $.each(selectedInstances, function(index, instance) {
                actionVM(func, VM[instance.id]);
            });
        } else {
            $.each(selectedInstances, function(index, instance) {
                showAlert(func, alertType.INIT, VM[instance.id]);
            });
        }
    };
}

function createOnCreateFunction(template, processor) {
    hideTemplateMenu();
    if ($('.instance').length < 5) {
        showAlert(FUNCTION.VM_CREATE, alertType.INIT, TEMPLATE[template]);
    } else {
        showAlert(FUNCTION.VM_CREATE, alertType.ERR, TEMPLATE[template]);
    }
}
function showAlert(operation, type, instance) {
    hideAlert();
    var alert = null;
    if (operation == "clear") {

    } else {
        if (type == alertType.INIT) {
            alert = operation.ALERT.INIT;
        } else if (type == alertType.SPLASH) {
            alert = operation.ALERT.SPLASH;
        } else if (type == alertType.SUCCESS) {
            alert = operation.ALERT.SUCCESS;
        } else if (type == alertType.FAILURE) {
            alert = operation.ALERT.FAILURE;
        } else if (type == alertType.ERR) {
            alert = operation.ALERT.ERR;
        }
    }

    if (alert != null) {
        setIcon(alert.icon);
        setTitle(alert.title);
        if (instance) {
            setVmId(instance.containerName, alert.showId);
            setVmType(instance.type, alert.showInstType);
        } else {
            setVmId('', alert.showId);
            setVmType('', alert.showId);
        }
        setDesc(alert.desc);
        setBtn(alert.btn, operation, instance);
        if (alert.btn) {
            $('.alert').fadeIn('fast');
        } else {
            $('.alert').fadeIn('fast');
            setTimeout(hideAlert, 3000);
        }
    }
}

function hideAlert() {
    $('.alert').fadeOut('fast');
}

function setIcon(icon) {
    $('#alert-icon').html(icon.path);
}
function setBtn(btn, operation, instance) {
    $('#btn1').off('click');
    $('#btn2').off('click');
    switch (btn) {
        case alertBtn.OK_CANCEL:
        case alertBtn.RETRY_CLOSE:
            $('#btn1').on('click', createActionFunction(operation, instance));
            $('#btn1').val(btn.btn1);
            $('#btn1').show();
            $('#btn1').focus();
            $('#btn2').on('click', hideAlert);
            $('#btn2').val(btn.btn2);
            $('#btn2').show();
            $('#btn2').focus();
            break;
        case alertBtn.CLOSE:
            $('#btn1').on('click', hideAlert);
            $('#btn1').val(btn.btn1);
            $('#btn1').show();
            $('#btn1').focus();
            $('#btn2').hide();
            break;
        case alertBtn.NONE:
            $('#btn1').hide();
            $('#btn2').hide();
            break;
    }
}

function setTitle(title) {
    $('#alert-prompt').html("<p>" + title + "</p>");
}

function setVmId(id, visible) {
    if (visible) {
        $('#alert-vm-id').html("Hostname: " + id);
        $('#alert-vm-id').show();
    } else {
        $('#alert-vm-id').hide();
    }
}

function setVmType(type, visible) {
    if (visible) {
        $('#alert-vm-type').html("Instance Type: " + type);
        $('#alert-vm-type').show();
    } else {
        $('#alert-vm-type').hide();
    }
}

function setDesc(desc) {
    $('#alert-desc').html(desc);
}

function settings() {
    $('.main').fadeOut('fast', function() {
        $('.settings').show('fast');
    });
}

function main() {
    $('.settings').fadeOut('fast', function() {
        $('.main').show('fast');
    });
}

function logoff() {
    $('.logoff').fadeIn('fast');
    window.location.href = "?logoff";
}

function showPassword() {
    $('.password').fadeIn('fast');
}

function hidePassword() {
    $('.password').fadeOut('fast');
    $('.err').html('');
    $('#password1').val("");
    $('#password2').val("");
}

function showUpload() {
    $('.upload').fadeIn('fast');
}

function hideUpload() {
    $('.upload').fadeOut('fast');
}

function clearUpload() {
    hideUpload();
    $('#uploadFilename').val('');
    $('#uploadPassword').val('');
    $('#fakeFilename').val('');
    $('#upload>.err').html('');
}

function showDownload() {
    $('.download').fadeIn('fast');
}

function hideDownload() {
    $('.download').fadeOut('fast');
}

function clearDownload() {
    hideDownload();
    $('#fileName').val('');
    $('#downloadPassword').val('');
    $('#download>.err').html('');
}

function showDeletion() {
    $('.deletion').fadeIn('fast');
}

function hideDeletion() {
    $('.deletion').fadeOut('fast');
}

function showDeletionSplash() {
    $('#alert-box.deletion').fadeOut('fast');
    $('.deleteSplash').fadeIn('fast');
}
/************************************************
 * Get the project details
 * @returns {undefined}
 ************************************************/
function requestProjectDetails() {
    /*
     * Calls appropriate function in the php folder to give the data that we weant.
     * The format of the data is given in the function func.
     */
    var currentuser;
    currentuser = $("#currentuser").html();
    var project_id = $("#projectid").html();
    if (project_id == "" || project_id == null)
    {
        alert("You cannot see the project details without selecting a project. Please go back and choose a project ID.");
        window.location.href = "";
    }
    else {
        $.ajax({
            type: 'POST',
            //async: 'false',
            //  timeout: 5000,
            data: {oper: 'getProjectDetail', projectId: project_id, id: currentuser},
            dataType: 'json',
            // contentType: 'application/json;charset=utf-8',
            url: 'php/api.php',
            success: function(data) {
                if (data['http']['http_message'].toString() != "OK") {
                    $("#detaillog").append("<p>Cannot get project details.\n</p>");
                    //  alert('Get project details is \"' + data['http']['http_message'].toString() + '".');
                }
                else
                    requestProjectDetailsSuccess(data['data']);
                //  console.log(data);
            },
            error: function() {
                // TODO: how to get more information here? Should have something 
                // also written in the results.
                $("#detaillog").append("<p>Cannot get project details.\n</p>");
            }
        });
        //get project status
        /*
         $.ajax({
         type: 'POST',
         //async: 'false',
         //  timeout: 5000,
         data: {oper: 'getProjectStatus', projectId: project_id, id: currentuser},
         url: 'php/api.php',
         dataType: 'json',
         success: function(data) {
         if (data['http']['http_message'].toString() != "OK") {
         $("#detaillog").append("<p>Cannot get project status.\n</p>");
         }
         else
         document.getElementById("ProjectStatus").value = checkJSON(data['data']["projectStatus"]);
         },
         error: function() {
         // TODO: how to get more information here? Should have something 
         // also written in the results.
         $("#detaillog").append("<p>Cannot get project status.\n</p>");
         }
         });*/
        //request user list
        $.ajax({
            type: 'POST',
            async: 'true',
            //  timeout: 5000,
            data: {oper: 'getUserList', projectId: project_id, id: currentuser},
            dataType: 'json',
            // contentType: 'application/json;charset=utf-8',
            url: 'php/api.php',
            success: function(data) {
                //console.log(data);
                if (data['http']['http_message'].toString() != "OK") {
                    $("#detaillog").append("<p>Cannot get user list.\n</p>");
                }
                else
                    requestUserDetailsSuccess(data['data']);
            },
            error: function() {
                // TODO: how to get more information here? Should have something 
                // also written in the results.
                $("#detaillog").append("<p>Cannot get user list.\n</p>");
            }
        });
        //request machine list
        $.ajax({
            type: 'POST',
            //  async: 'false',
            //    timeout: 5000,
            data: {oper: 'getMachineList', projectId: project_id, id: currentuser},
            dataType: 'json',
            // contentType: 'application/json;charset=utf-8',
            url: 'php/api.php',
            success: function(data) {
                console.log(data);
                if (data['http']['http_message'].toString() != "OK") {
                    $("#detaillog").append("<p>Cannot get machine list.\n</p>");
                }
                else
                    requestMachineDetailsSuccess(data['data']);
                //  console.log(data);
            },
            error: function() {
                $("#detaillog").append("<p>Cannot get machine list.\n</p>");
            }
        });
        setTimeout(function() {
            if ((!(document.getElementById("detaillog").innerHTML == null || document.getElementById("detaillog").innerHTML == ""))) {
                showAlertWithText(FUNCTION.PROJECT_DETAIL, alertType.ERR, null, document.getElementById("detaillog").innerHTML);
                $("#detaillog").html("");
            }
        }, 2000);
    }
}


function requestProjectDetailsSuccess(instances) {


    document.getElementById("ProjectName").value = checkJSON(instances["ProjectName"]);
    document.getElementById("ProjectDescription").innerHTML = checkJSON(instances["ProjectDescription"]);
    document.getElementById("ProjectType").value = checkJSON(instances["ProjectType"]);
    document.getElementById("ProjectStartDate").value = convertDateToText(checkJSON(instances["ProjectStartDate"]).slice(0, 10));
    document.getElementById("ProjectEndDate").value = convertDateToText(checkJSON(instances["ProjectEndDate"]).slice(0, 10));
    document.getElementById("ProjectLeader").value = checkJSON(instances["ProjectLeader"]);
    document.getElementById("ProjectStatus").value = checkJSON(instances["ProjectStatus"]);
    //document.getElementById("MMachines").value = checkJSON(instances["MaxMachines"]);

    if (checkJSON(instances["vlanId"]) != "")
        document.getElementById("vlanId").value = checkJSON(instances["vlanId"]);
    document.getElementById("LabtoolProjectId").innerHTML = checkJSON(instances["LabtoolProjectId"]);
    document.getElementById("LabtoolProjectId").value = checkJSON(instances["LabtoolProjectId"]);
    var twikiurl = checkJSON(instances["ProjectTwikiURL"]);
    document.getElementById("PId").value = twikiurl;
    if (twikiurl.indexOf("ISVeProjects/ISVeProject") != -1) {
        document.getElementById("PId").innerHTML = checkJSON(instances["ProjectTwikiURL"].slice((twikiurl.indexOf("ISVeProject") + 24)));
    }
    else
        document.getElementById("PId").innerHTML = twikiurl;
}


function requestUserDetailsSuccess(instances) {
    var ps = checkJSON(instances);
    var getLength = function(obj) {
        var i = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                i++;
            }
        }
        return i;
    };
    len = getLength(ps);
    var dict = {};
    if (len > 0)
        $("#empty_tr2").hide();
    for (var i = 0; i < len; i++) {
        drawUserRow(ps[i], dict);
    }
    $(document).ready(function() {

        var rows = $('#CreateProjectUsersTable.seletable tr');
        rows.slice(2).click(function() {
            rows.removeClass('selected');
            // alert("sq");
            $(this).addClass('selected');
            $('#delete_btn2').addClass('active');
        });
    });
}
function drawUserRow(rowData, dict) {
    if (dict[rowData.Email] == 1) {
        deleteUserFromProject(rowData.Email);
    }
    else {
//alert(dict[rowData.Email]);
        dict[rowData.Email] = 1;
        var row = $("<tr />");
        $("#CreateProjectUsersTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
        row.append($("<td>" + rowData.UserName + "</td>"));
        row.append($("<td>" + rowData.Email + "</td>"));
    }
}

function requestMachineDetailsSuccess(instances) {
    var ps = checkJSON(instances);
    //alert(ps);
    var getLength = function(obj) {
        var i = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                i++;
            }
        }
        return i;
    };
    len = getLength(ps);
    if (len > 0)
        $("#empty_tr1").hide();
    for (var i = 0; i < len; i++) {
        drawMachineRow(ps[i]);
    }
    $(document).ready(function() {
        var rows = $('#mtable.selectable tr');
        rows.slice(2).click(function() {
            rows.removeClass('selected');
            $(this).addClass('selected');
            $('#delete_btn').addClass('active');
        });
    });
}
function drawMachineRow(rowData) {
    var row = $("<tr>");
    $("#mtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.MachineHardware + "</td>"));
    row.append($("<td>" + rowData.MachineSerialNumber + "</td>"));
    row.append($("<td>" + convertDateToText(rowData.MachineStartDate.slice(0, 10)) + "</td>"));
    row.append($("<td>" + convertDateToText(rowData.MachineEndDate.slice(0, 10)) + "</td>"));
    row.append($("<td>" + rowData.MachineSP + "</td>"));
    row.append($("<td>" + rowData.MachineIP + "</td>"));
    row.append($("<td>" + rowData.MachineName + "</td>"));
    if (rowData.MachineOS == "\"\"")
        row.append($("<td>" + "Not Applicable" + "</td></tr>"));
    else
        row.append($("<td>" + rowData.MachineOS + "</td></tr>"));
}

/*function deleteEntry() {
 //alert("hi!");
 $('.selectable tr.selected').remove();
 $("#delete_btn").removeClass('active');
 $("#delete_btn2").removeClass('active');
 }*/
function convertDateToText(startdate) {
    if (startdate == null || startdate == "" || startdate == "undefined")
        return null;
    if (startdate[4] == "-") {

        return convertDateToText(startdate.slice(5, 7) + startdate.slice(8, 10) + startdate.slice(0, 4));
    }
    startdate = startdate.replace("/", "");
    var mm = startdate.slice(0, 2);
    var dd = startdate.slice(2, 4);
    var yy = startdate.slice(6, 8);
    var MM;
    var mon = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    for (i = 0; i < 12; i++) {
        if (mm == mon[i]) {
            MM = MON[i];
            break;
        }

    }

    return (dd + "-" + MM + "-" + yy);
}


function addCreateProjectMachine() {
    $('#tempmachinetable').append("<tr class='addCreateProjectUser'><td ><input ></td>" +
            "<td><input ></td>" +
            "<td ><input ></td>" +
            "<td ><input ></td>" +
            "<td><input  ></td></tr>");
    $("#empty_tr1").hide();
}
function createProjectSubmitMachine() {

    $('#tempmachinetable tr').each(function() {
        var newRow = "<tr >";
        $(this).find('input').each(function() {
//alert($(this).val());
            newRow = newRow + ("<td>" +
                    $(this).val() +
                    "</td>");
        });
        newRow = newRow + "</tr>";
        $('#mtable').append(newRow);
    });
    $(document).ready(function() {

        var rows = $('#mtable.selectable tr');
        rows.slice(2).click(function() {
            rows.removeClass('selected');
            $(this).addClass('selected');
            $("#delete_btn").addClass('active');
        });
    });
    $('#tempmachinetable tr').remove();
}

function addCreateProjectUser() {
    /*   $("<table id='tempusertable'><tr class='addCreateProjectUser'><td ><input  id='userName_value' ></td>" +
     "<td><input  id='userEmail_value' ></td>" +
     "<td ><input  id='userFirst_value' ></td>" +
     "<td ><input id='userMiddle_value'></td>" +
     "<td><input  id='userLast_value' ></td></tr></table>").insertBefore('#userTable');
     //"<tr><td  colspan = '6' align='center' text-align='center'><button id='submitUser'style='margin: 0; text-align: center;' onclick='createProjectSubmitUser()'>Submit user</button></td></tr></table>")*/
    $('#tempusertable').append("<tr class='addCreateProjectUser'><td width='213px'><input  id='userName_value' ></td>" +
            "<td><input  id='userEmail_value' ></td></tr>");
    $("#empty_tr2").hide();
}

function createProjectSubmitUser() {

    $('#tempusertable tr').each(function() {
        var newRow = "<tr>";
        $(this).find('input').each(function() {
//alert($(this).val());
            newRow = newRow + ("<td>" +
                    $(this).val() +
                    "</td>");
        });
        newRow = newRow + "</tr>";
        $('#CreateProjectUsersTable').append(newRow);
    });
    $(document).ready(function() {
        var rows = $('#CreateProjectUsersTable.selectable tr');
        rows.slice(2).click(function() {
            rows.removeClass('selected');
            $(this).addClass('selected');
            $("#delete_btn2").addClass('active');
        });
    });
    $('#tempusertable tr').remove();
    /* Remove previous entry labels and values
     $('#userName_label').remove();
     $('#userName_value').remove();
     $('#userFirst_label').remove();
     $('#userFirst_value').remove();
     $('#userMiddle_label').remove();
     $('#userMiddle_value').remove();
     $('#userLast_label').remove();
     $('#userLast_value').remove();
     $('#userEmail_label').remove();
     $('#userEmail_value').remove();
     $('#submitUser').remove();*/
}

/******* Update Function ********/
// Submit updates to backend
/*********************************/



function updateProject() {
    /*
     * Calls appropriate function in the php folder to give the data that we weant.
     * The format of the data is given in the function func.
     */
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();

    fieldsTable = JSON.stringify(fieldsTable);
    $.ajax({
        type: 'POST',
        // async: 'false',
        //  timeout: 5000,
        data: {oper: 'updateProjectDetail', projectId: projectid, id: currentuser, projectFields: fieldsTable},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (!(document.getElementById("refreshlog").innerHTML == null || document.getElementById("refreshlog").innerHTML == "")) {
                showAlertWithText(FUNCTION.PROJECT_REFRESH, alertType.ERR, null, document.getElementById("refreshlog").innerHTML);
                $("#refreshlog").html("");
            }
            else
                showAlert(FUNCTION.PROJECT_REFRESH, alertType.SUCCESS, null);
        },
        error: function() {

            showAlert(FUNCTION.PROJECT_REFRESH, alertType.FAILURE, null);
        }
    });
}

function updateMachines() {
    /*
     * Calls appropriate function in the php folder to give the data that we weant.
     * The format of the data is given in the function func.
     */
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();


    $.ajax({
        type: 'POST',
        // async: 'false',
        //  timeout: 5000,
        data: {oper: 'createMachineList', projectId: projectid, id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                $("#refreshlog").append("<p>Update machine list failed.\n</p>");
            }
            updateProject();
        },
        error: function() {

            showAlert(FUNCTION.PROJECT_REFRESH, alertType.FAILURE, null);
        }
    });
}

function deleteUserFromProject(user) {
    var user_email = user;
    //alert(user);
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //  async: 'false',
        //   timeout: 5000,
        data: {oper: 'deleteUserFromProject', projectId: projectid, id: currentuser, user: user_email},
        //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                $("#refreshlog").append("<p>Deleting user " + user_email + " failed.\n</p>");
            }

        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            $("#refreshlog").append("<p>Deleting user " + user_email + " failed.\n</p>");
        }
    });
}
/*
 function deleteMachineFromProject(machine) {
 //alert(user);
 var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'deleteMachineFromProject', projectId: projectid, id: currentuser, machineId: machine},
 //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/machine.php',
 success: function(data) {
 if (data['http']['http_message'].toString() != "OK") {
 alert('Machine deletion is \"' + data['http']['http_message'].toString() + '".');
 }
 else {
 alert('You have deleted this machine ' + machine + ' from the project!');
 document.location.reload();
 }
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Cannot delete machine from the backend.The info is not saved. Please try again later!');
 }
 });
 }
 
 function AddMachineToProject() {
 var machine_id = $('#newmachineid').val();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'addMachineToProject', projectId: 266, id: "", machineId: machine_id},
 //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/machine.php',
 success: function(data) {
 if (data['http']['http_message'].toString() != "OK") {
 alert('Adding machine is \"' + data['http']['http_message'].toString() + '".');
 }
 else
 alert("You have successfully add machine " + machine_id + " !");
 //   document.location.reload();
 
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Cannot add machine to this project.The info is not saved. Please try again later!');
 }
 });
 
 }
 */
function AddUserToProject(user_email) {
//alert("."+user_email+".");
    user_email = user_email.replace(" ", "").replace("    ", "").replace("\n", "");
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //  async: 'false',
        //  timeout: 5000,
        data: {oper: 'addUserToProject', projectId: projectid, id: currentuser, user: user_email},
        //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                $("#refreshlog").append("<p>Adding user " + user_email + " failed.\n</p>");
                //  alert('Adding user is \"' + data['http']['http_message'].toString() + '".');
            }


            //     document.location.reload();

            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            $("#refreshlog").append("<p>Adding user " + user_email + " failed.\n</p>");
        }
    });
    
}
function Cancel() {
    var r = confirm("Are you sure you want to disgard all the changes?");
    if (r)
        window.close();
}
/**********************************************
 * Retrieve info from twiki and labtool
 * @returns {undefined}
 */
function refresh() {
    var twiki = document.getElementById("PId").value.replace(" ", "");
    if (twiki == "" || twiki == "null") {
        alert(" Cannot recognize the twiki URL provided! Please double check again.");
    }
    else {
        $.ajax({
            type: 'POST',
            url: 'php/fetchTwiki.php',
            data: ({Twiki: twiki}),
            async: true,
            cache: false,
            beforeSend: function(xhr) {
            },
            success: function(instances) {
                requestTwikiSuccess(instances);
                showAlert(FUNCTION.PROJECT_REFRESH, alertType.SPLASH, null);
                setTimeout(function() {

                    updateMachines();
                    updateStatus(document.getElementById("ProjectStatus").value);
                }, 3000);
            },
            error: function(xhr, status, error) {
                $("#refreshlog").append("<p>Cannot communicate with Twiki.\n</p>");
            },
            complete: function(xhr, status) {

            }
        });
    }
}

function requestTwikiSuccess(instances) {
    checkChange(document.getElementById("ProjectName"), JSON.parse(instances)["Project Name"].replace("?                                              ", "").replace("?", ""));
    checkChange(document.getElementById("ProjectDescription"), JSON.parse(instances)["Project Description"].replace("?                                              ", "").replace("?", ""));
    checkChange(document.getElementById("ProjectType"), JSON.parse(instances)["Project Type"]);
    checkChange(document.getElementById("LabtoolProjectId"), JSON.parse(instances)["ISVe Lab ID"]);

    var labID = document.getElementById("LabtoolProjectId").value;
    document.getElementById("LabtoolProjectId").innerHTML = labID;
    if (isNaN(labID)) {

        if (labID.search(/ISVe/i) != "-1") {
            var n = labID.search(/ISVe/i);
            var temp;
            for (; n < labID.length - 8; n++) {
                temp = labID.slice(n + 4, n + 8);
                if (!isNaN(temp) && temp > 999) {
                    labID = temp;
                    requestUserandMachine(labID);
                    break;
                }
            }
        }
    }
    else {
        requestUserandMachine(labID);
    }
}

function requestUserandMachine(labID) {
    var admin_email;
    admin_email = $("#currentuser").html();
    $.ajax({
        type: 'GET',
        url: 'php/api.php',
        data: ({oper: 'getInfoFromLabtool', labtoolId: labID, id: admin_email}),
        dataType: 'json',
        //  async: true,
        // cache: false,
        beforeSend: function(xhr) {
        },
        success: function(data) {

            if (data['http']['http_message'].toString() != "OK") {
                $("#refreshlog").append("<p>Get project info from labtool failed.\n</p>");
            }
            var startdate = data['data'][0]['STARTDATE'].toString();
            var enddate = data['data'][0]['ENDDATE'].toString();
            var status = data['data'][0]["PROJECTSTATUS"].toString();
            checkChangeDate(document.getElementById("ProjectStartDate"), startdate);
            checkChangeDate(document.getElementById("ProjectEndDate"), enddate);
            if (status=="Closed")
                status = "deactivated";

            document.getElementById("ProjectStatus").value = status;
            var labnote = data['data'][0]['LABNOTE'].toString();
            var str = labnote.split("\n");
            //alert(labnote);
            for (var i = 0; i < str.length; i++) {

                if (str[i].toLowerCase().indexOf("vlan:") != -1) {
                    var index = str[i].toLowerCase().indexOf("vlan")
                    var vlan = str[i].replace(" ", "").replace(":", "").slice(index + 4, index + 7);
                    //alert(vlan);
                    if (isNaN(vlan))
                        $("#refreshlog").append("<p>The VLAN ID is not valid.\n</p>");
                    else {
                        checkChange(document.getElementById("vlanId"), vlan);
                        // document.getElementById("vlanId").value = vlan;
                    }
                }
                else if (str[i].toLowerCase().replace(" ", "").indexOf("partnersso") != -1) {
                    var index = str[i].toLowerCase().indexOf("partnersso");
                    var partner = str[i].replace(" ", "").replace(":", "").slice(index + 11);
                    //alert(partner);
                    if (!validateEmail(partner))
                        $("#refreshlog").append("<p>The Partner's SSO is not valid.\n</p>");
                    else {
                        //alert(partner);
                        var x = partner.indexOf("@");
                        $("#tempUsersTable").append("<tr><td>" + partner.slice(0, x).replace(" ", "").replace("   ", "").replace("\n", "").toLowerCase() + "</td><td>" + partner.replace(" ", "").replace("   ", "").replace("\n", "").toLowerCase() + "</tr>");
                    }
                }
            }
            $.ajax({
                type: 'GET',
                url: 'php/api.php',
                data: ({oper: 'getUsersFromLabtool', labtoolId: labID, id: admin_email}),
                dataType: 'json',
                beforeSend: function(xhr) {
                },
                success: function(data) {
                    if (data['http']['http_message'].toString() != "OK") {
                        $("#refreshlog").append("<p>Get user list from labtool failed.\n</p>");
                    }
                    var users = data['data'];
                    if (users != "" && users != "null") {

                        var origRows = $('#CreateProjectUsersTable.selectable tr').slice(2);
                        $('#CreateProjectUsersTable.selectable tr').slice(2).remove();
                        $("#empty_tr2").hide();
                        //$('#CreateProjectUsersTable').append(data);
                        $.each(users, function(key, val) {
                            if (val['ISPRIMARY'] == 1) {
                                checkChange(document.getElementById("ProjectLeader"), val['ENGINEER'].toString());
                            }
                            var newuser = $("<tr><td>" + val['ENGINEER'].toString() + "</td><td>" + val['EMAIL'].toString() + "</td></tr>");
                            $('#CreateProjectUsersTable').append($(newuser));

                        })
                        $('#CreateProjectUsersTable').append($("#tempUsersTable tr"));
                        var newRows = $('#CreateProjectUsersTable tr').slice(2);
                        origRows.each(function() {
                            cell = $(this).find('td:eq(1)');
                            //cell.html=cell.html().replace(" ","").replace("   ","").replace("\n","").toLowerCase();

                            if (cell.html() != "" && cell.html() != null && cell.html() != 'undefined') {

                                if (!compareCell(cell, newRows)) {
                                    // alert(compareCell(cell,newRows));
                                    deleteUserFromProject(cell.html());
                                }
                            }
                            else
                                deleteUserFromProject(cell.html());
                        });
                        newRows.each(function() {
                            cell = $(this).find('td:eq(1)');
                            //alert(cell.html());
                            // alert(newRows);

                            if (cell.html() != "" && cell.html() != null && cell.html() != 'undefined') {
                                //alert("2" + compareCell(cell, origRows));
                                if (!compareCell(cell, origRows)) {
                                    // alert(compareCell(cell,newRows));
                                    // alert(cell.html().replace(" ", ""))
                                    if (!validateEmail(cell.html().replace("\n", "")))
                                        $("#refreshlog").append("<p>The Partner's SSO is not valid.\n</p>");
                                    else {
                                        AddUserToProject(cell.html().replace("\n", ""));
                                    }
                                }
                            }

                        });
                        /*  $(document).ready(function() {
                         
                         var rows = $('#CreateProjectUsersTable.selectable tr');
                         rows.slice(2).click(function() {
                         rows.removeClass('selected');
                         $(this).addClass('selected');
                         $('#delete_btn2').addClass('active');
                         
                         });
                         });*/
                    }


                },
                error: function(xhr, status, error) {
                    $("#refreshlog").append("<p>Cannot get the user list.\n</p>");
                },
                complete: function(xhr, status) {
                }
            });
        },
        error: function(xhr, status, error) {
            $("#refreshlog").append("<p>Cannot get the project info from labtool\n</p>");
        },
        complete: function(xhr, status) {
        }
    });
    /*
     $.ajax({
     type: 'POST',
     url: 'php/getLabtoolEntryStatus.php',
     data: ({LabID: labID}),
     async: true,
     cache: false,
     beforeSend: function(xhr) {
     },
     success: function(data) {
     var str = data.split("\n")
     
     if (str.length != 2)
     $("#refreshlog").append("<p>The status of this project is invalid.\n</p>");
     // console.log("Didn't get the Status of this project!");
     else {
     
     checkStatus(document.getElementById("ProjectStatus"), str[0]);
     //document.getElementById("ProjectLeader").value = str[0];
     
     }
     
     },
     error: function(xhr, status, error) {
     $("#refreshlog").append("<p>The status of this project is invalid.\n</p>");
     },
     complete: function(xhr, status) {
     }
     });
     $.ajax({
     type: 'POST',
     url: 'php/getLabtoolEntryLeader.php',
     data: ({LabID: labID}),
     async: true,
     cache: false,
     beforeSend: function(xhr) {
     },
     success: function(data) {
     var str = data.split("\n")
     if (str.length != 2)
     $("#refreshlog").append("<p>Didn't get the project leader info.\n</p>");
     else {
     checkChange(document.getElementById("ProjectLeader"), str[0]);
     //document.getElementById("ProjectLeader").value = str[0];
     
     }
     
     },
     error: function(xhr, status, error) {
     $("#refreshlog").append("<p>Didn't get the project leader info.\n</p>");
     },
     complete: function(xhr, status) {
     }
     });
     $.ajax({
     type: 'POST',
     url: 'php/getLabtoolEntry.php',
     data: ({LabID: labID}),
     async: true,
     cache: false,
     beforeSend: function(xhr) {
     },
     success: function(data) {
     str = data.split("\n")
     if (str.length != 3)
     $("#refreshlog").append("<p>Didn't get the Start Date and End Date of this project.\n</p>");
     else {
     checkChangeDate(document.getElementById("ProjectStartDate"), str[0]);
     checkChangeDate(document.getElementById("ProjectEndDate"), str[1]);
     // document.getElementById("ProjectStartDate").value = convertDateFromText(str[0]);
     // document.getElementById("ProjectEndDate").value = convertDateFromText(str[1]);
     }
     
     },
     error: function(xhr, status, error) {
     $("#refreshlog").append("<p>Didn't get the Start Date and End Date of this project.\n</p>");
     },
     complete: function(xhr, status) {
     }
     });*/
    $.ajax({
        type: 'GET',
        url: 'php/api.php',
        data: ({oper: 'getMachinesFromLabtool', labtoolId: labID, id: admin_email}),
        dataType: 'json',
        beforeSend: function(xhr) {
        },
        success: function(data) {
            var machines = data['data'];
            if (machines != "" && machines != "null") {
                $('#mtable.selectable tr').slice(1).remove();
                $.each(machines, function(key, val) {
                    var newmachine = $("<tr><td>" + val['MachineHardware'].toString() + "</td><td>" + val['MachineSerialNumber'].toString() + "</td><td>" + val['MachineStartDate'].toString() + "</td><td>" + val['MachineEndDate'].toString() + "</td><td>" + checkIsIPV4(val['MachineSP'].toString()) + "</td><td>" + val['MachineIP'].toString() + "</td><td>" + val['MachineName'].toString() + "</td><td>" + val['MachineOS'].toString() + "</td></tr>");
                    $('#mtable').append($(newmachine));
                })
                /*
                 $(document).ready(function() {
                 var rows = $('#mtable.selectable tr');
                 rows.slice(2).click(function() {
                 rows.removeClass('selected');
                 $(this).addClass('selected');
                 $('#delete_btn2').addClass('active');
                 });
                 });*/
            }

        },
        error: function(xhr, status, error) {
            $("#refreshlog").append("<p>Didn't get the machine info correctly.\n</p>");
        },
        complete: function(xhr, status) {
        }
    });
}

function checkIsIPV4(entry) {
    var blocks = entry.slice(-15).split(".");
    var ip = "";
    if (blocks.length === 4) {
        for ( i = 0; i < blocks.length; i++) {
            ip = ip +  parseInt(blocks[i]).toString()+".";
        }
          return ip;
    }
    else
        return entry;

  
}
function checkChange(txtInput, currentValue) {
    lastValue = txtInput.value;
    if (lastValue != currentValue) {
        console.log(txtInput.id + 'Value changed from ' + lastValue + ' to ' + currentValue);
        txtInput.value = currentValue.replace(" ", "");
        fieldsTable[txtInput.id] = currentValue.replace(" ", "");
    }
}
function checkChangeDate(txtInput, currentValue) {
    lastValue = txtInput.value;
    if (lastValue != currentValue) {
        console.log(txtInput.id + ' changed from ' + lastValue + ' to ' + currentValue);
        txtInput.value = currentValue;
        fieldsTable[txtInput.id] = convertDateFromText(currentValue);
    }
}



function validateEmail(email) {
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(email);
}


function compareCell(cell, rows) {
    for (var i = 0; i < rows.length; i++) {

        if (rows.eq(i).find('td:eq(1)').html() != "" && rows.eq(i).find('td:eq(1)').html() != null && rows.eq(i).find('td:eq(1)').html() != 'undefined') {
            // alert(cell.html().toLowerCase() + " " + rows.eq(i).find('td:eq(1)').html().toLowerCase() + " " + (cell.html().replace(" ", "").replace("   ", "").replace("\n", "").toLowerCase() == rows.eq(i).find('td:eq(1)').html().toLowerCase()));

            if (cell.html().replace(" ", "").replace("   ", "").replace("\n", "").toLowerCase() == rows.eq(i).find('td:eq(1)').html().replace(" ", "").replace("   ", "").replace("\n", "").toLowerCase()) {

                return true;
            }
        }

    }
    return false;
}

function convertDateFromText(startdate) {
    if (startdate == null || startdate == "" || startdate == "undefined")
        return null;
    if (startdate[2] == "/") {

        return startdate.slice(0, 2) + startdate.slice(3, 5) + startdate.slice(6);
    }

    var dd = startdate.slice(0, 2);
    var MM = startdate.slice(3, 6);
    var yy = startdate.slice(7);
    var mm;
    var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    for (i = 0; i < 9; i++) {
        if (MM == mon[i] || MM == MON[i]) {
            i = i + 1;
            mm = "0" + i;
            break;
        }

    }
    for (i = 9; i < 12; i++) {
        if (MM == mon[i] || MM == MON[i]) {
            i = i + 1;
            mm = i;
            break;
        }
    }
    if (yy.length < 4)
        return mm + dd + "20" + yy;
    else
        return mm + dd + yy;
}

function hrefTwiki() {

    //set the href to twiki in the sidebar
    twiki = $("#PId").val();
    if (twiki == "" || twiki == null)
        window.open("");
    else {
        try {
            window.open(twiki.replace(" ", ""));
        }
        catch (err) {
            window.open("");
        }
    }
}

function hrefLabtool() {

    //set the href to latool in the sidebar
    labtool = $("#LabtoolProjectId").html();
    if (labtool == "" || labtool == null)
        window.open("");
    else {
        try {
            window.open();
        }
        catch (err) {
            window.open();
        }
    }
}

//**********************DEPLOY related function*************************//
function setupSGDserver() {
// TODO: where is this called from?

    var admin_email = $("#currentuser").html();
    var project_id = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //  async: 'false',
        //    timeout: 5000,
        data: {oper: 'setupSGDServer', projectId: project_id, id: admin_email},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: "php/api.php",
        success: function(data) {


            if (data['http']['http_message'].toString() == "OK") {
                showAlert(FUNCTION.DEPLOY, alertType.SUCCESS, null);
            }
            else
                showAlertWithText(FUNCTION.DEPLOY, alertType.ERR, null, document.getElementById("deploylog").innerHTML);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            showAlertWithText(FUNCTION.DEPLOY, alertType.ERR, null, document.getElementById("deploylog").innerHTML);
        }
    });
}

function unsetSGDserver() {
// TODO: where is this called from?
    var admin_email = $("#currentuser").html();
    var project_id = $("#projectid").html();
    $.ajax({
        type: 'POST',
        //  async: 'false',
        //   timeout: 5000,
        data: {oper: 'unsetSGDServer', projectId: project_id, id: admin_email},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: "php/api.php",
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                $("#deploylog").append("<p>Cannot un-setup SGD server.\n</p>");
            }
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            $("#deploylog").append("<p>Cannot un-setup SGD server.\n</p>");
        }
    });
}

function checkAddress(ipaddress)
{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
        return true;
    }

    return false;
}

function checkSP(ipaddress)
{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
        return true;
    }

    return false;
}
function deployoninternet() {
    if (!$("#vlanId").val())
        alert("Please input the vlan ID!");
    else if (isNaN($("#vlanId").val())) {
        alert("Please input a valid vlan ID!");
    }
    else
    {
        unsetSGDserver();
        var machinesTable = {};
        // Remove header from machines table
        // $('#mtable_header').hide();

        var tabl = document.getElementById('mtable');
        var l = tabl.tBodies[0].rows.length;
        var i;
        var flag = true;
        for (i = 2; i < l; i++)
        {
            var tr = tabl.tBodies[0].rows[i];
            var td = $(tr).find('td');
            var machine_type = td.eq(0).text();
            var machine_id = td.eq(1).text();
            var SP = td.eq(4).text();
            var IP = td.eq(5).text();
            if (!checkAddress(IP)) {
                $("#deploylog").append("<p>Please check the IP address of " + machine_type + ".\n</p>");
                flag = false;
            }
            if (!checkSP(SP)) {
                $("#deploylog").append("<p>Please check the SP address of " + machine_type + ".\n</p>");
                flag = false;
            }

        }
        if (flag == true) {
            setupSGDserver();
            updateStatus("Deployed");
        }
        else
            showAlertWithText(FUNCTION.DEPLOY, alertType.ERR, null, document.getElementById("deploylog").innerHTML);
    }

}


function updateStatus(newStatus) {

    var admin_email = $("#currentuser").html();
    var project_id = $("#projectid").html();
    //newStatus = JSON.stringify(newStatus);
    $.ajax({
        type: 'POST',
        // async: 'false',
        //  timeout: 5000,
        data: {oper: 'updateProjectStatus', projectId: project_id, id: admin_email, projectStatus: newStatus},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                alert('Deploying project is \"' + data['http']['http_message'].toString() + '".');
            }

        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t update the project status succesfully!');
        }
    });
}
/****** ALERT functions *****/
function showAlert(operation, type, instance) {
    hideAlert();
    var alert = null;
    if (operation == "clear") {

    } else {

        if (type == alertType.INIT) {
            alert = operation.ALERT.INIT;
        } else if (type == alertType.SPLASH) {
            alert = operation.ALERT.SPLASH;
        } else if (type == alertType.SUCCESS) {

            alert = operation.ALERT.SUCCESS;
        } else if (type == alertType.FAILURE) {
            alert = operation.ALERT.FAILURE;
        } else if (type == alertType.ERR) {
            alert = operation.ALERT.ERR;
        }
    }

    if (alert != null) {

        setIcon(alert.icon);
        setTitle(alert.title);
        if (instance) {
            setVmId(instance.containerName, alert.showId);
            setVmType(instance.type, alert.showInstType);
        } else {
            setVmId('', alert.showId);
            setVmType('', alert.showId);
        }
        setDesc(alert.desc);
        setBtn(alert.btn, operation, instance);
        if (alert.btn) {
            $('.alert').fadeIn('fast');
        } else {
            $('.alert').fadeIn('fast');
            setTimeout(hideAlert, 3000);
        }
    }
}

function showAlertWithText(operation, type, instance, text) {
    hideAlert();
    var alert = null;
    if (operation == "clear") {

    } else {

        if (type == alertType.INIT) {
            alert = operation.ALERT.INIT;
        } else if (type == alertType.SPLASH) {
            alert = operation.ALERT.SPLASH;
        } else if (type == alertType.SUCCESS) {

            alert = operation.ALERT.SUCCESS;
        } else if (type == alertType.FAILURE) {
            alert = operation.ALERT.FAILURE;
        } else if (type == alertType.ERR) {
            alert = operation.ALERT.ERR;
        }
    }

    if (alert != null) {

        setIcon(alert.icon);
        setTitle(alert.title);
        if (instance) {
            setVmId(instance.containerName, alert.showId);
            setVmType(instance.type, alert.showInstType);
        } else {
            setVmId('', alert.showId);
            setVmType('', alert.showId);
        }
        setDesc(text);
        setBtn(alert.btn, operation, instance);
        if (alert.btn) {
            $('.alert').fadeIn('fast');
        } else {
            $('.alert').fadeIn('fast');
            setTimeout(hideAlert, 3000);
        }
    }
}


function hideAlert() {
    $('.alert').fadeOut('fast');
}
