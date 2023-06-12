
let gridsize = 16;
draw(gridsize);




function draw(gridsize) {
    let container = document.querySelector('.container');
    container.style.cssText = 'display:flex; flex-direction:column; height:80vh; width: 90vw; box-sizing :border-box; margin:auto;'
    container.replaceChildren();
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

window.addEventListener('keydown', (e)=> {
    console.log(e.key);
    let key = document.querySelector(`button[data-key="${e.key}"]`);
    if (!key) return; // stop null error if unexpected keystroke
    let arr = Array.from(key.classList); //check active classes, see if selected already toggled on
    console.log(arr);
    if (arr.includes('selected')) { //toggle off if already on, else toggle on
        key.classList.remove('selected');
    }
    else {
        key.classList.add('selected');
    } 
})

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