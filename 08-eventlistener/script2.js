btn1.addEventListener('click', function (e) {
    console.log(e);
    console.log(e.target);
})

/* 
console.log(e) --> This prints PointerEvent into console
console.log(e.target) --> This prints the html tags of the button being clicked
*/

document.createElement