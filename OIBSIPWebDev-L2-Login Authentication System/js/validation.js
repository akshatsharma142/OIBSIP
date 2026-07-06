/* ==========================================
   VALIDATION MODULE
========================================== */

/**
 * Check if string is empty
 */
function isEmpty(value) {
    return value.trim() === "";
}

/**
 * Username validation
 * - 3–20 characters
 * - Letters, numbers, underscore
 */
function validateUsername(username) {

    const regex = /^[a-zA-Z0-9_]{3,20}$/;

    return regex.test(username);

}

/**
 * Email validation
 */
function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

/**
 * Password validation
 * - 8 characters
 * - Uppercase
 * - Lowercase
 * - Number
 * - Special character
 */
function validatePassword(password) {

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return regex.test(password);

}

/**
 * Password Strength
 */

function getPasswordStrength(password) {

    let score = 0;

    if (password.length >= 8)
        score++;

    if (/[A-Z]/.test(password))
        score++;

    if (/[a-z]/.test(password))
        score++;

    if (/\d/.test(password))
        score++;

    if (/[@$!%*?&]/.test(password))
        score++;

    return score;

}

/**
 * Update Strength Bar
 */

function updateStrength(password) {

    const bar =
        document.getElementById("strengthBar");

    const text =
        document.getElementById("strengthText");

    if (!bar || !text)
        return;

    const score =
        getPasswordStrength(password);

    switch (score) {

        case 0:
        case 1:

            bar.style.width = "20%";
            bar.style.background = "#ef4444";
            text.innerHTML = "Very Weak";

            break;

        case 2:

            bar.style.width = "40%";
            bar.style.background = "#f97316";
            text.innerHTML = "Weak";

            break;

        case 3:

            bar.style.width = "60%";
            bar.style.background = "#eab308";
            text.innerHTML = "Medium";

            break;

        case 4:

            bar.style.width = "80%";
            bar.style.background = "#22c55e";
            text.innerHTML = "Strong";

            break;

        case 5:

            bar.style.width = "100%";
            bar.style.background = "#16a34a";
            text.innerHTML = "Very Strong";

            break;
    }

}

/**
 * Password Toggle
 */

function togglePassword(inputId, iconId) {

    const input =
        document.getElementById(inputId);

    const icon =
        document.querySelector(`#${iconId} i`);

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}