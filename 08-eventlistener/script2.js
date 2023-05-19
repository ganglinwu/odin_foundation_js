btn1.addEventListener('click', function (e) {
    console.log(e);
    console.log(e.target);
})

/* 
console.log(e) --> This prints PointerEvent into console
console.log(e.target) --> This prints the html tags of the button being clicked
*/

var btn2 = document.createElement('button');
btn2.setAttribute('id', 'btn2');
var btn3 = document.createElement('button');
btn3.setAttribute('id', 'btn3');

btn2.textContent = 'Click me! (2)';
btn3.textContent = 'Click me! (3)';

wrapper1.appendChild(btn2);
wrapper1.appendChild(btn3);

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.id);
    });
});