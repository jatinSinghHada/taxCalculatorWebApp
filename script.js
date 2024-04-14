var finalIncome = 0;

// Function to handle the input event and display error icons
function handleInputEvent(input) {
    input.addEventListener('input', function () {
        displayErrorIcon(input);
    });
}

// Attach event listeners to number input fields
var numberInputs = document.querySelectorAll('.number-input');
numberInputs.forEach(function (input) {
    handleInputEvent(input);
});

// Function to remove 'active' class from popup
function removePopup() {
    document.getElementById('popup-1').classList.remove('active');
}

// Remove 'active' class from popup initially
removePopup();

function calculateTax(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var grossIncome = parseFloat(document.getElementById('number1').value) || 0;
    var extraIncome = parseFloat(document.getElementById('number2').value) || 0;
    var deductions = parseFloat(document.getElementById('number3').value) || 0;

    // Get age input element
    var ageInput = document.getElementById('ageInput');

    // Validate age input
    if (!ageInput.value) {
        displayErrorIcon(ageInput); // Display error icon if age is not entered
        return;
    } else {
        // Hide error icon if age is entered
        var errorIcon = document.getElementById('ageError');
        errorIcon.style.visibility = 'hidden';
    }

    // Get entered age value
    var age = parseFloat(ageInput.value);

    // Calculate total income
    var totalIncome = grossIncome + extraIncome - deductions;

    // Calculate tax based on age
    var tax = 0;

    // Calculate tax based on total income exceeding 8 lakhs
    if (totalIncome > 800000) {
        // Calculate taxable income (income exceeding 8 lakhs)
        var taxableIncome = totalIncome - 800000;

        // Apply tax rates based on age group
        if (age < 40) {
            tax = 0.3 * taxableIncome;
        } else if (age >= 40 && age < 60) {
            tax = 0.4 * taxableIncome;
        } else {
            tax = 0.1 * taxableIncome;
        }
    }

    // Calculate final income after tax deduction
    finalIncome = totalIncome - tax;

    // Display tax calculation result in popup
    displayPopup();
}

function displayErrorIcon(input) {
    var errorIcon = input.nextElementSibling;
    if (isNaN(parseFloat(input.value))) {
        errorIcon.style.visibility = 'visible'; // Display error icon if input is not a number
    } else {
        errorIcon.style.visibility = 'hidden'; // Hide error icon if input is a number
    }
}

function displayPopup() {
    var resultMessage = "₹" + finalIncome.toFixed(2);
    document.getElementById("incomeAmount").textContent = resultMessage;
    document.getElementById("popup-1").classList.add("active");
}

function togglePopup() {
    document.getElementById("popup-1").classList.remove("active");
}

// Event listener for form submission
document.getElementById('taxForm').addEventListener('submit', calculateTax);
