function add(num1, num2) {
	return (Number(num1) + Number(num2));
};

function subtract(num1, num2) {
	return Number(num1) - Number(num2);
};

function multiply(num1, num2) {
	return Number(num1) * Number(num2);
};

function divide(num1, num2) {
	const answer = (Number(num1) / Number(num2));
    const length = Math.floor(answer).toString().length;
	if (Number(num2) == 0) {
		alert('Division by zero is not allowed!')
		clearAll();
		return
	}
	else {
		return answer.toFixed(10-length);
	}
};


const operate = (num1, num2, operator)=> {
    switch(operator) {
		case '+':
			return add(num1,num2);
			break;
		case '-':
			return subtract(num1,num2);
			break;
		case '×':
			return multiply(num1,num2);
			break;
		case '÷':
			return divide(num1,num2);
			break;
	}
	}


	
const displayValue = document.getElementById('display');
const miniDisplayValue = document.getElementById('mini-display');
const currentAnswer = document.getElementById('current-answer');

const btnsNodeList = document.getElementsByClassName('btn');

let btnsArr = Array.from(btnsNodeList);
let operator = '';

var firstNum = null;
var secondNum = null;
var previousAnswer = 0;
var previousOperator = '';
var ansButtonPressed = false;

// event listener for all buttons
// types of button by css class names
// 1 btn num - numbers
// 2 btn - decimal point, previous answer, clear, equals
// 3 btn operate - operators
// 4 btn function - answer, percent

btnsArr.forEach((btn)=>{
	btn.addEventListener('transitionend', removeSelectedClasslist)
	btn.addEventListener('click', checkMouseClick)
})

// helper function to check mouseclick
function checkMouseClick(evt) {
	// 1 num button click
	if (Number(evt.target.innerText)<10) {
		updateDisplayNum(evt.target.innerText);
	}
	// 2 decimal point keypress
	else if (evt.target.innerText == '.') {
		updateDisplayDecimal();
	}
	// 3 backspace keypresss
	else if (evt.target.innerText == '⌫') {
		updateDisplayBackspace();
	}
	// 4 +-x/ keypress
	else if (['+', '-', '×', '÷'].includes(evt.target.innerText)) {
		updateDisplayOperator(evt.target.innerText);
		updateMiniDisplayOperator(evt.target.innerText);
	}
	// 5 Enter keypress > equals
	else if (evt.target.innerText == '=') {
		updateDisplayEquals();
	}
	// 6 % keypress
	else if (evt.target.innerText == '%') {
		updateDisplayPercent();
	}
	// 7 Escape keypress > Clear
	else if  (evt.target.innerText.toUpperCase() == 'C') {
		clearAll();
	}
	evt.target.classList.add('selected');
	return;
}


// event listener for keyboard
document.addEventListener('keydown', checkKeyPress);

// helper function to check keypress
function checkKeyPress(evt) {
	// initialize var called id for querySelector at end of function
	var id=''
	// 1 num type keypress
	if (Number(evt.key)<10) {
		updateDisplayNum(evt.key);
		id = evt.key;
	}
	// 2 decimal point keypress
	else if (evt.key == '.') {
		updateDisplayDecimal();
		id = evt.key;
	}
	// 3 backspace keypresss
	else if (evt.key == 'Backspace') {
		updateDisplayBackspace();
		id = 'backspace'
	}
	// 4a +- keypress
	else if (['+', '-'].includes(evt.key)) {
		updateDisplayOperator(evt.key);
		updateMiniDisplayOperator(evt.key);
		if (evt.key == '+') {
			id = 'plus';
		}
		else id = 'minus';
	}
	// 4b x keypress
	else if (evt.key=='*') {
		updateDisplayOperator('×');
		updateMiniDisplayOperator('×');
		id = 'multiply'
	}
	// 4c / keypress
	else if (evt.key=='/') {
		updateDisplayOperator('÷');
		updateMiniDisplayOperator('÷');
		id = 'divide'
	}
	// 5 Enter keypress > equals
	else if (evt.key == 'Enter') {
		updateDisplayEquals();
		id = 'equal'
	}
	// 6 % keypress
	else if (evt.key == '%') {
		updateDisplayPercent();
		id = 'percent'
	}
	// 7 Escape keypress > Clear
	else if  (evt.key == 'Escape') {
		clearAll();
		id = 'clear'
	}
	// 8 @ keypress > Ans
	else if (evt.key.toUpperCase() == 'A') {
		if (ansButtonPressed) return;
		else {
			updateDisplayNum(previousAnswer);
			id = 'answer';
			ansButtonPressed = true;
		}
	}
	else return;
	let btn = document.querySelector(`button[id = '${id}']`)
	btn.classList.add('selected');
	return;
}



// the following functions update the main display
// 1 updateDisplayNum - if number button is selected
// 2 updateDisplayDecimal - if decimal place is selected
// 3 updateDisplayBackspace - if backspace button is selected
// 4 updateDisplayOperator - if operator button is selected
// 5 updateDisplayEquals - if equals is selected
// 6 updateDisplayPercent - if % button is selected
// 7 updateDisplayAnswer if answer button is selected


// 1 update display when num buttons selected
function updateDisplayNum(num) {
	if (miniDisplayValue.textContent.at(-1)=='=') {
		clearAll();
		updateDisplayNum(num);
	}
	else {
		if (displayValue.textContent.length <= 15) {
			displayValue.textContent += num;
		}
		else return;
	}
	return;
}



// 2 update main display when decimal place button selected
function updateDisplayDecimal() {
	if (miniDisplayValue.textContent.at(-1)=='=') {
		clearAll();
	}
	if (!displayValue.innerText.includes('.')) {
		displayValue.textContent += '.';
	}
}

// 3 update display when backspace button selected
function updateDisplayBackspace() {
	if (displayValue.textContent != '') {
		displayValue.textContent = displayValue.textContent.slice(0,-1);
	}
	else return;
}

// 4 update main display when operator button selected, then update miniDisplay
function updateDisplayOperator(userInputOperator) {
	if (miniDisplayValue.textContent.at(-1)=='=') {
		clearAll();
		displayValue.textContent = String(previousAnswer);
	}
	if (operator != '') {
		previousOperator = operator;
		operator = userInputOperator;
	}
	else {previousOperator = operator = userInputOperator;}
	}

// 5 update main display when equals button selected, then update miniDisplay
function updateDisplayEquals(){
	if (miniDisplayValue.textContent.at(-1)== '=') {
		clearDisplay();
		clearMiniDisplay();
		clearCurrentAnswerDisplay();
		firstNum = secondNum = null;
		displayValue.innerText += String(previousAnswer)
		ansButtonPressed = true;
	}
	if (miniDisplayValue.textContent == '') {
		if (displayValue.textContent == '') {
			return
		}
		else {
			previousAnswer = Number(displayValue.textContent);
			displayValue.textContent = previousAnswer;
		}
	}
	else {
		miniDisplayValue.textContent += ' ' + displayValue.textContent + ' =';
		firstNum = Number(currentAnswer.textContent);
		secondNum = Number(displayValue.textContent);
		firstNum = operate(firstNum, secondNum, operator);
		previousAnswer = currentAnswer.textContent = displayValue.textContent = firstNum;
		ansButtonPressed = false;
	}	
}

// 6 update display when % button selected then, update miniDisplay
function updateDisplayPercent() {
	if (miniDisplayValue.textContent == '') {
		if (displayValue.textContent == '') {
			return
		}
		else {
			miniDisplayValue.textContent += displayValue.textContent + '%' + ' ='
			previousAnswer = firstNum = Math.round((Number(displayValue.textContent)/100 + Number.EPSILON) * 100) / 100;
			displayValue.textContent = String(firstNum);
		}
	}
	else {
		secondNum = Number(displayValue.textContent)*firstNum/100;
		firstNum = previousAnswer = operate(firstNum, secondNum, operator);
		miniDisplayValue.textContent += ' ' + displayValue.textContent + '%' + ' ='
		displayValue.textContent = firstNum;
		currentAnswer.textContent = firstNum;
	}
	ansButtonPressed = false;
}

// 7 clear all display and reset firstNum, secondNum, operator, previousOperator 
// note previousAnswer shall not be cleared!
function clearAll() {
	clearDisplay();
	clearMiniDisplay();
	clearCurrentAnswerDisplay();
	firstNum = secondNum = null;
	operator = previousOperator = '';
	ansButtonPressed = false;
}

function updateMiniDisplayOperator(userInputOperator) {
	//when main display is blank
	if (displayValue.textContent == '') { 
		//we do not want user to keep inputting ++++++++
		if (miniDisplayValue.textContent.at(-1) == userInputOperator){
			return 
		}

		//However we want to allow users to multiply or divide 
		//by negative numbers
		else if (userInputOperator == '-' && miniDisplayValue.textContent.at(-1)=='÷') {
			miniDisplayValue.textContent += displayValue.textContent + userInputOperator;
			return;
		}
		else if (userInputOperator == '-' && miniDisplayValue.textContent.at(-1)=='×') {
			miniDisplayValue.textContent += displayValue.textContent + userInputOperator;
			return;
		}

		//in case the user has input the operator wrongly
		//we allow them to change
		else {
			miniDisplayValue.textContent = miniDisplayValue.textContent.slice(0,-2);
		}
	}

	// update mini display with num input and operator
	miniDisplayValue.textContent += ' ' + displayValue.textContent + ' ' + userInputOperator;
	if (firstNum == null) {
		firstNum = Number(displayValue.textContent);
		currentAnswer.textContent = String(firstNum);
	}
	else if (secondNum === null) {
		secondNum = Number(displayValue.textContent);
	}
	if (previousOperator == '+' || previousOperator == '-') {
		firstNum = operate(firstNum, secondNum, previousOperator);
	}
	else {
		if (secondNum === null) {
			firstNum = operate(firstNum, 1, previousOperator)
		}
		else if (userInputOperator == '÷' && secondNum == 0) {
			alert('Division by zero is not allowed!')
			displayValue.textContent = '';
		}
		else firstNum = operate(firstNum, secondNum, previousOperator)
	}
	currentAnswer.textContent = String(firstNum);
	secondNum = null;
	clearDisplay();
	ansButtonPressed = false;
}

// update current answer
function updateCurrentAnswer() {
	if (currentAnswer.textContent == 'null' || currentAnswer.textContent == 'undefined') {
		currentAnswer.textContent = ''
	}
	else {
		currentAnswer.textContent = String(firstNum);
	}
	return
}

// clear main display
function clearDisplay() {
	displayValue.textContent = ''
	return
}

// clear mini display
function clearMiniDisplay() {
	miniDisplayValue.textContent = ''
	return
}

// clear current answer display
function clearCurrentAnswerDisplay() {
	currentAnswer.textContent = ''
	return
}

// remove classlist 'selected' after transition
// this creates the button pop-up animation
function removeSelectedClasslist(evt) {
	this.classList.remove('selected');
	if (evt.target.classList.value == 'btn operate') 
	{ 
		clearDisplay();
	}
	updateCurrentAnswer();
	return
}
