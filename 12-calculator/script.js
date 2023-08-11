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
    return answer.toFixed(10-length);
};


const operate = (num1, num2, operator)=> {
    switch(operator) {
		case '+':
			return add(num1,num2);
			break;
		case '-':
			return subtract(num1,num2);
			break;
		case 'x':
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

// event listener for all buttons
// types of button by css class names
// 1 btn num - numbers
// 2 btn - decimal point, previous answer, clear,
// 3 btn operate - operators
// 4 btn function -  equals, answer, percent

btnsArr.forEach((btn)=>{
	btn.addEventListener('transitionend', removeSelectedClasslist)
	btn.addEventListener('click', updateDisplay)
	if (btn.classList.value.includes('function') || btn.classList.value.includes('operate')) {
		btn.addEventListener('click', updateMiniDisplay)
	}
})

// update main display with numbers
// updateDisplay handles different events
// 1 if number button(includes Ans) is selected
// 2 if decimal place is selected
// 3 if operator button is selected
// 4 if equals is selected
// 5 if clear(C) button is selected
// 6 if backspace button is selected
function updateDisplay(evt) {
	// event 1 - num buttons
	if (evt.target.classList.value == 'btn num') {
		if (evt.target.innerText == 'Ans') {
			displayValue.textContent = String(previousAnswer);
		}
		else {
			displayValue.textContent += evt.target.innerText;
	
		}
	}
	// event 2 - decimal place button
	else if (evt.target.innerText == '.') {
		if (!displayValue.innerText.includes('.')) {
			displayValue.textContent += evt.target.innerText;
		}
	}

	// event 3 - operator button
	else if (evt.target.classList.value.includes('btn operate')) {
		if (operator != '') {
			previousOperator = operator;
			operator = evt.target.innerText;
		}
		else {previousOperator = operator = evt.target.innerText;}
	}

	//event 4 - equals button
	else if (evt.target.innerText == '=') {
		previousAnswer = Number(currentAnswer.textContent);
		displayValue.textContent = previousAnswer;
	}

	//event 5 - clear button
	else if (evt.target.innerText == 'C') {
		clearDisplay();
		clearMiniDisplay();
		clearCurrentAnswerDisplay();
		firstNum = null;
		secondNum = null;
		operator = ''
		previousOperator = ''
	}

	//event 6 - backspace button
	else if (evt.target.innerText == '⌫') {
		if (miniDisplayValue.textContent != '') {
			if (displayValue.textContent != '') {
				displayValue.textContent = displayValue.textContent.slice(0,-1);
			}
			else {
				miniDisplayValue.textContent = miniDisplayValue.textContent.slice(0,-2);
			}
		}
		else {
			if (displayValue.textContent != '') {
				displayValue.textContent = displayValue.textContent.slice(0,-1);
			}
			else return;
		}
	}
	else return;
	this.classList.add('selected');
}

// update mini display
function updateMiniDisplay(evt) {
	//when main display is blank
	if (displayValue.textContent == '') { 

		//we do not want user to keep inputting ++++++++
		if (miniDisplayValue.textContent.at(-1) == evt.target.innerText){
			return 
		}

		/*
		However we want to allow users to multiply or divide 
		by negative numbers
		*/
		else if (evt.target.innerText == '-' && miniDisplayValue.textContent.at(-1)=='÷') {
			miniDisplayValue.textContent += displayValue.textContent + evt.target.innerText;
		}
		else if (evt.target.innerText == '-' && miniDisplayValue.textContent.at(-1)=='x') {
			miniDisplayValue.textContent += displayValue.textContent + evt.target.innerText;
		}

		/*
		in case the user has input the operator wrongly
		we allow them to change
		*/
		else {
			miniDisplayValue.textContent = miniDisplayValue.textContent.slice(0,-2);
		}
	}

	// update mini display with num input and operator
	miniDisplayValue.textContent += ' ' + displayValue.textContent + ' ' + evt.target.innerText;
	
	
	if (firstNum == null) {
		firstNum = Number(displayValue.textContent);
		currentAnswer.textContent = String(firstNum);
	}
	else if (secondNum === null) {
		secondNum = Number(displayValue.textContent);
	}
	firstNum = operate(firstNum, secondNum, previousOperator);
	currentAnswer.textContent = String(firstNum);
	secondNum = null;
}

// update current answer
function updateCurrentAnswer() {
	if (currentAnswer.textContent === 'null' || currentAnswer.textContent === 'undefined') {
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
