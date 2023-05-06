let inputString = '';
let displayValue = '';
let resultValue = '';
let operator = '';

// function input(value) {
//   inputString += value;
//   displayValue += value;
//   document.querySelector('.display').value = displayValue
// }

function input(value) {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      operator = value;
      inputString += value;
      displayValue += value;
      document.querySelector('.display').value = displayValue;
    } else {
      inputString += value;
      displayValue += value;
      document.querySelector('.display').value = displayValue;
    }
}

function calculate() {
  let calculation = inputString.split(operator);
  let operand1 = parseFloat(calculation[0]);
  let operand2 = parseFloat(calculation[1]);
  switch(operator) {
    case '+':
      resultValue = operand1 + operand2;
      break;
    case '-':
      resultValue = operand1 - operand2;
      break;
    case '*':
      resultValue = operand1 * operand2;
      break;
    case '/':
      resultValue = operand1 / operand2;
      break;
    default:
      resultValue = '';
  }
  document.querySelector('.display').value = resultValue;
  inputString = resultValue.toString();
  displayValue = '';
}

function clearDisplay() {
  inputString = '';
  displayValue = '';
  resultValue = '';
  operator = '';
  document.querySelector('.display').value = '';
}

function backspace() {
  inputString = inputString.slice(0, -1);
  displayValue = displayValue.slice(0, -1);
  document.querySelector('.display').value = displayValue;
}