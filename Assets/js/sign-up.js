document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    var confirmation = confirm("Password and Confirm Password don't match. please figure it out to proceed");
    if (confirmation) {
      document.getElementById("password").value = ""; 
      document.getElementById("confirmPassword").value = ""; 
      document.getElementById("password").focus(); 
    }
  } else {
    
    var form = event.target;
    var formData = new FormData(form);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    var link = "Assets/package.html"; 
    window.location.href = link;
  }
});



    

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Perform login authentication here
    // For demonstration purposes, let's just log the email and password
    const phone = document.getElementById("login-phone").value;
    const password = document.getElementById("login-password").value;
    console.log("Login:", phone, password);
  });
  
  document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Perform sign-up process here
    // For demonstration purposes, let's just log the email and password
    const phone = document.getElementById("signup-phone").value;
    const password = document.getElementById("signup-password").value;
    console.log("Sign Up:", phone, password);
  });
  