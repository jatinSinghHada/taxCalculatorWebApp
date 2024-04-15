var finalIncome = 0;

function calculateTax(event) {
    event.preventDefault(); // Use to prevent form submission

    var grossIncome = parseFloat(document.getElementById('number1').value) || 0;
    var extraIncome = parseFloat(document.getElementById('number2').value) || 0;
    var deductions = parseFloat(document.getElementById('number3').value) || 0;

    var ageSelect = document.getElementById('ageInput');
    var ageOption = ageSelect.options[ageSelect.selectedIndex];
    var age = ageOption.value; // Getting the value of a selected age option

    if (!age || age === "") {
        ageSelect.classList.add('error-border'); // error border if age group is not selected
        document.querySelector('.error-icon2').style.visibility = 'visible'; // Showing asterisk if age group is not selected
        return;
    } else {
        ageSelect.classList.remove('error-border'); // Remove error border if age group is selected
        document.querySelector('.error-icon2').style.visibility = 'hidden'; // Hide asterisk
    }


    var totalIncome = grossIncome + extraIncome - deductions;
    var tax = 0;

    if (totalIncome > 800000) {
        var taxableIncome = totalIncome - 800000;
        switch (age) {
            case "<40":
                tax = 0.3 * taxableIncome;
                break;
            case ">=40&<60":
                tax = 0.4 * taxableIncome;
                break;
            case ">=60":
                tax = 0.1 * taxableIncome;
                break;
            default:
                displayTaxResult('Please select age group');
                return;
        }
    }

    finalIncome = totalIncome - tax;
    displayPopup();

}

function displayErrorIcon(input) {
    var errorIcon = input.nextElementSibling;
    if (isNaN(parseFloat(input.value))) {
        errorIcon.style.visibility = 'visible';
    } else {
        errorIcon.style.visibility = 'hidden';
    }
}

function displayPopup() {
    var resultMessage = finalIncome.toFixed(2) + "Rs";
    document.getElementById("incomeAmount").textContent = resultMessage;
    document.getElementById("popup-1").classList.add("active");
}

function togglePopup() {
    document.getElementById("popup-1").classList.remove("active");
}

function displayErrorMessage(message) {
    var messageBox = document.querySelector('.message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}

//This is event listeners of input fields to display '!' error icon
var numberInputs = document.querySelectorAll('.number-input');
numberInputs.forEach(function (input) {
    input.addEventListener('input', function () {
        displayErrorIcon(input);
    });
});

document.getElementById('taxForm').addEventListener('submit', calculateTax);

document.getElementById('popup-1').classList.remove('active');
