const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const BUTTONS = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const formatButtons = document.querySelectorAll('button.format');
const ARRAY_BUTTONS = Array.from(BUTTONS);
const arrayNumberButtons = Array.from(numberButtons);
const arrayOperatorButtons = Array.from(operatorButtons);
const arrayFormatButtons = Array.from(formatButtons);
const DARKEN_NUMBER = 100;
let buttonClicked = false;
const userInput = document.querySelector('#user-input');
const operatorTextContent = arrayOperatorButtons.map((button) => button.textContent);

ARRAY_BUTTONS.forEach((button) => {
  button.addEventListener('mousedown', darkenBackground);
  button.addEventListener('mouseup', lightenBackground);
  button.addEventListener('mouseleave', lightenBackground);
  button.addEventListener('click', updateUserInput);
});

function darkenBackground(event) {
  target = event.target;
  rgbColors = ((window.getComputedStyle(target)).backgroundColor).match(/\d+/g);
  for (let i = 0; i < rgbColors.length; i++)
  {
    rgbColors[i] = +rgbColors[i] - DARKEN_NUMBER;
  }
  target.style.backgroundColor = `rgb(${rgbColors[0]}, ${rgbColors[1]}, ${rgbColors[2]})`;
  buttonClicked = true;
}

function lightenBackground(event) {
  if (buttonClicked === true)
  {
    target = event.target;
    rgbColors = ((window.getComputedStyle(target)).backgroundColor).match(/\d+/g);
    for (let i = 0; i < rgbColors.length; i++)
    {
      rgbColors[i] = +rgbColors[i] + DARKEN_NUMBER;
    }
    target.style.backgroundColor = `rgb(${rgbColors[0]}, ${rgbColors[1]}, ${rgbColors[2]})`;
    buttonClicked = false;
  }
}

function updateUserInput(element) {
  target = element.target;
  currentValue = userInput.value;
  lastCharacter = currentValue[currentValue.length - 1];
  if (arrayFormatButtons.includes(target))
  {
    switch (target.textContent) {
      case 'C':
        clearUserInput();
        userInput.style.color = '#000000';
        return;
      case '=':
        if (operatorTextContent.includes(lastCharacter)
        || currentValue.match(/[a-zA-Z]/g) !== null) {
          showError();
          return;
        }
        clearUserInput();
        const numbers = currentValue.match(/\d+(\.\d+)*/g);
        if (numbers.length == null || numbers.length < 2)
        {
          userInput.value = currentValue;
          return;
        }
        for (let i = 0; i < numbers.length; i++)
        {
          let dots = numbers[i].match(/\./g);
          if (dots !== null && dots.length > 1)
          {
            showError();
            return;
          }
        }
        let operators = currentValue.match(/[+-/*](?!\.)/g);
        operators = operators.filter((operator) => ["+", "-", "/", "*"].includes(operator));
        const result = numbers.reduce((total, currentNumber, currentIndex) => {
          currentNumber = parseFloat(currentNumber);
          if (currentIndex === 0)
          {
            return total += currentNumber;
          }
          switch (operators[currentIndex - 1])
          {
            case '+':
              return total += currentNumber;
            case '-':
              return total -= currentNumber;
            case '*':
              return total *= currentNumber;
            case '/':
              return total /= currentNumber;
          }
        }, 0);
        userInput.value = result;
        refocus();
        return;
    }
  }
  if (arrayOperatorButtons.includes(target))
  {
    if (operatorTextContent.includes(currentValue[currentValue.length - 1]))
    {
      return;
    }
  }
  if (currentValue === 'ERROR')
  {
    return;
  }
  userInput.value = currentValue + target.textContent;
  refocus();
}

function clearUserInput() {
  userInput.value = '';
}

function refocus() {
  userInput.focus();
}

function showError() {
  userInput.value = 'ERROR';
  userInput.style.color = '#FF0000';
}