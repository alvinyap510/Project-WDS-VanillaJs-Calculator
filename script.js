class Calculator {
  constructor(prevousOperandOutput, currentOperandOutput) {
    this.previousOperand = prevousOperandOutput;
    this.currentOperand = currentOperandOutput;
    this.operation = undefined;
  }

  clear() {
    this.previousOperand.innerText = "";
    this.currentOperand.innerText = "";
  }

  delete() {
    this.currentOperand.innerText = this.currentOperand.innerText.slice(0, -1);
  }

  appendDigit(digit) {
    /* Only allow one dot */
    if (digit === "." && this.currentOperand.innerText.includes(".")) return;
    /* If original current operand is empty, make it 0. */
    if (digit === "." && this.currentOperand.innerText === "")
      this.currentOperand.innerText = "0";
    this.currentOperand.innerText = this.currentOperand.innerText + digit;
  }

  chooseOperation(operation) {
    /* If current operand is empty, skip */
    if (this.currentOperand.innerText === "") return;
    if (this.previousOperand.innerText !== "") this.evaluate();
    this.operation = operation;
    this.previousOperand.innerText =
      this.currentOperand.innerText + ` ${operation} `;
    this.currentOperand.innerText = "";
  }

  evaluate() {
    let result;
    const prev = parseFloat(this.previousOperand.innerText);
    const curr = parseFloat(this.currentOperand.innerText);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }
    this.operation = undefined;
    this.currentOperand.innerText = result.toString();
    this.previousOperand.innerText = "";
  }
}

const digitButtons = document.querySelectorAll("[data-digit]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-evaluate]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const prevousOperandOutput = document.querySelector(
  "[data-previous-operand-output]"
);
const currentOperandOutput = document.querySelector(
  "[data-current-operand-output]"
);

const calculator = new Calculator(prevousOperandOutput, currentOperandOutput);

/* Add event listener to digit buttons */
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendDigit(button.innerText);
  });
});

/* Add event listener to all operation buttons */
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

/* Add event listener to clear-all button */
clearAllButton.addEventListener("click", () => {
  calculator.clear();
});

/* Add event listener to delete button */
deleteButton.addEventListener("click", () => {
  calculator.delete();
});

/* Add event listener to evaluate button */
equalButton.addEventListener("click", () => {
  calculator.evaluate();
});
