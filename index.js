let dataInputs = document.querySelectorAll('.card__input');
let day = document.querySelector(".card__input[name='day']");
let month = document.querySelector(".card__input[name='month']");
let year = document.querySelector(".card__input[name='year']");
let errorMessage = document.querySelectorAll(".card__errorMessage");
let button = document.querySelector(".card__button");
let age = document.querySelector(".card__resultValue");

function calcAge(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let isValid = true;

    // Validate date
    if (birthDate.getFullYear() != year || birthDate.getMonth() != month - 1 || birthDate.getDate() != day) {
        isValid = false;
    }

    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        ageInYears--;
    }

    return isValid ? ageInYears : null;
}

const errorCheck = () => {
    let isValid = true;

    if (day.value <= 0 || day.value > 31) {
        showError(0);
        isValid = false;
    } else {
        hideError(0);
    }

    if (month.value <= 0 || month.value > 12) {
        showError(1);
        isValid = false;
    } else {
        hideError(1);
    }

    if (year.value <= 0) {
        showError(2);
        isValid = false;
    } else {
        hideError(2);
    }

    if (isValid) {
        const calculatedAge = calcAge(year.value, month.value, day.value);
        if (calculatedAge !== null) {
            age.textContent = calculatedAge;
        } else {
            showError(0); // Show error if date is invalid
            age.textContent = "--";
        }
    } else {
        age.textContent = "--";
    }
};

// Helper function to show error message
function showError(index) {
    errorMessage[index].style.opacity = 1;
    errorMessage[index].style.visibility = 'visible';
}

// Helper function to hide error message
function hideError(index) {
    errorMessage[index].style.opacity = 0;
    errorMessage[index].style.visibility = 'hidden';
}

year.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        errorCheck();
    }
});

button.addEventListener('click', errorCheck);
