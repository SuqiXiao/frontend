<?php
include_once  "/svl.init.php";
include_once  "core/mysql.php";
include_once  "php/login.php";

session_set_cookie_params(30*60);
session_start();

/*if(validateUser()){
//Already exists in User Table, so ready to use account.
        header("Location: index.php");
	exit(0);
}
elseif(alreadyRegistered()){
//Already has registered once. Needs to wait longer for account provisioning to complete.
	header("Location: bePatient.php");
	exit(-1);
}
else{
	$email=getenv("REMOTE_USER");
	$usr=isValidUser($email);
        if($usr!=null){
		set_session($usr);
                header("Location: index.php");
		exit(0);
	}
	if(!isAuthorized($email))
	{
		header("Location: unauthorized.html");
		exit(-1);
	}
}*/
?>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="_css/osrl.css" rel="stylesheet" type="text/css" />
<link href="_css/buttons.css" rel="stylesheet" type="text/css" />
<title>Oracle Solaris Remote Lab - Registration</title>
<script type="text/javascript" src="_script/jquery.js"></script>
<script type="text/javascript">
function requestVerification(){
	var usr = $('#username').val();
	var pass1= $('#password1').val();
	var pass2= $('#password2').val();
	$.ajax({
		type: 'POST',
		url:'php/account.php', 
		data:{commit: 'verify', username: usr, password1: pass1, password2: pass2},
		dataType: 'json',
		async: true,
		cache: false,
		
		beforeSend: function(xhr){},
		success: function(results){
			if (results.length == 0){
				$('.err').html('');
				requestAccountCreation(usr,pass1,pass2);
			} else {
				$('.err').html('');
				for(var result in results){
					var msg =results[result];
					$('div.err').append(msg+'<br\>');
				};
			}
		},
		error: function(xhr,status,error){
				$('.err').html('An error occured. Please try again or contact a system administrator.');	
			},
		complete: function(xhr,status){}
	});
}

function requestAccountCreation(usr,pass1,pass2){
	$('#container').height('480px');
	$('.content').fadeOut('slow');
	$('.alert').fadeIn('slow');

	$.ajax({
		type: 'POST',
		url:'php/account.php', 
		data:{commit: 'register', username: usr, password1: pass1, password2: pass2},
		dataType: 'json',
		async: true,
		cache: false,
		
		beforeSend: function(xhr){},
		success: function(results){
			window.location = "index.php";
		},
		error: function(xhr,status,error){
				$('.err').html('An error occured. Please try again or contact a system administrator.');	
				$('.content').fadeIn('slow');
				$('.alert').fadeOut('slow');
			},
		complete: function(xhr,status){
		}
	});
}
</script>
</head>
<body>
	<div id="container">
		<div id="header">
			<img src="_image/OSRL_logo.png" width="265" height="15"
				alt="Oracle Solaris Remote Lab" />
		</div>
		<div id="reg_content" class="content">
			<div class="temp">
				<h1>Account Registration</h1>
				<div id="reg_sub_content" class="sub_content">
					<div id="title"">Account Information</div>
					<p class="reg">Please enter the requested account information.</p>
					<form>
						<p class="reg">
							<label class="sf-lbl" for="sso_username"> Username</label><br/>
							<input	type="text" id="username" name="username"
								title=" Please enter a Username" maxlength="80" value=""
								class="sf-txtbox" /> 
						</p>
							
						<p class="reg">
							<label class="sf-lbl" for="email"> E-mail</label><br/>
							<input type="text" id="email" name="email"
								value="<?php echo getenv("REMOTE_USER");?>" class="sf-txtbox"
								disabled /> 
						</p>
						
						<p class="reg">	
							<label class="sf-lbl" for="password1"> Password</label><br/>
							<input type="password" id="password1" name="password1"
								title=" Please enter a Password" value="" maxlength="255"
								class="sf-pwdbox" /> 
						</p>
							
						<p class="reg">	
							<label class="sf-lbl" for="password2">Repeat Password</label><br/> 
							<input type="password" id="password2"
								name="password2" title=" Please enter a Password" value=""
								maxlength="255" class="sf-pwdbox" />
						</p>
						<div class="err"></div>
						<input type="button" name="register"
							value="Register"
							onclick="javascript:requestVerification();" />
					</form>
				</div>
			</div>
		</div>
		<div id="footer" class="content">
			<p>&nbsp;</p>
		</div>

	<div id="cover" class="alert">&nbsp;</div>
	<div id="alert-box" class="alert">
		<div id="alert-icon">
			<img src="_image/dialog-warning.png" />
		</div>
		<div id="alert-title">
			<p id="alert-prompt">Registration In Progress</p>
		</div>
		<div id="alert-desc">
			<p>Please wait while your account is created. This may take up to 15 minutes. You will be notified by email when your account has been created.</p>
		</div>

	</div>

</body>
</html>
