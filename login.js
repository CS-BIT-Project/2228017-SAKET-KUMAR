// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// Sign Up Form
const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account created successfully!");
      // Redirect or perform other actions
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Sign In Form
const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signed in successfully!");
      // Redirect to index.html
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage); // Display error message to the user
    });
});