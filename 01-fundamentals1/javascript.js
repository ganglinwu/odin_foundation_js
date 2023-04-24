// creating variables using let

let message; // js is dynamic, need not declare variable type

message = 'Hello'; 


// a more concise way to declare the same string into variable

let message = 'Hello';


// we can also declare multiple variables in 1 line

let user = 'John', age = 25, message = 'Hello';

// but for better readability, we prefer multi line
let user = 'John'
  , age = 25   
  , message = 'Hello';




/* 
There is a more POWERFUL way to declare variables, and that is to use var

e.g. 

var message = 'Hello';

1) var has no block scope. i.e. even if it's declared inside an if or for loop, it can be used outside of it like a global variable

2) var declarations are processed at function start 

e.g. function example() {

    alert(message);

    var message = 'Hello';
}
This is a valid function as JavaScript will 'hoist' the var declaration to the top of the function automatically
*/




// re-assigning values to variables

let message = 'Hello';

message = 'World';

console.log(message); //prints World

// be careful not to use let in the 2nd line of the above example! let does not allow re-declaration!



// naming of variables

let userName; // this is known as camelCase.. e.g. oneTwoThreeFourFive
let test123; // varaiable names must not start with numbers!

let $ = 1; // this is surprisingly valid
let _ = 2; // so is this

console.log($+_); // prints 3

// hyphens are not valid so let user-name; will be INVALID!

let Apple;
let apple; // variable names are CASE SENSITIVE!


// "use strict";
num = 5;

console.log(num) // prints 5 despite num not being declared! however if we enable "use strict"; then this no longer works!


// const

const name = 'David' // constants cannot be reassigned!

const COLOR_RED = '#F00' // known constants such as hex code for colors are usually CAPITALIZED