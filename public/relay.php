<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="author" content="KMTronic LTD" />
<meta name="description" content="KMTronic LTD" />
<meta name="keywords" content="KMTronic LTD Mobile" />
<title>KMTronic Mobile</title>
<link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
<script type="text/javascript" src="jquery.min.js" ></script>
<!-- Hide Mobiles Browser Navigation Bar -->
<script type="text/javascript">
	window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
	// Hide the address bar!
	window.scrollTo(0, 1);
	}, 0);
	});
</script>
</head>

<body>
<div id="main_container">
	<div class="header">
    <a href="index.html" tppabs="" class="left_bt">home</a>
    <span>CPanel</span></div>
    
        <div class="box" id="box">
        	<div class="box_content">
            
            	<div class="box_content_tab">
                Search
                </div>
                
                <div class="box_content_center">
                <div class="form_content">
                <form>
                <input type="text" class="form_input_box" />
                <a class="boxclose" id="boxclose">Close</a>
                <input type="submit" class="form_submit" value="Submit" />
                </form>
                </div> 
                
                <div class="clear"></div>
                </div>
            
           </div>
        </div>

        <div class="box" id="box_login">
            <div class="box_content">
            	<div class="box_content_tab">
                Login
                </div>
                
                <div class="box_content_center">
                    <div class="form_content">
                    <form action="#">
                    <label>Username</label>
                    <input type="text" class="form_input_box" />
                    <label>Password</label>
                    <input type="password" class="form_input_box" />
                    <a class="boxclose" id="boxclose_login">Close</a>
                    <input type="submit" class="form_submit" value="Login" />
                    </form>
                    </div>
                <div class="clear"></div>    
                </div>
            
           
            
           </div>
        </div>
        
	<div class="content">
    	
    	<div class="corner_wrap">

            
          <div class="entry">
            <h3>Relay</h3>
            <p> <a href="relay.php?ON"><img src="img/ON.png" width="67" height="43" border="0" /></a> <a href="relay.php?OFF"><img src="img/off.png" width="67" height="43" border="0" /></a></p>
            <p><?php
if( isset($_GET['ON']) == "Start") {echo "Started!"; shell_exec("/var/www/m/sh.sh");}
if( isset($_GET['OFF']) == "Stop") {echo "Stoped!"; shell_exec("/var/www/m/off.sh");}
?>
          </div>
          </p>
            <p><!DOCTYPE html>
<html>
	<head>

		
</body>
</html>

<center>KMTRONIC LTD</center>
</p>
            <p>&nbsp;</p> 
          </div>         

      
        </div>
   		<div class="clear_left"></div>

    </div>


</div>
<div id="footer"><span>KMTronic Mobile Page </span>
<a onclick="jQuery('html, body').animate( { scrollTop: 0 }, 'slow' );"  href="javascript:void(0);" title="Go on top" class="right_bt"></a></div>
</body>
</html>
