function getUserRole(currentuser) {


    $.ajax({
        type: 'GET',
       // async: 'false',
        //timeout: 5000,
        data: {oper: 'getUserRoles', id: currentuser},
        dataType: 'json',
        // contentType: 'application/json;charset=utf-8',
        url: 'php/api.php',
        success: function(data) {
            var i = 0;
       
            if (checkForValue(data['data'], "ISVe_Project_Admin")) {
                $("#alert-desc4").show();
                 $("#alert-desc4>a").addClass("gohref");
               i++;
            }
            if (checkForValue(data['data'], "Lab_Engineer")) {
                $("#alert-desc2").show();
                 $("#alert-desc2>a").addClass("gohref");
                i++;
            }
            if (checkForValue(data['data'], "Tool_Admin")) {
                $("#alert-desc5").show();
                 $("#alert-desc5>a").addClass("gohref");
                i++;
            }
            
            if (i==0)
            {
              window.location = "../SVL6.1/accountUnavailable.html";
            }
            else if (i==1){
               window.location = $(".gohref").attr("href");
            }
            else{
                $("#alert-box").show();
            }
        },
        error: function() {
           // TODO: how to get more information here? Should have something 
            // also written in the results.
         window.location = "../SVL6.1/accountUnavailable.html";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
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

