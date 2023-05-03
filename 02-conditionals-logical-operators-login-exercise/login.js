let userName = prompt('Who\'s there?');

if ((userName==='')||(userName===null)) {
    alert('Canceled')
}
else if (userName==='Admin') {
    let password = prompt('Password?');
    if ((password==='')||(password===null)) {
        alert('Canceled')
    }
    else if (password==='TheMaster') {
        alert('Welcome!')
    }
    else {
        alert('Wrong password')
    }
}
else {
    alert('I dont\'t know you')
}