
const n = 16;
const container = document.querySelector('.container');
container.style.cssText = 'display:flex; flex-direction:column; height:100vh;'
for (let i = 0; i < n; i++) {
    let a = document.createElement('div');
    a.classList.add(`row${i+1}`);
    a.style.cssText= 'display:flex; flex:1;'
    for (let k = 0; k < n; k++) {
        let b = document.createElement('div');
        b.classList.add(`box${k+1},${16-i}`);
        b.style.cssText= 'border: 1px solid black; flex: 1;'
        a.appendChild(b);
    }
    container.appendChild(a);
}

//need to look into: how not to let margin eat into available space