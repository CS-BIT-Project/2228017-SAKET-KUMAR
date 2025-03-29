// Destination, dateinput in the filter page
window.onload = function () {
    let destination = localStorage.getItem("destination");
    let date = localStorage.getItem("date");
    let returnDate = localStorage.getItem("returnDate");

    if (destination) {
        document.getElementById("destinationInput").value = destination;
    }
    if (date) {
        document.getElementById("dateInput").value = date;
    }
    if (returnDate) {
        document.getElementById("returnInput").value = returnDate;
    }
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

    if (minValue > maxValue - 1000) {
        minSlider.value = maxValue - 1000;
        minValue = maxValue - 1000;
    }

    if (maxValue < minValue + 1000) {
        maxSlider.value = minValue + 1000;
        maxValue = minValue + 1000;
    }

    minPrice.value = minValue;
    maxPrice.value = maxValue;

    let minPercent = ((minValue - minSlider.min) / (minSlider.max - minSlider.min)) * 100;
    let maxPercent = ((maxValue - maxSlider.min) / (maxSlider.max - maxSlider.min)) * 100;

    rangeFill.style.left = minPercent + "%";
    rangeFill.style.width = (maxPercent - minPercent) + "%";
}

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

updateValues();






