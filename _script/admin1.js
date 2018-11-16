var x = 0;
var vmCount;
var VM = {};
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

    $("html").click(function() {
        deactivateMenuButtons();

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

    deactivateMenuButtons();
    checkUserRole();

}

function getUserName() {
    var currentuser;
    currentuser = $("#currentuser").html();

    $.ajax({
        type: 'GET',
        //async: 'false',
       // timeout: 5000,
        url: 'php/api.php',
        data: {oper: "getUserName", id: currentuser},
        dataType: 'json',
        // contentType: 'application/json',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                alert('Get Username is \"' + data['http']['http_message'].toString() + '\"\n Didn\'t get user data');
            }
            else
                $("#user").html(checkJSON(data['data']["username"]));
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get user data. Please try again later.');
        }
    });
}



/** ******************************************************* 
 * Template/Menu/Table Row function
 *********************************************************/
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
    $('#delete_btn').addClass('active');
    $('#deploy_btn').addClass('active');
    document.getElementById('delete_btn').style.pointerEvents = 'auto';
    document.getElementById('deploy_btn').style.pointerEvents = 'auto';
}

function deactivateMenuButtons() {
    $("#delete_btn").removeClass('active');
    $("#deploy_btn").removeClass('active');
    document.getElementById('deploy_btn').style.pointerEvents = 'none';
    document.getElementById('delete_btn').style.pointerEvents = 'none';

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


//Empty the project table body
$("#tb").empty();

    var currentuser;
    currentuser = $("#currentuser").html();
       
    $.ajax({
        type: 'GET',
        async: 'true',
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
        var i = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                i++;
            }
        }
        return i;
    };
    vmCount = getLength(ps);


    /*
     var vmRemain = Math.max(5 - vmCount, 0);
     //$('#vmRemain').text(vmRemain);*/

    deactivateMenuButtons();
    $('.instance').hide();

    //Update VM Instances
    if (vmCount == 0) {
        $('#table_header').hide();
        $('#table_empty').show();
        disableMenuButtons();
    }

    else {
        $('#table_header').show();
        $('#table_empty').hide();
        for (var i = 0; i < vmCount; i++) {

            updateInstance(instances[i]);
            x = x + 1;
        }
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
        refreshState = false;

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
    VM[rowID].ProjectDescription = checkJSON(instance['ProjectName']);
    VM[rowID].dateEnded = checkJSON(instance['ProjectEndDate']).replace(" ", "").slice(0, 10);
    VM[rowID].dateCreated = checkJSON(instance['ProjectStartDate']).replace(" ", "").slice(0, 10);
    VM[rowID].type = checkJSON(instance['ProjectType']);
    VM[rowID].externalID = checkJSON(instance['LabtoolProjectId']);
    VM[rowID].projectLead = checkJSON(instance['ProjectLeader']);
    VM[rowID].status = checkJSON(instance['ProjectStatus']);

    getInstanceDOM(VM[rowID]);
}

function getInstanceDOM(instance) {

    var row = $('#VM' + instance.ID);

    var cellID, cellDescription, cellHostIP, cellType, cellDateCreated, cellStatus, cellExternalID;
    // if (row.length == 0) {

    row = $('#instances > tbody')[0].insertRow(-1);
    row.id = "VM" + instance.ID;
    row.labtoolID = instance.externalID;
    $(row).addClass('instance enabled');
    //!!!!!!!!!!!!!!!need to be changed to include both ral and osrl
    row.setAttribute('ondblclick', "window.open('EditProject.php?id=' + this.id.slice(2)+'&labtoolID='+this.labtoolID);");
    row.style.cursor = "pointer";




    cellDescription = row.insertCell(0);
    cellDescription.id = 'ProjectDescription';
    cellDescription.innerHTML = instance.ProjectDescription;
    cellDescription.setAttribute('width', '180px');


    cellType = row.insertCell(1);
    cellType.id = 'type';
    //$(cellType).addClass('idle');
    cellType.innerHTML = instance.type;
    cellType.setAttribute('width', '40px');

    cellDateCreated = row.insertCell(2);
    cellDateCreated.id = 'dateCreated';
    //$(cellDateCreated).addClass('idle');
    cellDateCreated.innerHTML = convertDateToText(instance.dateCreated);
    cellDateCreated.setAttribute('width', '70px');

    cellDateEnded = row.insertCell(3);
    cellDateEnded.id = 'dateEnded';
    //$(cellDateEnded).addClass('idle');
    cellDateEnded.innerHTML = convertDateToText(instance.dateEnded);
    cellDateEnded.setAttribute('width', '70px');

    cellStatus = row.insertCell(4);
    cellStatus.id = 'status';
    //  cellStatus.setAttribute('width', "30px");
    cellStatus.innerHTML = instance.status;

    cellProjectLead = row.insertCell(5);
    cellProjectLead.innerHTML = instance.projectLead;
    cellProjectLead.setAttribute('width', '70px');
    cellProjectLead.id = 'projectLead';

    cellExternalID = row.insertCell(6);
    cellExternalID.id = "ExternalID";
    // $(cellHostIP).addClass('idle');
    var Eid = instance.externalID;

    if (Eid != null && Eid != "" && Eid != "undefined") {

        cellExternalID.innerHTML = Eid;
        cellExternalID.setAttribute('onclick', "window.open('?pid=' +this.innerHTML);")
        cellExternalID.style.color = "#004D86";
    }
    else
        cellExternalID.innerHTML = "N/A";


    if (instance.status == "Deleted") {
        $(row).addClass("deleted");
        $(row).addClass("del");
        //  document.getElementById('VM' + instance.ID).style.visibility="collapse";
        x = x - 1;

    }


}
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
/********************************************************
 //hide/show deleted project functions
 ********************************************************/

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
/*
 function getInstanceStatus(instance, instanceID) {
 var status;
 var currentuser;
 currentuser = $("#currentuser").html();
 $.ajax({
 type: 'POST',
 async: true,
 timeout: 5000,
 data: {oper: 'getProjectStatus', projectId: instanceID, id: currentuser},
 url: 'php/project.php',
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
 */

function checkJSON(prop) {
    if (prop) {
        return prop;
    } else {
        return '';
    }
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
/*
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
 */

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
function createActionFunction(func, instance) {
    return function() {
        actionVM(func, instance);
        return false;
    }
}
function setIcon(icon) {
    $('#alert-icon').html(icon.path);
}
function setBtn(btn, operation, instance) {
    $('#btn1').off('click');
    $('#btn2').off('click');

    switch (btn) {
        case alertBtn.OK_CANCEL:
            $('#btn1').on("click", function() {
                confirmdelete()
            });
            $('#btn1').val(btn.btn1);
            $('#btn1').show();
            $('#btn1').focus();

            $('#btn2').on('click', hideAlert);
            $('#btn2').val(btn.btn2);
            $('#btn2').show();
            $('#btn2').focus();
            break;
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
function actionVM(func, vm) {
//var command = func.text;
    var user = $("#currentuser").html();
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
}

function showDeletionSplash() {
    $('#alert-box.deletion').fadeOut('fast');
    $('.deleteSplash').fadeIn('fast');
}
/*
 // the table to store the values that needs to be updated 
 var fieldsTable = {};
 
 function updateFields(id, value) {
 fieldsTable[id] = value;
 }
 
 function updateStatus(value) {
 // alert("value");
 newStatus = value;
 // alert(newStatus);
 }
 
 function updateProjectDetail() {
 /*
 * Calls appropriate function in the php folder to give the data that we weant.
 * The format of the data is given in the function func.
 */
/*   var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 
 //check if we need to update the status as well
 
 //alert(newStatus+"2");
 //newStatus = JSON.stringify(newStatus);
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'updateProjectStatus', projectId: projectid, id: currentuser, projectStatus: newStatus},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
 success: function(data) {
 //alert("You have successfully submitted your new status!")
 getProjectStatus(currentuser, projectid);
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t update the project detail succesfully!');
 }
 });
 
 
 fieldsTable = JSON.stringify(fieldsTable);
 
 
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'updateProjectDetail', projectId: projectid, id: currentuser, projectFields: fieldsTable},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
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
 /**
 function requestProjectDetailsBasic() {
 /*
 * Calls appropriate function in the php folder to give the data that we weant.
 * The format of the data is given in the function func.
 */
/**   var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'getProjectDetail', projectId: projectid, id: currentuser},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
 success: function(data) {
 requestProjectDetailsBasicSuccess(data);
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t get data');
 }
 });
 getProjectStatus(currentuser, projectid);
 
 
 }
 
 function getProjectStatus(email, project_id) {
 
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'getProjectStatus', projectId: project_id, id: email},
 url: 'php/project.php',
 dataType: 'json',
 success: function(data) {
 document.getElementById("ProjectStatus").value = checkJSON(data["projectStatus"]);
 newStatus = checkJSON(data["projectStatus"]);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t get data');
 }
 });
 }
 function requestProjectDetailsBasicSuccess(instances) {
 
 document.getElementById("ProjectId").innerHTML = checkJSON(instances["ProjectId"]);
 document.getElementById("ProjectTypeId").value = checkJSON(instances["ProjectTypeId"]);
 document.getElementById("ProjectStartDate").value = checkJSON(instances["ProjectStartDate"]);
 document.getElementById("ProjectEndDate").value = checkJSON(instances["ProjectEndDate"]);
 //alert(checkJSON(instances["ProjectTwikiURL"]));
 document.getElementById("PId").value = checkJSON(instances["ProjectTwikiURL"]);
 }
 /*
 function requestProjectDetailsMachine() {
 
 var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 //data: {oper: 'getMachineList', projectId: projectid, id: currentuser},
 data: {oper: 'getMachineList', projectId: 266, id: ""},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/machines.php',
 success: function(data) {
 console.log(data);
 requestMachineDetailsSuccess(data);
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t get data');
 }
 });
 
 }
 
 function requestProjectDetailsUser() {
 
 var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'getProjectDetail', projectId: projectid, id: currentuser},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
 success: function(data) {
 document.getElementById("Leader2").value = checkJSON(data["ProjectLeader"]);
 
 
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t get data');
 }
 });
 //  call get User list
 $.ajax({
 type: 'POST',
 async: 'true',
 timeout: 5000,
 data: {oper: 'getUserList', projectId: projectid, id: currentuser},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/users.php',
 success: function(data) {
 requestUserDetailsSuccess(data);
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Didn\'t get data');
 }
 });
 }
 
 
 function requestMachineDetailsSuccess(instances) {
 //document.getElementById("Machines2").value = checkJSON(instances[0]["Machines"]);
 iniTable("ProjectDetailTable", instances, "Machines");
 }
 
 function requestUserDetailsSuccess(instances) {
 
 //document.getElementById("Users2").value = checkJSON(instances[0]["Participants"][1]);
 iniTable("ProjectDetailTable", instances, "Participants");
 }
 
 
 
 function addRow(tableID, index, attr) {
 
 var table = document.getElementById(tableID);
 var rowCount = table.rows.length;
 var row = table.insertRow(rowCount);
 //for adding machines
 if (attr == 0) {
 
 var cell1 = row.insertCell(0);
 cell1.style.padding = "0px";
 cell1.style.border = "0px";
 var element1 = document.createElement("input");
 cell1.appendChild(element1);
 
 var cell2 = row.insertCell(1);
 cell2.style.border = "0px";
 cell2.style.padding = "0px";
 var element2 = document.createElement("input");
 element2.onclick = function() {
 //alert(element1.value.substring(element1.value.length-1,element1.value.length));
 deleteMachineFromProject(element1.value.substring(element1.value.length - 1, element1.value.length));
 };
 element2.type = "button";
 element2.name = "txtbox[]";
 element2.value = "Delete";
 cell2.appendChild(element2);
 }
 //for adding users
 else {
 var cell1 = row.insertCell(0);
 cell1.style.border = "0px";
 cell1.style.padding = "0px";
 
 var cell2 = row.insertCell(1);
 cell2.style.border = "0px";
 cell2.style.padding = "0px";
 var element2 = document.createElement("input");
 element2.name = "parti";
 cell2.appendChild(element2);
 
 var cell3 = row.insertCell(2);
 cell3.style.border = "0px";
 cell3.style.padding = "0px";
 var element3 = document.createElement("input");
 element3.name = "parti_email";
 cell3.appendChild(element3);
 
 var cell4 = row.insertCell(3);
 cell4.style.border = "0px";
 cell4.style.padding = "0px";
 var element4 = document.createElement("input");
 element4.onclick = function() {
 deleteUserFromProject(element3.value);
 };
 element4.type = "button";
 element4.name = "txtbox[]";
 element4.value = "Delete";
 cell4.appendChild(element4);
 }
 
 }
 */

/**Specificlly for create project
 function addRow2(tableID){
 var table = document.getElementById(tableID);
 var rowCount = table.rows.length;
 var row = table.insertRow(rowCount-1);
 var cell1 = row.insertCell(0);
 cell1.style.border = "0px";
 cell1.style.padding = "0px";
 var element1 = document.createElement("input");
 element1.value = document.getElementById(tableID).rows[rowCount-1].cells[0].firstChild.nodeValue;
 element1.name = "parti";
 cell1.appendChild(element1);
 
 var cell2 = row.insertCell(1);
 cell2.style.border = "0px";
 cell2.style.padding = "0px";
 var element2 = document.createElement("input");
 element2.value = document.getElementById(tableID).rows[rowCount-1].cells[1].firstChild.nodeValue;
 element2.name = "parti_email";
 cell2.appendChild(element2);
 
 var cell3 = row.insertCell(2);
 cell3.style.border = "0px";
 cell3.style.padding = "0px";
 var element3 = document.createElement("input");
 element3.onclick = function() {
 document.getElementById(tableID).deleteRow(rowCount);
 };
 element3.type = "button";
 element3.name = "txtbox[]";
 element3.value = "Delete";
 cell3.appendChild(element3);
 }**/
/**function addCreateProjectMachine() {
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
 
 rows = $('.selectable tr');
 rows.slice(2).click(function() {
 rows.removeClass('selected');
 $(this).addClass('selected');
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
/*}
 
 /**function addCreateProjectUser() {
 /*   $("<table id='tempusertable'><tr class='addCreateProjectUser'><td ><input  id='userName_value' ></td>" +
 "<td><input  id='userEmail_value' ></td>" +
 "<td ><input  id='userFirst_value' ></td>" +
 "<td ><input id='userMiddle_value'></td>" +
 "<td><input  id='userLast_value' ></td></tr></table>").insertBefore('#userTable');
 //"<tr><td  colspan = '6' align='center' text-align='center'><button id='submitUser'style='margin: 0; text-align: center;' onclick='createProjectSubmitUser()'>Submit user</button></td></tr></table>")*/
/**  $('#tempusertable').append("<tr class='addCreateProjectUser'><td ><input  id='userName_value' ></td>" +
 "<td><input  id='userEmail_value' ></td>" +
 "<td ><input  id='userFirst_value' ></td>" +
 "<td ><input id='userMiddle_value'></td>" +
 "<td><input  id='userLast_value' ></td></tr>");
 
 }
 
 /**function createProjectSubmitUser() {
 
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
 
 rows = $('.selectable tr');
 rows.slice(2).click(function() {
 rows.removeClass('selected');
 $(this).addClass('selected');
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
//}
/**function deleteUserFromProject(user) {
 var user_email = user;
 //alert(user);
 var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'deleteUserFromProject', projectId: projectid, id: currentuser, user: user_email},
 //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
 success: function() {
 //alert('You have deleted this user to the project!');
 showAlert(FUNCTION.USER_DELETE);
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
 
 /**function deleteMachineFromProject(machine) {
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
 success: function() {
 showAlert(FUNCTION.MACH_DELETE);
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
 
 /**function AddMachineToProject() {
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
 success: function() {
 alert("You have successfully add this user!");
 document.location.reload();
 
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Add Machine to project failed!');
 }
 });
 
 }**/
function DonewithEdit() {
    var r = confirm("Do you want to close this window?");

    if (r == true)
    {
        window.close();
    }
    else
    {
        location.reload();
    }
}
/**function AddUserToProject() {
 var user_email = $('#newuseremail').val();
 if (!user_email) {
 alert("Please input the new user's email!");
 }
 var currentuser;
 currentuser = $("#currentuser").html();
 var projectid;
 projectid = $("#projectid").html();
 $.ajax({
 type: 'POST',
 async: 'false',
 timeout: 5000,
 data: {oper: 'addUserToProject', projectId: projectid, id: currentuser, user: user_email},
 //data: {oper: 'addMachineToProject', projectId: project_id, id: admin_email, machineId: machine_id},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
 success: function() {
 alert("You have added this user to the project!");
 
 document.location.reload();
 
 //  console.log(data);
 },
 error: function() {
 // TODO: how to get more information here? Should have something 
 // also written in the results.
 alert('Add user to project failed!');
 }
 });
 
 }**/

function deleteProject() {
    showAlert(FUNCTION.DELETE_PROJECT, alertType.INIT, null);
}
function confirmdelete() {
    var currentuser;
    currentuser = $("#currentuser").html();
    var projectid = parseInt($(".selected").prop('id').slice(2), 10);
    $.ajax({
        type: 'POST',
        //async: 'false',
        //timeout: 5000,
        data: {oper: 'deleteProject', projectId: projectid, id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                showAlert(FUNCTION.DELETE_PROJECT, alertType.FAILURE, null);
            }
            else {
                
                requestInstances();
                showAlert(FUNCTION.DELETE_PROJECT, alertType.SUCCESS, null);
                
            }
            //  console.log(data);
        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            showAlert(FUNCTION.DELETE_PROJECT, alertType.FAILURE, null);
        }
    });

}

function deployProject() {
 var projectid = parseInt($(".selected").prop('id').slice(2), 10);
 var labtoolID = $(".selected").find("td:eq(6)").html();
 //window.open('Deploy.php?id=' + projectid);
 window.open('EditProject.php?id=' + projectid+'&labtoolID='+labtoolID);
 }
 /**
 
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
 async: 'false',
 timeout: 5000,
 data: {oper: 'updateProjectDetail', projectId: projectid, id: currentuser, projectFields: NewLeader},
 dataType: 'json',
 // contentType: 'application/json;charset=utf-8',
 url: 'php/project.php',
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
 }**/

function deleteEntry() {
    $("tr.selected").remove();
}

function getUserRole(currentuser) {

    $.ajax({
        type: 'GET',
       // async: 'false',
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



        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get data');
        }
    });

}

function checkUserRole() {
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'GET',
       // async: 'false',
        //timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            if (data['http']['http_message'].toString() != "OK") {
                showAlert(FUNCTION.USER_LOGIN, alertType.FAILURE, null);
            }
            else {
                if (!checkForValue(data['data'], "ISVe_Project_Admin")) {
                    showAlert(FUNCTION.USER_LOGIN, alertType.ERR, null);
                    //window.location.href = "index.php";
                    
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
                    showAlert(FUNCTION.GET_PROJECT, alertType.SPLASH, null);
                    requestInstances();
                }
            }
        }
        ,
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
