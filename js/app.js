const resultInput = document.querySelector(
  `.div-result_input input[type="text"]`
);

const rangeInput = document.querySelector(".div-card_range input");
const numberLenght = document.querySelector("#number-lenght");

const checkboxInput = document.querySelectorAll(`input[type="checkbox"]`);
const checkboxArray = Array.from(checkboxInput);

const generateBtn = document.querySelector(".generate-btn");

// Functions

// Create the array password
const arrayPassword = () => {
  const includedPassword = [];

  const includeUppercase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const includeLowercase = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const includeNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const includeSymbols = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "-",
    "=",
    "{",
    "}",
    "[",
    "]",
    "|",
    ";",
    ":",
    "'",
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
  ];

  checkboxArray.forEach((checkbox) => {
    if (checkbox.checked) {
      switch (checkbox.id) {
        case "uppercase":
          includedPassword.push(...includeUppercase);
          break;
        case "lowercase":
          includedPassword.push(...includeLowercase);
          break;
        case "numbers":
          includedPassword.push(...includeNumbers);
          break;
        case "symbols":
          includedPassword.push(...includeSymbols);
          break;
        default:
          break;
      }
    }
  });

  return includedPassword;
};

// Generate random number for password array
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random password
function generatePassword(passwordLenght) {
  const arrayPasswordCharacters = arrayPassword();
  const resultPassword = [];

  //   console.log(arrayPasswordCharacters[5]);
  //   console.log(passwordLenght);

  for (let i = 1; i <= passwordLenght; i++) {
    const letterForPassword =
      arrayPasswordCharacters[randomNumber(0, arrayPasswordCharacters.length)];
    resultPassword.push(...letterForPassword);
  }

  resultInput.value = resultPassword.join("");
}

// Events Listeners
document.addEventListener("DOMContentLoaded", () => {
  generateBtn.addEventListener("click", () => {
    generatePassword(rangeInput.value);
  });

  // Handle range input
  rangeInput.addEventListener("input", () => {
    // Update range number
    numberLenght.textContent = rangeInput.value;

    //
    if (rangeInput.value < 5) {
      rangeInput.value = 5;
      numberLenght.textContent = 5;
    }
  });
});
