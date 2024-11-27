"use strict";

var numbers = document.querySelectorAll(".number");
var generateBtn = document.querySelector("#generate");

function generateNumbers() {
  var max = 60; // número máximo

  var min = 1; // número mínimo

  var result = []; // array para armazenar os números gerados
  // gera 6 números aleatórios únicos

  while (result.length < 6) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min; // gera um número aleatório

    if (!result.includes(number)) {
      // verifica se o número já foi gerado
      result.push(number); // adiciona o número ao array
    }
  } // exibe os números gerados na tela


  for (var i = 0; i < numbers.length; i++) {
    numbers[i].textContent = result[i]; // atribui o número ao elemento span correspondente
  }
}

generateBtn.addEventListener("click", generateNumbers);