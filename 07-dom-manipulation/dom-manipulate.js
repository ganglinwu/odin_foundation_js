const container = document.querySelector('#container');

const paragraph = document.createElement('p');
paragraph.style.cssText = 'color: red;'
paragraph.textContent = 'Hey I\'m red!';

const header3 = document.createElement('h3');
header3.style.cssText = 'color: blue;'
header3.textContent = 'I\'m a blue h3!';

const container2 = document.createElement('div');
container2.style.cssText = 'background-color: pink; border: 0.1cm solid black;'

const header1 = document.createElement('h1');
header1.textContent = 'I\'m in a div'

const paragraph2 = document.createElement('p');
paragraph2.textContent = 'ME TOO!'

container2.appendChild(header1);
container2.appendChild(paragraph2);

container.appendChild(paragraph);
container.appendChild(header3);
container.appendChild(container2);