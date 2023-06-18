"use strict";

let currentHoverColor='#7fffda'
let currentDrawnColor='#66cdaa'


let gridsize = 16;
draw(gridsize);

const boxes = document.getElementsByClassName('box-grid');

/* ---------------------------------------------------*/
/* ---------------- Draw Grid Feature ----------------*/
/* ---------------------------------------------------*/

/* helper function to darken color by 20% */
function darkenColor(hexString) {
    // split hex string into array with length 7
    let hexArr = hexString.split('');

    // splice from index 1(so that we skip # symbol) and take 2 elements
    // note that splicing modifies hexArr, so we splice same section of arr everytime
    // join them together, parse to integer from hexadecimal(base-16)
    // multiply by 0.8 to darken, and round to whole number
    let r = Math.floor(parseInt(hexArr.splice(1,2).join(''), 16)*0.8);
    let g = Math.floor(parseInt(hexArr.splice(1,2).join(''), 16)*0.8);
    let b = Math.floor(parseInt(hexArr.splice(1,2).join(''), 16)*0.8);

    // convert back to hexadecimal, concatenate together with # symbol
    return(`#${r.toString(16)}${g.toString(16)}${b.toString(16)}`)
}



/* function to draw grid */
function draw(gridsize) {
    let container = document.querySelector('.container');
    container.style.cssText = 'display:flex; flex-direction:column; height:80vh; width: 90vw; box-sizing: border-box; margin: auto;'
    container.replaceChildren(); //erase grid
    for (let i = 0; i < gridsize; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add(`row${i+1}`);
        rowDiv.style.cssText= 'display:flex; flex:1;'
        
        for (let k = 0; k < gridsize; k++) {
            let box = document.createElement('div');
            box.classList.add('box-grid');
            box.classList.add(`box${k+1},${16-i}`);
            box.style.cssText= 'border: 1px solid #f9f9f9; flex: 1; transition: 0.2s;'
            box.addEventListener('mouseover', ()=> {
                box.style.background = `${currentHoverColor}`});
            box.addEventListener('mouseout', ()=> {
                box.style.background = `${currentDrawnColor}`});
            rowDiv.appendChild(box);
        }
        container.appendChild(rowDiv);
    }
    document.getElementById('grid-density-count').innerText = `Current number of rows/columns: ${gridsize}`;
}
/* event listener for change of grid density */
const gridDensity = document.getElementById('grid-density');

gridDensity.addEventListener('change', (e)=>{
    if (e.target.value !='-1') {
        gridsize = e.target.value;
        draw(gridsize);
    }
    else if (e.target.value == '-1') {
        let gridsizeInputByUser = prompt("Please enter how many boxes you would like per row/column. Max is 150", "16");
        if ( 0 < Number(gridsizeInputByUser) && Number(gridsizeInputByUser)<= 150) {
            gridsize = gridsizeInputByUser;
            draw(gridsize)
        }
        else {
            alert('Please try again, number entered is out of range')
        }
    }
})

/* ----------------------------------------------------------*/
/* ---------------- End of Draw Grid Feature ----------------*/
/* ----------------------------------------------------------*/





/* ---------------------------------------------------*/
/* ---------------- Erase All Feature ----------------*/
/* ---------------------------------------------------*/


/* helper function: confirm with user to erase */
function confirmEraseALL() {
    eraseAllbtn.classList.add('selected')
    setTimeout(()=> {
        if (confirm('Are you sure you want to ERASE ALL?')) {
            draw(gridsize);
        }
        else {
            alert('Erase All cancelled. Press ENTER or ESC to continue.')
        }
    }, 700)
    setTimeout(()=> eraseAllbtn.classList.remove('selected'), 1400);
}


/* event listener for click*/
const eraseAllbtn = document.getElementsByClassName('erase-all')[0]; //getElementsbyClass returns HTMLCollection(Array like object) even when there's only one element!
eraseAllbtn.addEventListener('click', confirmEraseALL);

/* event listener for keypress*/
window.addEventListener('keypress', (e)=> {
    if (e.key.toLowerCase()=='m') {
        confirmEraseALL();
    }
    else {
        return;
    }
})


/* ----------------------------------------------------------*/
/* ---------------- End of Erase All Feature ----------------*/
/* ----------------------------------------------------------*/


/* ----------------------------------------------------*/
/* ---------------- Erase Mode Feature ----------------*/
/* ----------------------------------------------------*/
const eraseModebtn = document.getElementsByClassName('erase-mode')[0];

/* erase mode function*/
function eraseMode() {
    if (eraseModebtn.classList.contains('selected')) {
        currentDrawnColor = darkenColor(currentHoverColor);
        eraseModebtn.classList.remove('selected');
        Array.from(boxes).forEach((box)=>
            box.addEventListener('mouseover', ()=> {
                box.style.background = `${currentHoverColor}`;
            })
        );
        Array.from(boxes).forEach((box)=>
            box.addEventListener('mouseout', ()=> {
                box.style.background = `${currentDrawnColor}`;
            })
        );
    }
    else {
        eraseModebtn.classList.add('selected')
        Array.from(boxes).forEach((box)=>
            box.addEventListener('mouseover', ()=> {
                box.style.background = '#a7a7a7';
            })
        );
        Array.from(boxes).forEach((box)=>
            box.addEventListener('mouseout', ()=> {
                box.style.background = '#ffffff';
            })
        );
    }
}

/* event listener for click */
eraseModebtn.addEventListener('click', eraseMode);

/* event listener for keypress */
window.addEventListener('keypress', (e)=> {
    if (e.key.toLowerCase()=='q') {
        eraseMode();
    }
    else {
        return;
    }
})


/* -----------------------------------------------------------*/
/* ---------------- End of Erase Mode Feature ----------------*/
/* -----------------------------------------------------------*/