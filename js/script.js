/*-------------
| VARIABLES
-------------*/
// Password Var
const generateBtn = document.querySelector(`#generate`);
const passwordText = document.querySelector(`#password`);

//Characters to use
// const symbols = `!@#$%&`;
// const numbers = `123456789`;
// const caps = `ABCDEFGHIJKLMNOPQSRTUVWXYZ`;
// const letters = `abcdefghijklmnopqrstuvwxyz`;

// Inputs Confirm

let numberOfCharacters;
let numbersQuestion;
let lettersOnCapsQuestion;
let specialCharactersQuestion;

//Show/Hide Btn and Copy ClipBoard
const showBtn = document.querySelector(`.btn-show`);
const showTxt = document.querySelector(`#show-txt`);
let triggerShowAndHide = false;
const copyBtn = document.querySelector(`.btn-copy`);


/*-------------
| FUNCTIONS
-------------*/

// Generate Password Functions
function askLogic(){

    //Ask how many characters 
    numberOfCharacters = parseInt(prompt('How many characters do you want? (More than 8, less than 128)'));

    if (numberOfCharacters >= 8 && numberOfCharacters <= 128) {
        alert(`Your number of characters are correct`);
        numbersQuestion = confirm(`Do you want numbers?`);
        lettersOnCapsQuestion = confirm(`Do you want caps?`);
        specialCharactersQuestion = confirm(`Do you want special characters?`);

        generatePassword();
        
    } else {
        alert(`Your number of characters aren't correct`)
        numbersQuestion = false;
        lettersOnCapsQuestion = false;
        specialCharactersQuestion = false;
    } 
}

function generatePassword() {
    let symbols = `!@#$%&`;
    let numbers = `123456789`;
    let caps = `ABCDEFGHIJKLMNOPQSRTUVWXYZ`;
    let letters = `abcdefghijklmnopqrstuvwxyz`;
    let password = ``;

    if (numbersQuestion === true) letters += numbers;
    if (lettersOnCapsQuestion === true) letters += caps;
    if (specialCharactersQuestion == true) letters += symbols;

    for (let i = 0; i < numberOfCharacters; i++) {
        let random = Math.floor(Math.random()  * letters.length);
        password += letters.charAt(random);
    }

    passwordText.value = password;
}


//Copy To ClipBoard Function

function copyToClipBoard(){
    passwordText.select();
    document.execCommand('copy');
    alert('copied!');
}


// Show Password Function

function showPassword(){
    if (triggerShowAndHide == false) {
        passwordText.type = 'txt';
        showTxt.textContent = `Hide`;
        triggerShowAndHide = true;

    } else if (triggerShowAndHide == true){
        passwordText.type = `password`;
        showTxt.textContent = `Show`;
        triggerShowAndHide = false;
    }
}


/*-------------
| EVENTS
-------------*/

// Generate Password Events
generateBtn.addEventListener("click", askLogic);


//Event Show And Hde Password
showBtn.addEventListener('click', showPassword);


// Copy ClipBoard Event
copyBtn.addEventListener('click', copyToClipBoard);

