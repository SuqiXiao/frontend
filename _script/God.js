var roles = new Array();

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

//switch between tags
function settings() {
    $('.main').fadeOut('fast', function() {
        $('.settings').show('fast');
    });
    var currentuser = $("#currentuser").html();
    getUserRole(currentuser);
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

//retrieve the role of a specific user
function RetrieveRole() {


    $('#MA').prop('checked', false);
    $('#IA').prop('checked', false);
    $('#CR').prop('checked', false);
    $('#EU').prop('checked', false);
    $('#LE').prop('checked', false);

    var user = $("#RetrievePara").val();
    var admin = $("#currentuser").html();
    //alert(admin);
    // var roles = JSON.stringify($('#listCurrentRoles'));
    // var roles = "";
    if (user == "" || user == null)
        alert("Please choose a SSO user to manage!");
    else {
        $.ajax({
            type: 'GET',
            // async: 'false',
            //  timeout: 5000,
            //data: {oper: 'getUserRoles', id: user},
            data: {oper: 'getCurrentRoles', id: admin, user: user},
            dataType: 'json',
            // contentType: 'application/json;charset=utf-8',
            url: 'php/api.php',
            success: function(data) {
                if (data['http']['http_message'].toString() == "Forbidden") {
                    alert("Sorry, you do not have authorization to do that.");
                }
                else if (data['http']['http_message'].toString() != "OK") {
                    alert('Role retrieval is \"' + data['http']['http_message'].toString() + '".');
                }
                else {
                    if (checkForValue(data['data'], "End_User")) {
                        $('#EU').prop('checked', true);
                        roles.push("EU");

                    }
                    if (checkForValue(data['data'], "ISVe_Project_Admin")) {
                        $('#IA').prop('checked', true);
                        roles.push("IA");
                    }
                    if (checkForValue(data['data'], "Lab_Engineer")) {
                        $('#CR').prop('checked', true);
                        roles.push("CR");
                    }
                    if (checkForValue(data['data'], "Tool_Admin")) {
                        $('#MA').prop('checked', true);
                        roles.push("MA");
                    }
                    if (checkForValue(data['data'], "ISVe_Lead_Engineer")) {
                        $('#LE').prop('checked', true);
                        roles.push("LE");
                    }
                }
            },
            error: function() {
                // TODO: how to get more information here? Should have something 
                // also written in the results.
                alert('Role retrieval failed. Please try again!');
            }
        });
    }

}
//get this user's role
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
            if (data['http']['http_message'].toString() != "OK") {
                alert('Role retrieval is \"' + data['http']['http_message'].toString() + '".');
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
                    $('.alert-desc').hide();
                    $("#noRoletoChange").show();
                    $("#RoleChange").hide();
                }
                else {
                    //   $('.alert-desc').show();
                    $("#noRoletoChange").hide();
                    $("#RoleChange").show();
                }

            }

        },
        error: function() {
            // TODO: how to get more information here? Should have something 
            // also written in the results.
            alert('Didn\'t get user role. Please refresh the page.');
        }
    });

}
function checkUserRole(currentuser) {
    var currentuser;
    currentuser = $("#currentuser").html();
    $.ajax({
        type: 'GET',
        //  async: 'false',
        // timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {

            if (!checkForValue(data['data'], "Tool_Admin")) {
                alert("Sorry, you do not have the access to Tool Admin's page. Please go back and check the URL!");
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
function Save() {
    var user = $("#RetrievePara").val();
    var admin = $("#currentuser").html();
    var remove = "{";
    var removeindex = 0;
    var addindex = 0;
    var add = "{";
    if (!$('#LE').is(':checked') && roles.indexOf("LE") > -1) {
        alert("Sorry, you cannot change the Lead Engineer's role. Please do your changes in labtool.");
        $('#LE').prop('checked', true);
    }
    if ($('#LE').is(':checked') && roles.indexOf("LE") < 0) {
        alert("Sorry, you cannot change the Lead Engineer's role. Please do your changes in labtool.");
        $('#LE').prop('checked', false);

    }
    if (!$('#EU').is(':checked') && roles.indexOf("EU") > -1) {
        if (removeindex != 0) {
            remove = remove.concat(",");
        }
        remove = remove.concat('"End_User":true');
        removeindex = 1;
    }

    if (!$('#IA').is(':checked') && roles.indexOf("IA") > -1) {
        if (removeindex != 0) {
            remove = remove.concat(",");
        }
        remove = remove.concat('"ISVe_Project_Admin":true');
        removeindex = 1;
    }

    if (!$('#CR').is(':checked') && roles.indexOf("CR") > -1) {
        if (removeindex != 0) {
            remove = remove.concat(",");
        }
        remove = remove.concat('"Lab_Engineer":true');
        removeindex = 1;
    }

    if (!$('#MA').is(':checked') && roles.indexOf("MA") > -1) {
        if (removeindex != 0) {
            remove = remove.concat(",");
        }
        remove = remove.concat('"Tool_Admin":true');
        removeindex = 1;
    }
    if ($('#EU').is(':checked') && roles.indexOf("EU") < 0) {
        if (addindex != 0) {
            add = add.concat(",");
        }
        add = add.concat('"End_User":true');
        addindex = 1;
    }

    if ($('#IA').is(':checked') && roles.indexOf("IA") < 0) {
        if (addindex != 0) {
            add = add.concat(",");
        }
        add = add.concat('"ISVe_Project_Admin":true');
        addindex = 1;
    }

    if ($('#CR').is(':checked') && roles.indexOf("CR") < 0) {
        if (addindex != 0) {
            add = add.concat(",");
        }
        add = add.concat('"Lab_Engineer":true');
        addindex = 1;
    }

    if ($('#MA').is(':checked') && roles.indexOf("MA") < 0) {
        if (addindex != 0) {
            add = add.concat(",");
        }
        add = add.concat('"Tool_Admin":true');
        addindex = 1;
    }
    remove = remove.concat('}');
    add = add.concat('}');
    if (!(removeindex == 0 && addindex == 0)) {
        // alert(removeindex);
        // alert(removeindex);
        var r = confirm("Are you sure you want to make the changes?");
        if (r) {
            if (removeindex != 0) {
                $.ajax({
                    type: 'POST',
                    // timeout: 5000,
                    data: {oper: 'removeUserRoles', id: admin, user: user, roles: remove},
                    dataType: 'json',
                    url: 'php/api.php',
                    success: function(data) {
                        $('input:checkbox').removeAttr('checked');
                        $('#RetrievePara').val("");
                        while (roles.length > 0) {
                            roles.pop();
                        }
                        alert("You have successfully updated the changes.");
                    }
                });
            }
            if (addindex != 0) {
                $.ajax({
                    type: 'POST',
                    // timeout: 5000,
                    data: {oper: 'addUserRoles', id: admin, user: user, roles: add},
                    dataType: 'json',
                    url: 'php/api.php',
                    success: function(data) {
                        while (roles.length > 0) {
                            roles.pop();
                        }
                        $('input:checkbox').removeAttr('checked');
                        $('#RetrievePara').val("");
                        alert("You have successfully updated the changes.");
                    }
                });
            }
        }
    }
}
function SaveClose() {
    //   var func = window.close;
    Save();
    window.close();

}

function Cancel() {
    var r = confirm("Are you sure you want to disgard all the changes?");
    if (r)
        window.close();
}
function checkForValue(json, value) {
    for (key in json) {

        if (json[key] === value) {
            // alert(value);
            return true;
        }
    }
    return false;
}
