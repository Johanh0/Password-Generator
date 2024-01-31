const resultInput = document.querySelector(
  `.div-result_input input[type="text"]`
);

const copyIcon = document.querySelector(".fa-copy");

const rangeInput = document.querySelector(".div-card_range input");
const numberLenght = document.querySelector("#number-lenght");

const checkboxInput = document.querySelectorAll(`input[type="checkbox"]`);
const checkboxArray = Array.from(checkboxInput);

const strengthTextLevel = document.querySelector("#div-strength_level");
const barsContainer = document.querySelector(".div-strength_bars");
const barsLevel = Array.from(barsContainer.children);

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
  // Check if the button is disabled
  if (generateBtn.classList.contains("disabled-btn")) {
    return;
  }

  const arrayPasswordCharacters = arrayPassword();
  const resultPassword = [];

  for (let i = 1; i <= passwordLenght; i++) {
    const letterForPassword =
      arrayPasswordCharacters[randomNumber(0, arrayPasswordCharacters.length)];
    resultPassword.push(...letterForPassword);
  }

  resultInput.value = resultPassword.join("");

  // Generate password level
  strengthBarsLevel();
}

// Strength of the bars
function strengthBarsLevel() {
  let passwordLevel = 0;
  let barsSelected = [];

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].checked) {
      passwordLevel++;
    }
  }

  const barsLevelStyle = (barEnd, colorBars, message) => {
    barsSelected = barsLevel.slice(0, barEnd);
    barsSelected.forEach((bar) => {
      bar.style.backgroundColor = `${colorBars}`;
    });
    strengthTextLevel.textContent = `${message}`;
  };

  // Eliminate background color
  barsLevelStyle(4, "transparent", "");

  switch (passwordLevel) {
    case 1:
      barsLevelStyle(1, "#F64A4A", "TOO WEAK!");
      break;
    case 2:
      barsLevelStyle(2, "#FB7C58", "WEAK");
      break;
    case 3:
      barsLevelStyle(3, "#F8CD65", "MEDIUM");
      break;
    case 4:
      barsLevelStyle(4, "#A4FFAF", "STRONG");
      break;
    default:
      break;
  }
}

// Logic for check the checkboxes
const checkTheCheckboxes = () => {
  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].checked) {
      return generateBtn.classList.remove("disabled-btn");
    }
  }

  return generateBtn.classList.add("disabled-btn");
};

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

  // Copy the password
  copyIcon.addEventListener("click", () => {
    try {
      navigator.clipboard.writeText(resultInput.value);
    } catch (err) {
      console.error("Error with the clipboard API", err);
    }
  });

  // Check if any checkbox is empty when page is loaded
  checkTheCheckboxes();

  // Check if any checkbox is empty
  checkboxArray.forEach((checkbox) => {
    checkbox.addEventListener("input", () => {
      checkTheCheckboxes();
    });
  });

  // Update range number after load page
  numberLenght.textContent = rangeInput.value;

  // Update strength level after load page
  strengthBarsLevel();
});
