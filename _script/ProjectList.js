var x = 0;
var vmCount = 0;
var newStatus;
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
    USER_LOGIN: {
        ALERT: {
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to get the user infomation.",
                showId: false,
                showInstType: false,
                desc: "Please try again later or contact the system admin.",
                btn: alertBtn.CLOSE
            },
            ERR: {
                icon: alertIcon.ERROR,
                title: "NO Access",
                showId: false,
                showInstType: false,
                desc: "Sorry, you don't have the access to this page.",
                btn: alertBtn.CLOSE
            }
        },
        text: null
    },
    GET_PROJECT: {
        ALERT: {
            SPLASH: {
                icon: alertIcon.OK,
                title: "Retreiving Infomation",
                showId: false,
                showInstType: false,
                desc: "Getting the project list for you...",
                btn: alertBtn.NONE
            },
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to get the project list right now.",
                showId: false,
                showInstType: false,
                desc: "Please try again later or contact the system admin.",
                btn: alertBtn.RETRY_CLOSE
            },
            ERR: {
                icon: alertIcon.ERROR,
                title: "Unable to refresh the page right now.",
                showId: false,
                showInstType: false,
                desc: "",
                btn: alertBtn.CLOSE
            }
        },
        text: null
    },
    DELETE_PROJECT: {
        ALERT: {
            INIT: {
                icon: alertIcon.WARNING,
                title: "Delete Project?",
                showId: false,
                showInstType: true,
                desc: "Are you sure you want to deleted the project?",
                btn: alertBtn.OK_CANCEL
            },
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to delete the project right now.",
                showId: false,
                showInstType: false,
                desc: "Please try again later or contact the system admin.",
                btn: alertBtn.CLOSE
            },
            SUCCESS: {
                icon: alertIcon.OK,
                title: "Successfully deleted this project",
                showId: false,
                showInstType: false,
                desc: "Now the project can only be viewed in the 'Show Closed Project' panel.",
                btn: alertBtn.NONE
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
    PROJECT_CREATE: {
        ALERT: {
            SPLASH: {
                icon: alertIcon.OK,
                title: "CREATING",
                showId: false,
                showInstType: false,
                desc: "Creating the project in the backend...",
                btn: alertBtn.NONE
            },
            FAILURE: {
                icon: alertIcon.ERROR,
                title: "Unable to create the project right now.",
                showId: false,
                showInstType: false,
                desc: "Please try again later or contact the system admin.",
                btn: alertBtn.CLOSE
            },
            SUCCESS: {
                icon: alertIcon.OK,
                title: "Successfully created the project",
                showId: false,
                showInstType: false,
                desc: "You can see this project in the project list page now.",
                btn: alertBtn.NONE
            },
            ERR: {
                icon: alertIcon.WARNING,
                title: "Failed to create the project",
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

function init() {
    $.ajaxSetup({
        cache: false,
        timeout: 600000
    });


    //Template Actions
    $(document).on('click', 'a.template', function() {
        e.stopPropagation();
        $("a.template").removeClass("selected");
        $(this).addClass("selected");
        hideTemplateMenu();
    });

    $(document).on('click', '#nav > li > a', function(e) {
        e.stopPropagation();
        if ($(this).parent().hasClass('selected')) {
            hideTemplateMenu();
        } else {
            showTemplateMenu(this);
        }
    });

    $(document).click(function() {
        if ($('#nav > li').hasClass('selected')) {
            hideTemplateMenu();
        } else {
            disableInstances();
        }
    });

    //OnClick: VM Instances
    $(document).on('click', '.instance.enabled', function() {
        if (!$(this).hasClass('selected')) {
            //Disable Previously Selected VMs
            var selectedInstances = $('.instance.selected');

            $.each(selectedInstances, function() {
                $(this).toggleClass('selected');
                disableCustomName(VM[this.id]);
                VM[this.id].selectedStatus = false;
            });

            //Enable Currently Selected VM
            $(this).toggleClass('selected');
            VM[this.id].selectedStatus = true;
            enableCustomName(VM[this.id]);
            updateMenuButtons(VM[this.id]);

        }
    });



    $(document).on('click', '.instance', function(e) {
        if (!e)
            var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });

    $(document).on('click', '#templates', function(e) {
        if (!e)
            var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });

    $(document).on('click', '#buttons', function(e) {
        if (!e)
            var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });


    //File Upload
    $(document).on('click', '#fakeFilename', function(e) {
        $('#uploadFilename').click();
    });
    $(document).on('focus', '#fakeFilename', function(e) {
        $('#fakeFilename').blur();
    });
    $(document).on('change', '#uploadFilename', function(e) {
        $('#fakeFilename').val(this.value);
    });



    checkUserRoleforCreateProject();
    requestInstances();

}

function getUserName() {
    var currentuser;
    currentuser = $("#currentuser").html();
    // alert(currentuser);
//document.getElementById("suqi").value = currentuser;

//alert(currentuser);
    $.ajax({
        type: 'GET',
        // async: 'false',
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
                $("#user").html(checkJSON(data['data']["username"]));
                checkUserRole();

            }
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get user data');
        }
    });
}

function getProjectCount() {
    /* var currentuser;
     currentuser = $("#currentuser").html();
     
     $.ajax({
     type: 'POST',
     async: 'false',
     timeout: 5000,
     url: 'php/projects.php',
     data: {oper: "getProjectCount", id: currentuser},
     dataType: 'json',
     // contentType: 'application/json',
     success: function(data) {
     $("#vmCount").html(checkJSON(data["projectCount"].toString()));
     },
     error: function() {
     // TODO: how to get more information here? Should have something 
     // also written in the results.
     alert('Didn\'t get project count data');
     }
     });*/
    $("#vmCount").html(x);
}
function requestProgress() {
    progress = window.open("https://osrl-display.oracle.com/sgd/progress", "progress", "width=500, height=40");
    progressInterval = setInterval(updateProgress, 1000);
}

function updateProgress() {
    if (!progress.closed) {
        progress = window.open("https://osrl-display.oracle.com/sgd/progress", "progress", "width=500, height=40");
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
        url: 'php/api.php',
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


function requestUpdateCustomName(instance, customName) {
    var ip = instance.IP;
    instance.containerCustomName = customName;

    $.ajax({
        type: 'POST',
        url: 'php/vmview.php',
        data: {oper: 'customname', id: ip, cust_name: customName},
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
        url: "php/vmview.php",
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
        url: "php/vmview.php",
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
    var url = "https://osrl-display.oracle.com/sgd/runapp.jsp?" +
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
    vmCount = 0;
    x = 0;
}

function quickRefresh() {
    if (quickIntervalID == null) {
        quickIntervalID = setInterval("requestInstances()", 300);
    }
}

/****************************************************************************************************/

/****************************************************************************************************/

function actionVM(func, vm) {
    //var command = func.text;
    var user = getUser();
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




/** *********************Template Code********************************** */
// Drop Down Menu Functions
function showTemplateMenu(elem) {
    hideTemplateMenu();
    if ($(elem).next(".subs").length) {
        $(elem).parent().addClass("selected"); // display popup
        $(elem).next(".subs").children().slideDown('fast');
        disableTable();
    }
}

function hideTemplateMenu() {
    $("#nav .selected div div").slideUp('fast', function() {
        $("#nav .selected").removeClass("selected");
    }); // hiding popups
    enableTable();
}

function setTemplates(templates) {
    $.each($(templates).find("template"), function() {
        var publicName = $(this).find("public_name").text();
        var internalName = $(this).find("internal_name").text();
        var proc = $(this).find("proc").text();

        TEMPLATE[internalName] = {};
        TEMPLATE[internalName].internalName = internalName;
        TEMPLATE[internalName].name = publicName;
        TEMPLATE[internalName].proc = proc;
        TEMPLATE[internalName].type = publicName + " - " + proc.toUpperCase();
    });
}

/** ****************************************************************************** */

// Menu Button Functions
function disableMenuButtons() {
    $(".menu_btn").removeClass('enabled');
    $(".menu_btn").addClass('disabled');
}

function enableMenuButtons() {
    $(".menu_btn").removeClass('disabled');
    $(".menu_btn").addClass('enabled');
}

function updateMenuButtons(instance) {
    $(".menu_btn").removeClass('active');
    /*  if (instance.BUTTONS.del) {
     $('#delete_btn').addClass('active');
     }
     if (instance.BUTTONS.rbt) {
     $('#power_btn').addClass('active');
     }
     if (instance.BUTTONS.sgd) {
     $('#console_btn').addClass('active');
     $('#desktop_btn').addClass('active');
     }*/

    $('#machine_btn').addClass('active');
    $('#user_btn').addClass('active');
    //  $('#delete_btn').addClass('active');
    $('#project_btn').addClass('active');
}

function deactivateMenuButtons() {
    $(".menu_btn").removeClass('active');
}

// Table Row Functions
function disableTable() {
    disableMenuButtons();
    $(".instance").removeClass('enabled');
}

function enableTable() {
    enableMenuButtons();
    $(".instance").addClass('enabled');
}

function disableInstances() {
    $('.menu_btn').removeClass('active');

    //Disable Previously Selected VMs
    var selectedInstances = $('.instance.selected');

    $.each(selectedInstances, function() {
        $(this).toggleClass('selected');
        disableCustomName(VM[this.id]);
        VM[this.id].selectedStatus = false;
    });
}
/************************************************************************************/
/** Instance List Functions **/
/************************************************************************************/
function requestInstances() {

    var currentuser;
    currentuser = $("#currentuser").html();
    showAlert(FUNCTION.GET_PROJECT, alertType.SPLASH, null);
    $.ajax({
        type: 'GET',
        // async: 'true',
        // timeout: 5000,
        url: 'php/api.php',
        cache: false,
        data: {oper: "getAllProjectList", id: currentuser},
        dataType: 'json',
        // contentType: 'application/json',
        success: function(data) {
            //console.log(instances);
            if (data['http']['http_message'].toString() != "OK") {
                //alert('Get project list action is \"' + data['http']['http_message'].toString() + '\"\n Didn\'t get data');
                showAlert(FUNCTION.GET_PROJECT, alertType.FAILURE, null);
            }
            else
                requestInstancesSuccess(data['data']);
        },
        error: function(xhr, status, error) {
            showAlert(FUNCTION.GET_PROJECT, alertType.FAILURE, null);
        },
        complete: function(xhr, status) {
        }
    })
}
function requestInstancesSuccess(instances) {

    var ps = checkJSON(instances);
    var getLength = function(obj) {
        var i, j = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                //alert(checkJSON(obj[key]['ProjectStatus']));
                if (checkJSON(obj[key]['ProjectStatus']) == "Deployed")
                    i++;
                j++;
            }
        }
        return i, j;
    };
    var vmCountDeployed;
    vmCountDeployed, vmCount = getLength(ps);


    /*
     var vmRemain = Math.max(5 - vmCount, 0);
     //$('#vmRemain').text(vmRemain);
     
     deactivateMenuButtons();
     $('.instance').hide();*/

    //Update VM Instances
    if (vmCountDeployed == 0) {
        $('#table_header').hide();
        $('.menu').hide();
        $('#table_empty').show();
        //disableMenuButtons();
    }
    if (vmCountDeployed == 1) {
        $('#table_header').show();
        $('#table_empty').hide();
        $('#table_header').show();

        window.location = 'RAL.php?id=' + instances[0]['ProjectId'];
    }
    else {

        for (var i = 0; i < vmCount; i++) {

            updateInstance(instances[i]);
            x = x + 1;


        }
        refreshState = false;
        jQuery(function($)
        {
            $(document).ajaxStop(function()
            {
                // Executed when all ajax requests are done.
                // $("#vmCount").html(x);
                $('#instances').trigger("update");
                $("#instances").tablesorter({sortList: [[0, 0], [0, 0]]});
            });

        });

    }

    var deleted = $('.instance:hidden');
    $.each(deleted, function() {
        $(this).remove();
        delete VM[this.id];
    });

}


function updateInstance(instance) {


    var rowID = 'VM' + checkJSON(instance['ProjectId']);

    if (VM[rowID] == null) {
        VM[rowID] = {};
    }

    VM[rowID].ID = checkJSON(instance['ProjectId']);
    //VM[rowID].ID = checkJSON(instance[i]['ProjectName']);
    VM[rowID].ProjectDescription = checkJSON(instance['ProjectName']);
    //VM[rowID].ID = checkJSON(instance[i]['Created']);
    //VM[rowID].ID = checkJSON(instance[i]['ExternalPeojectId']);
    //VM[rowID].ID = checkJSON(instance[i]['MaxMachines']);
    //VM[rowID].ID = checkJSON(instance[i]['ProjectDescription']);
    VM[rowID].dateEnded = checkJSON(instance['ProjectEndDate']).replace(" ", "").slice(0, 10);
    VM[rowID].dateCreated = checkJSON(instance['ProjectStartDate']).replace(" ", "").slice(0, 10);
    VM[rowID].type = checkJSON(instance['ProjectType']);
    VM[rowID].projectLead = checkJSON(instance['ProjectLeader']);


    //VM[rowID].status = $("#instancestatus").val();
    VM[rowID].status = checkJSON(instance['ProjectStatus']);
    //alert('sdf');
    //alert(VM[rowID].status);
    //VM[rowID].ID = checkJSON(instance[i]['VlanId']);
    //VM[rowID].ID = checkJSON(instance[i]['ProjectLeader']);
    if (VM[rowID].status == "Deployed" || VM[rowID].status == "Deleted") {
        getInstanceDOM(VM[rowID]);
    }


}

function getInstanceDOM(instance) {

    var row = $('#VM' + instance.ID);

    var cellID, cellDescription, cellHostIP, cellType, cellDateCreated, cellStatus;
    if (row.length == 0) {

        row = $('#instances > tbody')[0].insertRow(-1);
        row.id = "VM" + instance.ID;
        $(row).addClass('instance enabled');
        //!!!!!!!!!!!!!!!need to be changed to include both ral and osrl

        row.style.cursor = "pointer";



        /*
         if (instance.containerStatus != "Running") {
         $(cellStatus).html(status);
         enableProgressBar(instance);
         }
         else {
         disableProgressBar(instance);
         }*/

        cellID = row.insertCell(0);
        cellID.id = 'id';
        cellID.innerHTML = instance.ID;
        cellID.style.color = "#004D86";
        cellID.setAttribute('width', '20px');

        cellDescription = row.insertCell(1);
        cellDescription.id = 'ProjectDescription';
        cellDescription.innerHTML = instance.ProjectDescription;
        cellDescription.setAttribute('width', '200px');

        /*cellHostIP = row.insertCell(3);
         cellHostIP.id = "ip";
         $(cellHostIP).addClass('idle');
         cellHostIP.innerHTML = instance.IP;*/

        cellType = row.insertCell(2);
        cellType.id = 'type';
        //$(cellType).addClass('idle');
        cellType.innerHTML = instance.type;
        cellType.setAttribute('width', '94px');

        cellDateCreated = row.insertCell(3);
        cellDateCreated.id = 'dateCreated';
        //$(cellDateCreated).addClass('idle');
        cellDateCreated.innerHTML = instance.dateCreated;
        // cellDateCreated.setAttribute('width', '93px');

        cellDateEnded = row.insertCell(4);
        cellDateEnded.id = 'dateEnded';
        //$(cellDateEnded).addClass('idle');
        cellDateEnded.innerHTML = instance.dateEnded;
        // cellDateEnded.setAttribute('width', '78px');
        cellProjectLead = row.insertCell(5);
        cellProjectLead.innerHTML = instance.projectLead;
        cellProjectLead.setAttribute('width', '70px');
        cellProjectLead.id = 'projectLead';

        cellStatus = row.insertCell(6);
        cellStatus.id = 'status';
        // cellStatus.setAttribute('width', "98px");
        cellStatus.innerHTML = instance.status;



        //$(cellID).hide();

        //no longer need custom name here
        /*cellCustomName = row.insertCell(1);
         cellCustomName.id = 'customName';
         disableCustomName(instance);*/

        //Update Machine Status 
        if (instance.status == "Deleted") {
            $(row).addClass("deleted");
            $(row).addClass("del");
            $(row).find('td').css('color', 'grey');
            //$(row).css("color", "red");
            //  document.getElementById('VM' + instance.ID).style.visibility="collapse";
            x = x - 1;
        }
        else {
            if (instance.class == "1")
                row.setAttribute('ondblclick', "window.open('osrl.php?id=' + this.id.slice(2));");
            else
                row.setAttribute('ondblclick', "window.open('RAL.php?id=' + this.id.slice(2));");
        }

        //$(cellStatus).attr("colSpan", 4);

    } else {
        row.show();
        cellID = $(row).find('#id');
        cellCustomName = $(row).find('#customName');
        cellHostName = $(row).find('#hostName');
        cellHostIP = $(row).find('#ip');
        cellType = $(row).find('#type');
        cellDateCreated = $(row).find('#dateCreated');
        cellStatus = $(row).find('#status');
    }




    /*Update Menu Buttons
     if ($(row).hasClass('selected')) {
     updateMenuButtons(instance);
     
     }*/
}

function showDeletedProjects() {
    //document.getElementById("VM377").style.visibility="visible";
    $(".del").addClass("toggle");
    $(".del").removeClass("deleted");
    $("#vmCount").html(vmCount);

    document.getElementById("showDeleted").style.display = "none";
    document.getElementById("hideDeleted").style.display = "inline";
}
function hideDeletedProjects() {
    //document.getElementById("VM377").style.visibility="visible";
    $(".del").removeClass("toggle");
    $(".del").addClass("deleted");
    $("#vmCount").html(x);

    document.getElementById("showDeleted").style.display = "inline";
    document.getElementById("hideDeleted").style.display = "none";
}
function getInstanceStatus(instance, instanceID) {
    var status;
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'GET',
        // async: true,
        // timeout: 5000,
        data: {oper: 'getProjectStatus', projectId: instanceID, id: currentuser},
        url: 'php/api.php',
        dataType: 'json',
        success: function(data) {
            status = checkJSON(data['projectStatus']);
            x = x + 1;
            //document.getElementById("instancestatus").value = status;
            updateInstance(instance, status);

        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            z = confirm('Didn\'t get Project ' + instanceID + '\'s status data. Do you want to try again?');
            if (z)
                getInstanceStatus(instance, instanceID);
        }
    });
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

    //quickRefresh();
}

function disableProgressBar(instance) {
    $("#VM" + instance.ID).find(".working").hide();
    $("#VM" + instance.ID).find(".idle").show();
}

/*************************************************************************************/
/**Custom Name Functions **/
/*************************************************************************************/

function enableCustomName(instance) {
    var currentField = $('#VM' + instance.ID).find('#customName');
    var name = instance.containerCustomName;
    if (name == "") {
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
    var currentField = $('#VM' + instance.ID).find('#customName');
    var name = instance.containerCustomName;
    if (name == "") {
        name = "Custom Name";
    }
    currentField.html(name);
}

function removeWatermark(instance) {
    var currentField = $('#VM' + instance.ID).find('#customName>:input');
    var name = instance.containerCustomName;

    if (name == "") {
        currentField.val("");
    }
    return false;
}

function addWatermark(instance) {
    var currentField = $('#VM' + instance.ID).find('#customName>:input');
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
function showAlertWithText(operation, type, instance, text) {
    //hideAlert();
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
            setTimeout(hideAlert, 5000);
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

/**********************transition between pages **************************/
function settings() {
    $('.main').fadeOut('fast', function() {
        $('.settings').show('fast');
    });
    var currentuser = $("#currentuser").html();
    //getUserRole(currentuser);
}
function detail() {
    $('.main').fadeOut('fast', function() {
        $('.details').show('fast');
    });
}
function createProject(projecttype) {
    window.open("CreateProject.php?projecttype=" + projecttype);
}

function initialDeploy() {
    $('.main').fadeOut('fast', function() {
        $('.settings').fadeOut('fast');
        $('.details').fadeOut('fast');
        $('.edit').fadeOut('fast');
        $('.initialDeploy').show('fast');
    });
}


function main() {
    $('.settings').fadeOut('fast', function() {
        $('.details').fadeOut('fast');
        $('.createProject').fadeOut('fast');
        $('.initialDeploy').fadeOut('fast');
        $('.main').show('fast');
        $('.edit').fadeOut('fast');
    });
}

function edit() {
    $('.main').fadeOut('fast', function() {
        $('.settings').fadeOut('fast', function() {
            $('.edit').show('fast');
        });
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
    var alertType = {
        INIT: 0,
        SPLASH: 1,
        SUCCESS: 2,
        FAILURE: 3,
        ERR: 4
    }
    ;
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
}

function showDeletionSplash() {
    $('#alert-box.deletion').fadeOut('fast');
    $('.deleteSplash').fadeIn('fast');
}
//validate the URL user inputs
function validateURL(value) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(value);
}

// The query for the twiki Details     
function requestTwiki() {

    var twiki = document.getElementById("Twiki").value;
    if (validateURL(twiki)) {

        twiki = twiki.replace(" ", "").replace("   ", "").replace("\n", "");

        $.ajax({
            type: 'POST',
            url: 'php/fetchTwiki.php',
            data: ({Twiki: twiki}),
            async: true,
            cache: false,
            beforeSend: function(xhr) {
            },
            success: function(data) {
                var count = 0;
                for (var key in data) {
                    count++;
                }
                if (count > 55) {
                    requestTwikiSuccess(data);

                }
                else
                    showAlert(FUNCTION.PROJECT_DETAIL, alertType.ERR, null);


            },
            error: function(xhr, status, error) {
                showAlert(FUNCTION.PROJECT_DETAIL, alertType.ERR, null);
            },
            complete: function(xhr, status) {
            }
        });

    }
    else {
        showAlert(FUNCTION.PROJECT_DETAIL, alertType.ERR, null);
    }
}

function requestTwikiSuccess(instances) {



    document.getElementById("ProjectName").value = JSON.parse(instances)["Project Name"].replace("?                                              ", "").replace("?", "");
    document.getElementById("ProjectDescription").value = JSON.parse(instances)["Project Description"].replace("?                                              ", "").replace("?", "");
    document.getElementById("ProjectType").value = JSON.parse(instances)["Project Type"];
    document.getElementById("ProjectStatus").value = "Created";
    //  document.getElementById("PSDate").value = convertDateFromText(JSON.parse(instances)["Execution Start"]);

//    document.getElementById("PEDate").value = convertDateFromText(JSON.parse(instances)["Execution End"]);

    // document.getElementById("PLEng").value = JSON.parse(instances)["Technology Lead"];

    document.getElementById("LabtoolProjectId").value = JSON.parse(instances)["ISVe Lab ID"];

    var labID = document.getElementById("LabtoolProjectId").value;
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
    else
        requestUserandMachine(labID);

}

function validateEmail(email) {
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(email);
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
            checkChangeDate(document.getElementById("ProjectStartDate"), startdate);
            checkChangeDate(document.getElementById("ProjectEndDate"), enddate);
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
                        $('#CreateProjectUsersTable.selectable tr').slice(1).remove();
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
                //$('#mtable').append(data);
                $.each(machines, function(key, val) {
                    var newmachine = $("<tr><td>" + val['MachineHardware'].toString() + "</td><td>" + val['MachineSerialNumber'].toString() + "</td><td>" + val['MachineStartDate'].toString() + "</td><td>" + val['MachineEndDate'].toString() + "</td><td>" + val['MachineSP'].toString() + "</td><td>" + val['MachineIP'].toString() + "</td><td>" + val['MachineName'].toString() + "</td><td>" + val['MachineOS'].toString() + "</td></tr>");
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

function checkChange(txtInput, currentValue) {
    txtInput.value = currentValue;
}
function checkChangeDate(txtInput, currentValue) {
    txtInput.value = currentValue;
}

function CreateProject() {

    var admin_email = $("#currentuser").html();
    projecttype = $('#projecttype').html();

    if (validateCreateProjectForm()) {
        showAlert(FUNCTION.PROJECT_CREATE, alertType.SPLASH, null);
        var ProjectAttriTable = {};
        // Remove header from fields table

        ProjectAttriTable['ProjectName'] = document.getElementById("ProjectName").value;
        ProjectAttriTable['ProjectDescription'] = document.getElementById("ProjectDescription").value.substring(0, 255);
        ProjectAttriTable['ProjectLeader'] = document.getElementById("ProjectLeader").value;
        ProjectAttriTable['ProjectClassId'] = projecttype;
        ProjectAttriTable['ProjectType'] = document.getElementById("ProjectType").value;
        ProjectAttriTable['vlanId'] = document.getElementById("vlanId").value;
        ProjectAttriTable['LabtoolProjectId'] = document.getElementById("LabtoolProjectId").value;

        ProjectAttriTable['ProjectStartDate'] = convertDateFromText(document.getElementById("ProjectStartDate").value.replace(" ", ""));
        ProjectAttriTable['ProjectEndDate'] = convertDateFromText(document.getElementById("ProjectEndDate").value.replace(" ", ""));
        ProjectAttriTable['MaxMachines'] = 0;
        ProjectAttriTable['ProjectTwikiURL'] = document.getElementById("Twiki").value;


        ProjectAttriTable = JSON.stringify(ProjectAttriTable);

        // Machines
        /*
         var machinesTable = {};
         
         var tabl = document.getElementById('mtable');
         
         var l = tabl.tBodies[0].rows.length;
         var i;
         
         for (i = 1; i < l; i++)
         {
         var machineTable = {};
         var tr = tabl.tBodies[0].rows[i];
         var td = $(tr).find('td');
         machineTable['MachineHardware'] = td.eq(0).text();
         machineTable['MachineSerialNumber'] = td.eq(1).text();
         machineTable['MachineStartDate'] = convertDateFromText(td.eq(2).text().replace(" ", ""));
         machineTable['MachineEndDate'] = convertDateFromText(td.eq(3).text().replace(" ", ""));
         machineTable['MachineSP'] = td.eq(4).text();
         machineTable['MachineIP'] = td.eq(5).text();
         machineTable['MachineName'] = td.eq(6).text();
         machineTable['MachineOS'] = td.eq(7).text();
         machinesTable[Object.keys(machinesTable).length] = machineTable;
         }
         
         machinesTable = JSON.stringify(machinesTable);*/
        //Users
        var usersTable = {};

        // Remove header from users table
        $('#headerUsersFields').remove();
        var utable = document.getElementById('CreateProjectUsersTable');
        var len = utable.tBodies[0].rows.length;

        for (i = 1; i < len; i++)
        {
            var tr = utable.tBodies[0].rows[i];
            var td = $(tr).find('td');
            var userTable = {};
            userTable['UserName'] = td.eq(0).text();

            if (!validateEmail(td.eq(1).text().replace(" ", "").replace("\n", "")))
                $("#detaillog").append("<p>Partener SSO seems weird.\n</p>");
            else {
                userTable['Email'] = td.eq(1).text().replace(" ", "").replace("\n", "");
                usersTable[Object.keys(usersTable).length] = userTable;
            }
        }
        /*  $('#CreateProjectUsersTable').slice(1).find('tr').each(function() {
         
         var td = $(this).find('td');
         var userTable = {};
         alert(td.eq(0).text());
         userTable['UserName'] = td.eq(0).text();
         userTable['FirstName'] = td.eq(1).text();
         userTable['MiddleInitial'] = td.eq(2).text();
         userTable['LastName'] = td.eq(3).text();
         userTable['Email'] = td.eq(4).text();
         usersTable[Object.keys(usersTable).length] = userTable;
         });*/
        usersTable = JSON.stringify(usersTable);
        $.ajax({
            type: 'POST',
            //async: 'false',
            // timeout: 5000,
            data: {oper: 'createProject', id: admin_email,
                projectDetails: ProjectAttriTable, users: usersTable},
            dataType: 'json',
            // contentType: 'application/json;charset=utf-8',
            url: 'php/api.php',
            success: function(data) {
                if (data['http']['http_message'].toString() != "OK") {
                    $("#detaillog").append("<p>Create project failed.\n" + data['error'] + "</p>");
                    showAlertWithText(FUNCTION.PROJECT_CREATE, alertType.ERR, null, document.getElementById("detaillog").innerHTML);
                    $("#detaillog").html("");
                }
                else
                {
                    var project_id = data['data']["ProjectId"];
                    // updateStatus("created", project_id);
                }
            },
            error: function() {
                // TODO: how to get more information here? Should have something 
                // also written in the results.
                alert('Didn\'t update the project status succesfully! Please double-check Labtool and Twiki.');
            }
        });

    }
}
function updateStatus(newStatus, id) {

    var admin_email = $("#currentuser").html();
    var project_id = id;
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
                $("#detaillog").append("<p>Update project status failed.\n</p>");
            }
            updateMachines(project_id);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t update the project status succesfully! Please double-check Labtool.');
        }
    });
}
function updateMachines(id) {
    /*
     * Calls appropriate function in the php folder to give the data that we weant.
     * The format of the data is given in the function func.
     */
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = id;


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
                $("#detaillog").append("<p>Update machine list failed.\n</p>");
            }
            if (!(document.getElementById("detaillog").innerHTML == null || document.getElementById("detaillog").innerHTML == "")) {
                showAlertWithText(FUNCTION.PROJECT_CREATE, alertType.ERR, null, document.getElementById("detaillog").innerHTML);
                $("#detaillog").html("");
            }
            else
                showAlert(FUNCTION.PROJECT_CREATE, alertType.SUCCESS, null);
        },
        error: function() {

            showAlert(FUNCTION.PROJECT_CREATE, alertType.FAILURE, null);
        }
    });
}
function validateCreateProjectForm() {
    x = document.getElementById("ProjectName").value;
    if (x == null || x == "") {
        alert("Project name must be filled out");
        return false;
    }
    else {
        var startdate = document.getElementById("ProjectStartDate").value;
        if (startdate == null || startdate == "" || startdate == "undefined") {
            var r = confirm("You didn't enter an startdate.\n Do you want to proceed?");
            if (r == false)
                return false;
            else {
                var enddate = document.getElementById("ProjectEndDate").value;
                if (enddate == null || enddate == "" || enddate == "undefiend") {
                    var r = confirm("You didn't enter an enddate.\n Do you want to proceed?");
                    return r;
                }
                else {
                    //alert(convertDateFromText(enddate));
                    document.getElementById("ProjectEndDate").value = enddate;
                    return true;
                }
            }
        }
        else {
            document.getElementById("ProjectStartDate").value = startdate;

            var enddate = document.getElementById("ProjectEndDate").value;
            if (enddate == null || enddate == "" || enddate == "undefined") {
                var r = confirm("You didn't enter an enddate.\n Do you want to proceed?");
                return r;
            }
            else {
                //alert(convertDateFromText(enddate));
                document.getElementById("ProjectEndDate").value = enddate;
                return true;
            }
        }
    }

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
function convertDateFromNumber(startdate) {
    return startdate.slice(0, 2) + startdate.slice(3, 5) + startdate.slice(7);
}

function addCreateProjectMachine() {
    $('#tempmachinetable').append("<tr class='addCreateProjectUser'><td ><input ></td>" +
            "<td><input ></td>" +
            "<td ><input ></td>" +
            "<td ><input ></td>" +
            "<td><input  ></td></tr>");
    $("#empty_tr").hide();
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
            $("#delete_btn2").addClass('active');
        });
    });

    $('#tempmachinetable tr').remove();
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

function addCreateProjectUser() {
    /*   $("<table id='tempusertable'><tr class='addCreateProjectUser'><td ><input  id='userName_value' ></td>" +
     "<td><input  id='userEmail_value' ></td>" +
     "<td ><input  id='userFirst_value' ></td>" +
     "<td ><input id='userMiddle_value'></td>" +
     "<td><input  id='userLast_value' ></td></tr></table>").insertBefore('#userTable');
     //"<tr><td  colspan = '6' align='center' text-align='center'><button id='submitUser'style='margin: 0; text-align: center;' onclick='createProjectSubmitUser()'>Submit user</button></td></tr></table>")*/
    $('#tempusertable').append("<tr class='addCreateProjectUser'><td width='213px'><input  id='userName_value' ></td>" +
            "<td><input  id='userEmail_value' ></td></tr>");

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
            $("#delete_btn").addClass('active');
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


function deleteProject() {
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid = $(".selected").find("td:first").html();
    $.ajax({
        type: 'POST',
        // async: 'false',
        //timeout: 5000,
        data: {oper: 'deleteProject', projectId: projectid, id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function() {
            alert('You have deleted this project!');
            document.location.reload();
            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Delete Project Failed!');
        }
    });
}



function ChangeLeader() {

    var NewLeader = {};
    NewLeader["ProjectLeader"] = $("#Leader2").val();
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid;
    projectid = $("#projectid").html();

    NewLeader = JSON.stringify(NewLeader);
    $.ajax({
        type: 'POST',
        //async: 'false',
        // timeout: 5000,
        data: {oper: 'updateProjectDetail', projectId: projectid, id: currentuser, projectFields: NewLeader},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            alert("You have successfully submitted your change!");
            document.location.reload();
            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });
}

function getUserRole(currentuser) {

    $.ajax({
        type: 'GET',
        //async: 'false',
        // timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            var i = 0;
            if (checkForValue(data['data'], "End_User")) {
                $("#alert-desc3").show();
                i++;
            }
            if (checkForValue(data['data'], "ISVe_Project_Admin")) {
                $("#alert-desc4").show();
                i++;
            }
            if (checkForValue(data['data'], "Lab_Engineer")) {
                $("#alert-desc2").show();
                i++;
            }
            if (checkForValue(data['data'], "Tool_Admin")) {
                $("#alert-desc5").show();
                i++;
            }
            if (i == 1) {
                $('.alert-desc').hide();
                $("#noRoletoChange").show();
                $("#RoleChange").hide();
            }
            else {
                // $('.alert-desc').show();
                $("#noRoletoChange").hide();
                $("#RoleChange").show();
            }


        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });

}
function checkUserRole(currentuser) {
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'GET',
        //async: 'false',
        // timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {

            if (!checkForValue(data['data'], "ISVe_Project_Admin")) {
                alert("Sorry, you do not have the access to Project Admin's page. Please go back and check the URL!");
                window.location.href = "index.php";
                //header("Location: http://osrl-dev.us.oracle.com/SVL6.1/index.php", false);
            }


        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });

}
function checkUserRoleforCreateProject() {
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'GET',
        //  async: 'false',
        //  timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                showAlert(FUNCTION.USER_LOGIN, alertType.FAILURE, null);
            }
            else {


                if (!checkForValue(data['data'], "End_User")) {
                    showAlert(FUNCTION.USER_LOGIN, alertType.ERR, null);
                    window.location.href = "index.php";
                    //header("Location: http://osrl-dev.us.oracle.com/SVL6.1/index.php", false);
                }

                else {
                    var i = 0;
                    if (checkForValue(data['data'], "End_User")) {
                        $("#alert-desc3").show();
                        i++;
                    }
                    if (checkForValue(data['data'], "ISVe_Project_Admin")) {
                        $("#alert-desc4").show();
                        i++;
                    }
                    if (checkForValue(data['data'], "Lab_Engineer")) {
                        $("#alert-desc2").show();
                        i++;
                    }
                    if (checkForValue(data['data'], "Tool_Admin")) {
                        $("#alert-desc5").show();
                        i++;
                    }
                    if (i == 1) {
                        $('[name="ChangeRols"]').hide();
                        $("#noRoletoChange").show();
                        $("#RoleChange").hide();
                    }
                    else {
                        // $('.alert-desc').show();
                        $("#noRoletoChange").hide();
                        $("#RoleChange").show();
                    }
                }

            }
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            showAlert(FUNCTION.USER_LOGIN, alertType.FAILURE, null);
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

function deleteEntry() {
    //alert("hi!");
    $('.selectable tr.selected').remove();
    $('#delete_btn2').removeClass('active');
    $('#delete_btn').removeClass('active');
}

function Clear() {
    var r = confirm("Are you sure you want to disgard all the changes?");
    if (r)
        location.reload();
}

function Cancel() {
    var r = confirm("Are you sure you want to close this window?");
    if (r)
        window.history.back();
}
function goToTwiki() {

    window.open("http://twiki.us.oracle.com/isve/search.html");
}