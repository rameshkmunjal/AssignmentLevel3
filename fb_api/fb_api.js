$(document).ready(function() {
	$("#logout").hide();
	$("#profile").hide();		
	$("#photo_section").hide();
	$(".loader").hide();
	
	$("#submitBtn").on("click", processInput);
	
	function getFBPage($facebookId){
		$("#search_bar").hide();			
		$(".loader").show(1000).delay(8000).hide(1000);
		setTimeout(function() {showFacebookProfileAndPosts($facebookId);}, 10000);
	}		
		
		
	function processInput(){
		$facebookId = $("#search_box").val();
		console.log("Facebook id is " + $facebookId);
		if($facebookId){
			$test = validateFB($facebookId);
			
			if($test){					
				getFBPage($facebookId);
				//showFacebookProfileAndPosts($facebookId);					
			}	
		}
		else {
			console.log("No input");
			$("#search_bar").show();
			$("#infoUser").html("Please enter facebook access token.");				
		}
	}
		
	function validateFB($facebookId){			
		var str = $.trim( $facebookId );
		console.log("Validate FB");
		if( str != "" ) {
		  var regx = /^[A-Za-z0-9]+$/;
		  if (!regx.test(str)) {			
			$("#search_bar").show(1000);
			$("#search_box").show(1000).val('');
			$("#infoUser").html("Wrong Access Token ? It is not Alphanumeric !");			
			return false;
		  }
		  else{
			return true;
		  }
		}
		else {
		   $("#infoUser").html("Empty Input Box ? Please Enter Facebook Access Token");
		   $("#search_box").show(1000).val('');
		   return false;
		}
	}		
    

	function showFacebookProfileAndPosts($facebookId){				
		var i=0;										
		$.ajax('https://graph.facebook.com/me?fields=id,name,birthday,education,email,hometown,picture{height,url,width},feed{attachments{media,url},description,created_time,message,story}&access_token='+ $facebookId,{

			error: function() {
			  $("#infoUser").html('Some Error Occurred ! Check Internet connection OR Access Token');
			  $("#search_bar").show();
			  $("#search_box").val('');
		   }, success: function(response){
				// Only if request is successful show logout button
				$("#logout").show();
				$("#profile").show(2500);//show profile div
				$("#photo_section").show();	//show photo section div - meant for user posts										
				
				
				//Display Image : append profile image to img section above profile details
				$("#img_section").append('<img src="'+response.picture.data.url+'" class="img-responsive" alt="profile_image" />');
				
				// Name Validation : if name exists in response append else show not available
				if(response.name){
					$("#name").text(response.name );
				} else {
					$("#name").text("Not Available" );
				}			
				
				// Birthday Validation : if birthday exists in response append else show not available
				if(response.birthday){
					$("#dob").text(response.birthday );
				} else {
					$("#dob").text("No Permission OR No Record" );
				}
				
				// Education Validation : if education exists in response append else show not available
				if(response.education){
					for(i in response.education){													
						$("#education").append(response.education[i].school.name);													
					}
				} else {
					$("#education").text("No Permission OR No Record" );
				}
				
				// Hometown Validation : if hometown exists in response append else show not available
				if(response.hometown.name){
					$("#hometown").text(response.hometown.name );
				} else {
					$("#hometown").text("No Permission OR No Record" );
				}
				
				// Email Validation : if email exists in response append else show not available
				if(response.email){
					$("#email").text(response.email);
				} else {
					$("#email").text("No Permission OR No Record" );
				}
				
				// Feed Validation : if feed exists in response append to photo section
				if(response.feed){
					for( var i in response.feed.data){
						if(response.feed.data[i].story != undefined){ 
							if(response.feed.data[i].hasOwnProperty('attachments')){								
								$("#photo_section").append('<div id="title-box"><h4>'+ response.feed.data[i].story +'</h4></div>');
								if( response.feed.data[i].attachments.data[0].media.image){
									$("#photo_section").append('<div id="image-box"><img src="' + response.feed.data[i].attachments.data[0].media.image.src +'" class="img-responsive" alt="image"  /></div>');
								}
								else {
									$("#photo_section").append('<div id="image-box"><img src="' + defaultImage.jpg +'" class="img-responsive" alt="image"  /></div>');
								}
							}
						}
					}
					$("#scroll_message").html("Scroll Down to view user posts.");
				} else {
					//if feed does not exist in feed show error message
					$("#scroll_message").html("No Permission for user_posts OR No Record");
				}											
			},
					
			timeout: 1000,
			beforeSend: function() {									 
				$('.loader').show();
			 },
			complete: function() {
				$('.loader').hide();
			}
		});
	}	
	
		
});	
	
//event listener to fire reset function
$("#logout").on("click", logoutAndReset);

//this function will reset the page		
function logoutAndReset(){	
	// show search box and bar
	$("#search_bar").show(1000);
	$("#search_box").show(1000).val('');
	
	//hide logout button
	$("#logout").hide();	
	
	//hide loader
	$(".loader").hide();
	
	//empty and hide photo section
	$("#photo_section").empty();
	$("#photo_section").hide();
	
	//hide profile div
	$("#profile").hide();
	
	// empty profile image section
	$("#img_section").empty();
	
	//empty all profile fields
	$("#name").empty();
	$("#dob").empty();
	$("#hometown").empty();
	$("#education").empty();
	$("#hometown").empty();
	$("#email").empty();
	$("#infoUser").empty();
}


	