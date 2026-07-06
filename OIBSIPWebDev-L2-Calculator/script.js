// ===============================
// ELEMENTS
// ===============================

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

const buttons = document.querySelectorAll(".btn");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// ===============================
// VARIABLES
// ===============================

let expression = "";
let history = [];

const operators = ["+", "-", "*", "/", "%"];

// ===============================
// UPDATE DISPLAY
// ===============================

function updateDisplay() {

    expressionDisplay.textContent =
        expression === "" ? "0" : expression;

}

// ===============================
// CHECK OPERATOR
// ===============================

function isOperator(char) {

    return operators.includes(char);

}

// ===============================
// LAST CHARACTER
// ===============================

function lastCharacter() {

    return expression.charAt(expression.length - 1);

}

// ===============================
// BUTTON EVENTS
// ===============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        handleInput(value);

    });

});

// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (/^[0-9]$/.test(key)) {

        handleInput(key);
        return;

    }

    // Decimal
    if (key === ".") {

        handleInput(".");
        return;

    }

    // Operators
    if (["+", "-", "*", "/", "%"].includes(key)) {

        handleInput(key);
        return;

    }

    // Enter
    if (key === "Enter") {

        e.preventDefault();
        handleInput("=");

        return;

    }

    // Backspace
    if (key === "Backspace") {

        handleInput("backspace");

        return;

    }

    // Escape
    if (key === "Escape") {

        handleInput("C");

        return;

    }

});

// ===============================
// MAIN INPUT HANDLER
// ===============================

function handleInput(value) {

    switch (value) {

        case "C":
            clearCalculator();
            break;

        case "backspace":
            removeLastCharacter();
            break;

        case "=":
            calculate();
            break;

        default:

            if (isOperator(value)) {

                addOperator(value);

            }

            else if (value === ".") {

                addDecimal();

            }

            else {

                addNumber(value);

            }

    }

}

// ===============================
// CLEAR
// ===============================

function clearCalculator() {

    expression = "";

    resultDisplay.textContent = "0";

    updateDisplay();

}

// ===============================
// BACKSPACE
// ===============================

function removeLastCharacter() {

    expression = expression.slice(0, -1);

    updateDisplay();

}

// ===============================
// ADD NUMBER
// ===============================

function addNumber(number) {

    expression += number;

    updateDisplay();

}

// ===============================
// ADD OPERATOR
// ===============================

function addOperator(operator) {

    if (expression === "")
        return;

    const last = lastCharacter();

    // Replace operator if already present

    if (isOperator(last)) {

        expression =
            expression.slice(0, -1) + operator;

    }

    else {

        expression += operator;

    }

    updateDisplay();

}

// ===============================
// ADD DECIMAL
// ===============================

function addDecimal() {

    const parts = expression.split(/[+\-*/%]/);

    const current = parts[parts.length - 1];

    if (current.includes(".")) {

        return;

    }

    if (
        expression === "" ||
        isOperator(lastCharacter())
    ) {

        expression += "0.";

    }

    else {

        expression += ".";

    }

    updateDisplay();

}

// ===============================
// CALCULATE
// ===============================

function calculate() {

    if (expression === "")
        return;

    if (isOperator(lastCharacter()))
        return;

    try {

        const answer = evaluateExpression(expression);

        if (!isFinite(answer)) {

            resultDisplay.textContent = "Cannot divide by zero";
            return;

        }

        resultDisplay.textContent = answer;

        addHistory(expression, answer);

        // Allow operator chaining after "="
        expression = answer.toString();

        updateDisplay();

    }

    catch {

        resultDisplay.textContent = "Error";

    }

}

// ===============================
// PRECEDENCE
// ===============================

function precedence(operator) {

    switch (operator) {

        case "+":
        case "-":
            return 1;

        case "*":
        case "/":
        case "%":
            return 2;

        default:
            return 0;

    }

}

// ===============================
// APPLY OPERATOR
// ===============================

function applyOperator(a, b, operator) {

    switch (operator) {

        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":

            if (b === 0)
                throw new Error("Divide By Zero");

            return a / b;

        case "%":

            if (b === 0)
                throw new Error("Divide By Zero");

            return a % b;

    }

}

// ===============================
// TOKENIZE
// Converts
// 12+5*3
// into
// [12,+,5,*,3]
// ===============================

function tokenize(exp) {

    const tokens = [];

    let number = "";

    for (let char of exp) {

        if ("0123456789.".includes(char)) {

            number += char;

        }

        else {

            if (number !== "") {

                tokens.push(parseFloat(number));

                number = "";

            }

            tokens.push(char);

        }

    }

    if (number !== "") {

        tokens.push(parseFloat(number));

    }

    return tokens;

}

// ===============================
// EVALUATE EXPRESSION
// Using Two Stacks
// ===============================

function evaluateExpression(exp) {

    const values = [];

    const ops = [];

    const tokens = tokenize(exp);

    tokens.forEach(token => {

        if (typeof token === "number") {

            values.push(token);

        }

        else {

            while (

                ops.length &&
                precedence(ops[ops.length - 1]) >= precedence(token)

            ) {

                const op = ops.pop();

                const b = values.pop();

                const a = values.pop();

                values.push(

                    applyOperator(a, b, op)

                );

            }

            ops.push(token);

        }

    });

    while (ops.length) {

        const op = ops.pop();

        const b = values.pop();

        const a = values.pop();

        values.push(

            applyOperator(a, b, op)

        );

    }

    const result = values.pop();

    // Remove floating-point precision errors
    return Number(result.toFixed(10));

}
// ===============================
// HISTORY
// ===============================

function addHistory(exp, ans) {

    // Remove "No calculations yet"
    if (historyList.querySelector(".empty")) {
        historyList.innerHTML = "";
    }

    history.unshift({
        expression: exp,
        answer: ans
    });

    // Keep only last 10 calculations
    if (history.length > 10) {
        history.pop();
    }

    renderHistory();

}

// ===============================
// RENDER HISTORY
// ===============================

function renderHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML = `
            <li class="empty">
                No calculations yet
            </li>
        `;

        return;
    }

    history.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.expression}</strong><br>
            = ${item.answer}
        `;

        historyList.appendChild(li);

    });

}

// ===============================
// CLEAR HISTORY
// ===============================

clearHistoryBtn.addEventListener("click", () => {

    history = [];

    renderHistory();

});

// ===============================
// INITIAL DISPLAY
// ===============================

updateDisplay();

renderHistory();