// 모듈 1 - 계산 모듈
class Calculator {
    constructor() {
      this.inputString = '';
      this.displayValue = '';
      this.resultValue = '';
      this.operator = '';
    }
  
    input(value) {
      if (this.isOperator(value)) {
        this.operator = value;
      }
  
      this.inputString += value;
      this.displayValue += value;
      document.querySelector('.display').value = this.displayValue;
    }
  
    calculate() {
      let calculation = this.inputString.split(this.operator);
      let operand1 = parseFloat(calculation[0]);
      let operand2 = parseFloat(calculation[1]);
  
      switch (this.operator) {
        case '+':
          this.resultValue = operand1 + operand2;
          break;
        case '-':
          this.resultValue = operand1 - operand2;
          break;
        case '*':
          this.resultValue = operand1 * operand2;
          break;
        case '/':
          this.resultValue = operand1 / operand2;
          break;
        default:
          this.resultValue = '';
      }
  
      document.querySelector('.display').value = this.resultValue;
      this.inputString = this.resultValue.toString();
      this.displayValue = '';
    }
  
    clear() {
      this.inputString = '';
      this.displayValue = '';
      this.resultValue = '';
      this.operator = '';
      document.querySelector('.display').value = '';
    }
  
    backspace() {
      this.inputString = this.inputString.slice(0, -1);
      this.displayValue = this.displayValue.slice(0, -1);
      document.querySelector('.display').value = this.displayValue;
    }
  
    isOperator(value) {
      return value === '+' || value === '-' || value === '*' || value === '/';
    }
  }
  
  // 모듈 2 - 이벤트 모듈
  class EventManager {
    constructor() {
      this.calculator = new Calculator();
  
      // 이벤트 등록
      document.querySelector('.calculator').addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
          return;
        }
  
        const value = target.innerText;
        switch (value) {
          case '=':
            this.calculator.calculate();
            break;
          case 'C':
            this.calculator.clear();
            break;
          case '←':
            this.calculator.backspace();
            break;
          default:
            this.calculator.input(value);
            break;
        }
      });
    }
  }
  
  // 이벤트 모듈 실행
  new EventManager();
  