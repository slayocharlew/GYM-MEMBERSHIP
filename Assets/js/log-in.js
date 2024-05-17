document.getElementById("myForm1").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var form = event.target;
    var formData = new FormData(form);
  
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    var link = "Assets/package.html"; 
    window.location.href = link;
  });