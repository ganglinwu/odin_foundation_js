"use strict";

let gridsize = 16;
draw(gridsize);

/* ---------------------------------------------------*/
/* ---------------- Draw Grid Feature ----------------*/
/* ---------------------------------------------------*/

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
            box.classList.add(`box${k+1},${16-i}`);
            box.style.cssText= 'border: 1px solid #f9f9f9; flex: 1; transition: 0.2s;'
            box.addEventListener('mouseover', ()=> {
                box.classList.add('hover');});
            box.addEventListener('mouseout', ()=> {
                box.classList.remove('hover');
                box.classList.add('drawn')});
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
eraseAllbtn.addEventListener('click', confirmEraseALL)

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

