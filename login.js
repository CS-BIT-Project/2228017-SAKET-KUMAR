// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmH5YuzgMsliFBNG9JM3QZVXW7fcuh5Y8",
  authDomain: "onetourplanner-81a85.firebaseapp.com",
  projectId: "onetourplanner-81a85",
  storageBucket: "onetourplanner-81a85.appspot.com",
  messagingSenderId: "82741832144",
  appId: "1:82741832144:web:0de015fdcd1ca0d4b271d5",
  measurementId: "G-27FN42RDC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Auth

// Submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  // Inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password) // Use 'auth' here
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Account created successfully!");
      // Redirect or perform other actions
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; // Corrected to 'message'
      alert(errorMessage);
    });
});