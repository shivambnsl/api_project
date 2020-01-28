
/*Javascript for facebook login*/
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();
  } else {                                 // Not logged into your webpage or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
      // 'into this webpage.';
  }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function (response) {   // See the onlogin handler
    statusChangeCallback(response);
    // if(response.status === "connected")
    // {
    //   window.location.href = "tyl.html";
      
    // }
    // else{
    //   window.location.href = "login.html"
    // }
    
  });
}


window.fbAsyncInit = function () {
  FB.init({
    appId: '569279020521693',
    cookie: true,                     // Enable cookies to allow the server to access the session.
    xfbml: true,                     // Parse social plugins on this webpage.
    version: 'v5.0'           // Use this Graph API version for this call.
  });


  FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
};


(function (d, s, id) {                      // Load the SDK asynchronously
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var abc;
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function (response) {

    console.log('Successful login for: ' + response.name);
    // document.getElementById('status').innerHTML = response.name;

      window.location.href = "tyl.html" + "?username=" + response.name  ;

  });

  FB.api(
    '/me',
    'GET',
    { "fields": "picture.type(normal)" },

    function (response) {
      // Insert your code here
      document.getElementById('pic').setAttribute('src', response.picture.data.url);
    }
  );
}

/*Javascript for gmail login*/

function onSignIn(googleUser) {
  // window.location.href = "in1.html"
  window.location.href = "tyl.html" + "?username=" + googleUser.getBasicProfile().getName();
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

/*Javascript for login page*/
document.getElementById('button').addEventListener("click", function () {
  document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function () {
  document.querySelector('.bg-modal').style.display = "none";
});


//code for logout from google

// function signOut() {
  
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }





