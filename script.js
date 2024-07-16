const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const BUTTONS = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const formatButtons = document.querySelectorAll('button.operator.format');
const ARRAY_BUTTONS = Array.from(BUTTONS);
const arrayNumberButtons = Array.from(numberButtons);
const arrayOperatorButtons = Array.from(operatorButtons);
const arrayFormatButtons = Array.from(formatButtons);
const DARKEN_NUMBER = 100;
let buttonClicked = false;

ARRAY_BUTTONS.forEach((element) => {
  element.addEventListener('mousedown', darkenBackground);
  element.addEventListener('mouseup', lightenBackground);
  element.addEventListener('mouseleave', lightenBackground);
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
