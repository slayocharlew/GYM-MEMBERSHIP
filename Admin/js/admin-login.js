// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGEZ-movg4KhXJO0PFCnLFyy-zYxKx6yw",
  authDomain: "gym-membership-3881e.firebaseapp.com",
  databaseURL: "https://gym-membership-3881e-default-rtdb.firebaseio.com",
  projectId: "gym-membership-3881e",
  storageBucket: "gym-membership-3881e.appspot.com",
  messagingSenderId: "342224120014",
  appId: "1:342224120014:web:0318e246d79e335ec2889f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user.email === 'slayoemma177@gmail.com') { // replace with your admin check logic
        window.location.href = "/Admin/admin-dashboard.html";
      } else {
        alert("Not authorized as admin");
      }
    })
    .catch(error => {
      console.error("Error signing in:", error);
      alert("Login failed");
    });
});
