# AssignmentLevel3

Edwisor course Assignment Level 3


## Problem

Using facebook graph API create a simple jquery website containing following pages-
	1. Profile page - it should contain your basic details as given on facebook and 
		as returned by its API.
	2. Feed page - it should contain the recent posts made by you on facebook.
	
Host this code in a github repository as well and send the link of that repository
in the submission.

Handle all the error cases as well. Make the graph api token a javascript variable so
that it cab be replaced to get information of other users as well.

Technologies to be used - HTML5, CSS , Javascript, Bootstrap and jquery.
	
## Synopsis

For visualisation we have developed profile and feed page  using bootstrap.
1. User will input access token of his Face Book account to get access to his personal info and posts.
2. All error cases handled - 
   - if input box is empty and submit button is pressed .
   - if input is not alpha-numeric.
   - if there is no internet connection.
   - if response is not received.
   - if response does not contain any of profile details.
   - if response does not contain user posts.
3. When input will be validated to check if it alphanumeric.
4. When response is successful - Profile details are shown in a section meant for this purpose.
5. When response is successful - User posts are shown in photo section.
6. When user wants to exit the page, he may click logout button.
7. Consequently page will come to pre-login state where again input box will appear.

## Technical Specifications

1. We have used HTML , CSS and Bootstrap to make the page responsive.
2. We have also used media CSS settings at various break-points to maintain responsiveness.  
3. We have used Jquery methods for this api.
4. We have used CSS to introduce loader and spin it  through CSS animation. 

## Installation

Complete code of this api has been uploaded to my github page and address is : 
	http://github.com/rameshkmunjal

## Contributors

1. Ramesh Kumar Munjal
