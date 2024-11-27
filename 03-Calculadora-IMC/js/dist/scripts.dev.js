"use strict";

// IMC DATA
var data = [{
  min: 0,
  max: 18.4,
  classification: "Menor que 18,5",
  info: "Magreza",
  obesity: "0"
}, {
  min: 18.5,
  max: 24.9,
  classification: "Entre 18,5 e 24,9",
  info: "Normal",
  obesity: "0"
}, {
  min: 25,
  max: 29.9,
  classification: "Entre 25,0 e 29,9",
  info: "Sobrepeso",
  obesity: "I"
}, {
  min: 30,
  max: 39.9,
  classification: "Entre 30,0 e 39,9",
  info: "Obesidade",
  obesity: "II"
}, {
  min: 40,
  max: 99,
  classification: "Maior que 40,0",
  info: "Obesidade grave",
  obesity: "III"
}]; // Seleção de elementos

var imcTable = document.querySelector("#imc-table");
var heightInput = document.querySelector("#height");
var weightInput = document.querySelector("#weight");
var calcBtn = document.querySelector("#calc-btn");
var clearBtn = document.querySelector("#clear-btn");
var calcContainer = document.querySelector("#calc-container");
var resultContainer = document.querySelector("#result-container");
var imcNumber = document.querySelector("#imc-number span");
var imcInfo = document.querySelector("#imc-info span");
var backBtn = document.querySelector("#back-btn"); // Funções

function createTable(data) {
  data.forEach(function (item) {
    var div = document.createElement("div");
    div.classList.add("table-data");
    var classification = document.createElement("p");
    classification.innerText = item.classification;
    var info = document.createElement("p");
    info.innerText = item.info;
    var obesity = document.createElement("p");
    obesity.innerText = item.obesity;
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);
    imcTable.appendChild(div);
  });
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
  var imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
} // Init


createTable(data); // Eventos

[heightInput, weightInput].forEach(function (el) {
  el.addEventListener("input", function (e) {
    var updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
  });
});
calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var weight = +weightInput.value.replace(",", ".");
  var height = +heightInput.value.replace(",", ".");
  console.log(weight, height);
  if (!weight || !height) return;
  var imc = calcImc(height, weight);
  var info;
  data.forEach(function (item) {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  if (!info) return;
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;

    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;

    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});
clearBtn.addEventListener("click", function (e) {
  e.preventDefault();
  cleanInputs();
});
backBtn.addEventListener("click", function (e) {
  cleanInputs();
  showOrHideResults();
});