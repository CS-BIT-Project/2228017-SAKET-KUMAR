// Destination, dateinput in the filter page
window.onload = function () {
    // Load saved values from localStorage
    let destination = localStorage.getItem("destination");
    let date = localStorage.getItem("date");
    let returnDate = localStorage.getItem("returnDate");

    // Populate input fields with saved values
    if (destination) {
        document.getElementById("destinationInput").value = destination;
    }
    if (date) {
        document.getElementById("dateInput").value = date;
    }
    if (returnDate) {
        document.getElementById("returnInput").value = returnDate;
    }

    // Initialize Flatpickr for date inputs (if Flatpickr is used)
    flatpickr("#dateInput", {
        dateFormat: "Y-m-d",
        defaultDate: date || null,
        onChange: function (selectedDates, dateStr) {
            localStorage.setItem("date", dateStr); // Save selected date to localStorage
            updateBill(); // Update the bill
        },
    });

    flatpickr("#returnInput", {
        dateFormat: "Y-m-d",
        defaultDate: returnDate || null,
        onChange: function (selectedDates, dateStr) {
            localStorage.setItem("returnDate", dateStr); // Save selected return date to localStorage
            updateBill(); // Update the bill
        },
    });

    // Update the bill when the page loads
    updateBill();
};

// Price range Slider Work in
function updateValues() {
    let minSlider = document.getElementById("minSlider");
    let maxSlider = document.getElementById("maxSlider");
    let minPrice = document.getElementById("minPrice");
    let maxPrice = document.getElementById("maxPrice");
    let rangeFill = document.querySelector(".range-fill");

    let minValue = parseInt(minSlider.value);
    let maxValue = parseInt(maxSlider.value);

    // Ensure min and max values do not overlap
    if (minValue > maxValue - 1000) {
        minSlider.value = maxValue - 1000;
        minValue = maxValue - 1000;
    }

    if (maxValue < minValue + 1000) {
        maxSlider.value = minValue + 1000;
        maxValue = minValue + 1000;
    }

    // Update the price input fields
    minPrice.value = minValue;
    maxPrice.value = maxValue;

    // Update the range fill (visual representation of the selected range)
    let minPercent = ((minValue - minSlider.min) / (minSlider.max - minSlider.min)) * 100;
    let maxPercent = ((maxValue - maxSlider.min) / (maxSlider.max - maxSlider.min)) * 100;

    rangeFill.style.left = minPercent + "%";
    rangeFill.style.width = (maxPercent - minPercent) + "%";
}

// Event listeners for price range inputs
document.getElementById("minPrice").addEventListener("input", function () {
    let minValue = parseInt(this.value);
    let maxValue = parseInt(document.getElementById("maxPrice").value);
    if (minValue < 3000) minValue = 3000;
    if (minValue > maxValue - 1000) minValue = maxValue - 1000;
    document.getElementById("minSlider").value = minValue;
    updateValues();
});

document.getElementById("maxPrice").addEventListener("input", function () {
    let maxValue = parseInt(this.value);
    let minValue = parseInt(document.getElementById("minPrice").value);
    if (maxValue > 20000) maxValue = 20000;
    if (maxValue < minValue + 1000) maxValue = minValue + 1000;
    document.getElementById("maxSlider").value = maxValue;
    updateValues();
});

// Initial call to update the price range sliders
updateValues();

// Function to update the bill details
function updateBill() {
    // Get values from the input fields
    let destination = document.getElementById("destinationInput").value;
    let date = document.getElementById("dateInput").value;
    let returnDate = document.getElementById("returnInput").value;
    let selectedItems = document.querySelectorAll('.filter-checkbox:checked');

    // Update the destination in the bill
    let billDestination = document.getElementById("billDestination");
    if (destination) {
        billDestination.textContent = destination;
    } else {
        billDestination.textContent = "Not selected";
    }

    // Update the date in the bill
    let billDate = document.getElementById("billDate");
    if (date) {
        billDate.textContent = date;
    } else {
        billDate.textContent = "Not selected";
    }

    // Update the return date in the bill
    let billReturnDate = document.getElementById("billReturnDate");
    if (returnDate) {
        billReturnDate.textContent = returnDate;
    } else {
        billReturnDate.textContent = "Not selected";
    }

    // Update the selected items in the bill
    let selectedItemsList = document.getElementById("selectedItems");
    selectedItemsList.innerHTML = ""; // Clear the previous list

    selectedItems.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = item.value;
        selectedItemsList.appendChild(listItem);
    });
}

// Add event listeners to the checkboxes and destination input
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        updateBill();
    });
});

document.getElementById("destinationInput").addEventListener('input', function () {
    localStorage.setItem("destination", this.value); // Save destination to localStorage
    updateBill();
});

// Initial call to update the bill when the page loads
updateBill();





