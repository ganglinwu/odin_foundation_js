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


	
var displayValue = document.getElementById('display').textContent;
var miniDisplayValue = document.getElementById('mini-display').textContent;
	
function updateDisplay(evt) {
	document.getElementById('display').textContent += evt.target.innerText;
	this.classList.add('selected');
}



function updateMiniDisplay(input) {
	miniDisplayValue = displayValue + ' ' + input;
}


// addeventlistener for numbers
const btnNumNodeList = document.getElementsByClassName('btn num');
let btnNumArr = Array.from(btnNumNodeList);

btnNumArr.forEach((btn)=>{
	btn.addEventListener('click', updateDisplay)
	btn.addEventListener('transitionend', ()=>{
		btn.classList.remove('selected');
	})
	})

const btnPoint = document.getElementById('point');
btnPoint//use onclick to set null after first trigger

