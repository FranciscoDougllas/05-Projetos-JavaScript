"use strict";

// Seleção de elementos
var generatePasswordButton = document.querySelector("#generate-password");
var generatedPasswordElement = document.querySelector("#generated-password"); // Após refatoração

var openCloseGeneratorButton = document.querySelector("#open-generate-password");
var generatePasswordContainer = document.querySelector("#generate-options");
var lengthInput = document.querySelector("#length");
var lettersInput = document.querySelector("#letters");
var numbersInput = document.querySelector("#numbers");
var symbolsInput = document.querySelector("#symbols");
var copyPasswordButton = document.querySelector("#copy-password"); // Funções

var getLetterLowerCase = function getLetterLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

var getLetterUpperCase = function getLetterUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

var getNumber = function getNumber() {
  return Math.floor(Math.random() * 11).toString();
};

var getSymbol = function getSymbol() {
  var symbols = "(){}[]=<>/,.!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

var generatePassword = function generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) {
  var password = "";
  var passwordLength = lengthInput.value; // Após refatoração

  var generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(function () {
      var randomValue = generators[Math.floor(Math.random() * generators.length)]();
      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
}; // Eventos


generatePasswordButton.addEventListener("click", function (e) {
  e.preventDefault();
  generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});
openCloseGeneratorButton.addEventListener("click", function () {
  generatePasswordContainer.classList.toggle("hide");
});
copyPasswordButton.addEventListener("click", function (e) {
  e.preventDefault();
  var password = generatedPasswordElement.querySelector("h4").innerText;
  navigator.clipboard.writeText(password).then(function () {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";
    setTimeout(function () {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});