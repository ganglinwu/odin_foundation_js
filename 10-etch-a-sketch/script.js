
let gridsize = 16;

const container = document.querySelector('.container');
container.style.cssText = 'display:flex; flex-direction:column; height:80vh; width: 90vw; box-sizing :border-box; margin:auto;'


for (let i = 0; i < gridsize; i++) {
    
    let rowDiv = document.createElement('div');
    rowDiv.classList.add(`row${i+1}`);
    rowDiv.style.cssText= 'display:flex; flex:1;'
    
    for (let k = 0; k < gridsize; k++) {
        let box = document.createElement('div');
        box.classList.add(`box${k+1},${16-i}`);
        box.style.cssText= 'border: 1px solid black; flex: 1; transition: 0.2s;'
        box.addEventListener('mouseover', ()=> {
            box.classList.add('hover');});
        box.addEventListener('mouseout', ()=> {
            box.classList.remove('hover');
            box.classList.add('drawn')});
        rowDiv.appendChild(box);
    }
    container.appendChild(rowDiv);
}

//need to look into: how not to let margin eat into available space