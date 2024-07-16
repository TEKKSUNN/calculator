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
