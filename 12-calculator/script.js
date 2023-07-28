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
    return operator(num1, num2);	
	}


	
const displayValue = document.getElementById('display')
const miniDisplayValue = document.getElementById('mini-display')

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
	miniDisplayValue.textContent += displayValue.textContent + ' ' + evt.target.innerText;
	this.classList.add('selected');

}

// clear main display
function clearDisplay() {
	displayValue.textContent = ''
}

// remove classlist 'selected' after transition
function removeSelectedClasslist(evt) {
	this.classList.remove('selected');
	if (evt.target.classList.value == 'btn operate') 
	{ 
		clearDisplay();
	}
	else return
}



// event listener for numbers
const btnNumNodeList = document.getElementsByClassName('btn num');
let btnNumArr = Array.from(btnNumNodeList);

btnNumArr.forEach((btn)=>{
	btn.addEventListener('click', updateDisplay)
	btn.addEventListener('transitionend', removeSelectedClasslist)
	})


// event listener for decimal point
const btnPoint = document.getElementById('point');
btnPoint.addEventListener('click', updateDisplay)
btnPoint.addEventListener('transitionend', removeSelectedClasslist)

// event listener for operators and equals button

const btnOperate = document.getElementsByClassName('btn operate');
let btnOperateArr = Array.from(btnOperate);

btnOperateArr.forEach((btn)=> {
	btn.addEventListener('click', updateMiniDisplay)
	btn.addEventListener('transitionend', removeSelectedClasslist)
	})

