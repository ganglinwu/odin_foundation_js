// declare as var because I need btn1 in other js files
var btn1 = document.querySelector('#btn1');

btn1.addEventListener('click', () => {
    alert('Hello World');
    changeBgColor('black');
    wrapper1.style.cssText = 'background-color: green;'
})


// alternatively we could do

/*
btn.onclick = () => {
    alert('Hello World');
}
*/

// but this only allows one 'onclick' for the DOM



btn1.addEventListener('mouseover', () => {
    changeBgColor('white');
    wrapper1.style.cssText = 'background-color: red;'
})

//alternatively you can do this
/*
btn1.addEventListener('mouseover', changeBgWhite)

function changeBgWhite() {
    document.body.style.cssText = 'background-color:white;'
}
*/
// NOTE: the function passed into addEventListener cannot take paramenters
// observe how changeBgWhite has no parenthesis!




// how to put button under two levels of div

const container = document.createElement('div');
container.classList.add('container');


const wrapper1 = document.createElement('div');
wrapper1.classList.add('wrapper1');
wrapper1.style.cssText = 'background-color: green; border: 0.1cm solid pink;'

const parent = btn1.parentNode;
parent.replaceChild(container, btn1)

wrapper1.appendChild(btn1);
container.appendChild(wrapper1);





function changeBgColor(color) {
    document.body.style.backgroundColor = color;
}
