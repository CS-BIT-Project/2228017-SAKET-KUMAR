// document.addEventListener("DOMContentLoaded", function () {
//   const destinationInput = document.getElementById("destinationInput");
//   const destinationDropdown = document.createElement("ul");
//   destinationDropdown.classList.add("dropdown-menu");
//   destinationDropdown.style.display = "none";
//   destinationInput.parentNode.appendChild(destinationDropdown);

//   const destinations = ["Patna, Bihar", "Rajgir, Bihar"];

//   destinations.forEach((dest) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = dest;
//       listItem.classList.add("dropdown-item");
//       listItem.addEventListener("click", function () {
//           destinationInput.value = dest;
//           destinationDropdown.style.display = "none";

//           // Save selected destination to localStorage
//           localStorage.setItem("destination", dest);

//           // Redirect to corresponding filter page
//           // if (dest.includes("Patna")) {
//           //     window.location.href = "filter_patna.html";
//           // } else if (dest.includes("Rajgir")) {
//           //     window.location.href = "filter_rajgir.html";
//           // } else {
//           //     window.location.href = "filter.html"; // Default filter page
//           // }

//           function saveData() {
//             let destination = document.getElementById("destinationInput").value.trim().toLowerCase();
        
//             if (destination === "") {
//                 alert("Please select a valid destination");
//                 return;
//             }
        
//             // Save destination to localStorage
//             localStorage.setItem("destination", destination);
        
//             // Redirect based on destination
//             if (destination.includes("patna")) {
//                 window.location.href = "filter_patna.html";
//             } else if (destination.includes("rajgir")) {
//                 window.location.href = "filter_rajgir.html";
//             } else {
//                 alert("Please select a valid destination"); // Show error message
//             }
//         }
        
//       });
//       destinationDropdown.appendChild(listItem);
//   });

//   destinationInput.addEventListener("focus", function () {
//       destinationDropdown.style.display = "block";
//   });

//   document.addEventListener("click", function (event) {
//       if (!destinationInput.contains(event.target) && !destinationDropdown.contains(event.target)) {
//           destinationDropdown.style.display = "none";
//       }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const destinationInput = document.getElementById("destinationInput");
  const destinationDropdown = document.getElementById("destinationDropdown");

  const destinations = ["Patna, Bihar", "Rajgir, Bihar"];

  // Populate dropdown with destinations
  destinations.forEach(dest => {
      const listItem = document.createElement("li");
      listItem.textContent = dest;
      listItem.classList.add("dropdown-item");

      listItem.addEventListener("click", function () {
          destinationInput.value = dest;
          destinationDropdown.style.display = "none";
      });

      destinationDropdown.appendChild(listItem);
  });

  // Show dropdown when input is clicked
  destinationInput.addEventListener("focus", function () {
      destinationDropdown.style.display = "block";
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!destinationInput.contains(event.target) && !destinationDropdown.contains(event.target)) {
          destinationDropdown.style.display = "none";
      }
  });

  // **Initialize Flatpickr for Date Selection**
  flatpickr("#dateInput", {
      dateFormat: "Y-m-d",
      minDate: "today"
  });

  flatpickr("#returnInput", {
      dateFormat: "Y-m-d",
      minDate: "today"
  });
});



// **Function to validate input and redirect**

// Next filter form input data
function saveData() {
  // Get input values
  let destination = document.getElementById("destinationInput").value.trim().toLowerCase();
  let date = document.getElementById("dateInput").value;
  let returnDate = document.getElementById("returnInput").value;

  // Validate destination
  if (destination === "") {
    alert("Please select a valid destination");
    return;
  }

  // Save data to localStorage
  localStorage.setItem("destination", destination);
  localStorage.setItem("date", date);
  localStorage.setItem("returnDate", returnDate);

  // Redirect based on destination
  if (destination.includes("patna")) {
    window.location.href = "filter_patna.html"; // Redirect to Patna page
  } else if (destination.includes("rajgir")) {
    window.location.href = "filter_rajgir.html"; // Redirect to Rajgir page
  } else {
    alert("Please select a valid destination"); // Show error for invalid destination
  }
}

// CSS for Dropdown
const style = document.createElement("style");
style.textContent = `
    .dropdown-menu {
        position: absolute;
        background: white;
        border: 1px solid #ccc;
        list-style: none;
        padding: 0;
        margin: 5px 0;
        width: 150px;
        z-index: 1000;
        border-radius: 8px;
    }
    .dropdown-item {
        padding: 10px;
        cursor: pointer;
    }
    .dropdown-item:hover {
        background: #f0f0f0;
    }
`;
document.head.appendChild(style);





