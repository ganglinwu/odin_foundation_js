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


	
const displayValue = document.getElementById('display')
const miniDisplayValue = document.getElementById('mini-display')
const currentAnswer = document.getElementById('current-answer')
var firstNum = 0;
var secondNum = null;
var previousAnswer = 0;

// update main display with numbers
function updateDisplay(evt) {
	console.log(evt);
	if (evt.target.innerText == '.') {
		if (!displayValue.innerText.includes('.')) {
			displayValue.textContent += evt.target.innerText;
			this.classList.add('selected');
		}
	}
	else if (evt.target.classList.value == 'btn num') {
		displayValue.textContent += evt.target.innerText;
		this.classList.add('selected');
	}
	else return
}

// update mini display
function updateMiniDisplay(evt) {
	miniDisplayValue.textContent += ' ' + displayValue.textContent + ' ' + evt.target.innerText;
	if (secondNum === null && firstNum === 0) {
		firstNum = Number(displayValue.textContent);
	}
	else if (secondNum === null) {
		secondNum = Number(displayValue.textContent);
	}
	firstNum = operate(firstNum, secondNum, evt.target.innerText);
	previousAnswer = firstNum;
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