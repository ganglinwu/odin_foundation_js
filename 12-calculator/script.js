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
const btnPoint = document.getElementById('point');

const btnOperateNodeList = document.getElementsByClassName('btn operate');
const btnNumNodeList = document.getElementsByClassName('btn num');
const btnFunctionNodeList = document.getElementsByClassName('btn function');

let operator = '';

var firstNum = null;
var secondNum = null;
var previousAnswer = 0;

// update main display with numbers
// updateDisplay handles different events
// 1 if number button is selected
// 2 if decimal place is selected
// 3 if equals is selected
// 4 if clear(C) button is selected
// 5 if backspace button is selected
function updateDisplay(evt) {
	// event 1 - num buttons
	if (evt.target.classList.value == 'btn num') {
		displayValue.textContent += evt.target.innerText;
	}

	// event 2 - decimal place button
	else if (evt.target.innerText == '.') {
		if (!displayValue.innerText.includes('.')) {
			displayValue.textContent += evt.target.innerText;
		}
	}

	//event 3 - equals button
	else if (evt.target.innerText == '=') {
		previousAnswer = Number(currentAnswer.textContent);
		displayValue.textContent = previousAnswer;
	}

	//event 4 - clear button
	else if (evt.target.innerText == 'C') {
		clearDisplay();
		clearMiniDisplay();
		clearCurrentAnswerDisplay();
		firstNum = null;
		secondNum = null;
		operator = ''
	}

	//event 5 - backspace button
	else if (evt.target.innerText == '⌫') {
		if (displayValue.textContent == '') {
			miniDisplayValue.textContent = miniDisplayValue.textContent.slice(0,-2);
		}
		else {
			displayValue.textContent = displayValue.textContent.slice(0,-1);
		}
	}
	
	else return
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
	}
	else if (secondNum === null) {
		secondNum = Number(displayValue.textContent);
	}
	let operator = '';
	if (miniDisplayValue.textContent.length <5) {
		operator = evt.target.innerText;
	}
	else if (miniDisplayValue.textContent.at(-5) == ' ') {
		operator = miniDisplayValue.textContent.at(-6);
	}
	else operator = miniDisplayValue.textContent.at(-5);
	firstNum = operate(firstNum, secondNum, operator);
	previousAnswer = firstNum;
	secondNum = null;
	this.classList.add('selected');
}

// update current answer
function updateCurrentAnswer() {
	currentAnswer.textContent = previousAnswer;
	return
}

// clear main display
function clearDisplay() {
	displayValue.textContent = ''
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
}



// event listener for numbers
const btnNumNodeList = document.getElementsByClassName('btn num');
let btnNumArr = Array.from(btnNumNodeList);

btnNumArr.forEach((btn)=>{
	btn.addEventListener('transitionend', removeSelectedClasslist)
	btn.addEventListener('click', updateDisplay)
	})


// event listener for decimal point
const btnPoint = document.getElementById('point');
btnPoint.addEventListener('transitionend', removeSelectedClasslist)
btnPoint.addEventListener('click', updateDisplay)


// event listener for operators and equals button
const btnOperate = document.getElementsByClassName('btn operate');
let btnOperateArr = Array.from(btnOperate);

btnOperateArr.forEach((btn)=> {
	btn.addEventListener('transitionend', removeSelectedClasslist)
	btn.addEventListener('click', updateMiniDisplay)
	})



// divide button does not work as intended,
// the problem can be replicated by using a long
// string of numbers and various operators