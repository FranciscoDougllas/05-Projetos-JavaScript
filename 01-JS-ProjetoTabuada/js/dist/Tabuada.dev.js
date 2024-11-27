"use strict";

var saida = document.getElementById("saida-dados");
var limp = document.getElementById("limp");
var completa = document.getElementById("complet");
var tbComplet = document.getElementById("tb-complet");
var mais = document.querySelector("#soma");
var menos = document.querySelector("#sub");
var divid = document.querySelector("#divid");
var mult = document.querySelector("#mult");
mais.addEventListener("click", function (e) {
  e.preventDefault();
  var num1 = parseInt(document.querySelector("#number1").value);
  var num2 = parseInt(document.querySelector("#number2").value);
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
  saida.innerHTML = "<h3>Adição</h3>";

  for (var i = 1; i <= num2; i++) {
    saida.innerHTML += "<p>".concat(num1, " + ").concat(i, " = ").concat(num1 + i, "</p><hr>");
  }
});
menos.addEventListener("click", function (e) {
  e.preventDefault();
  var num1 = parseInt(document.querySelector("#number1").value);
  var num2 = parseInt(document.querySelector("#number2").value);
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
  saida.innerHTML = "<h3>Subtração</h3>";

  for (var i = 1; i <= num2; i++) {
    saida.innerHTML += "<p>".concat(num1, " - ").concat(i, " = ").concat(num1 - i, "</p><hr>");
  }
});
divid.addEventListener("click", function (e) {
  e.preventDefault();
  var num1 = parseInt(document.querySelector("#number1").value);
  var num2 = parseInt(document.querySelector("#number2").value);
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
  saida.innerHTML = "<h3>Divisão</h3>";

  for (var i = 1; i <= num2; i++) {
    saida.innerHTML += "<p>".concat(num1, " \xF7 ").concat(i, " = ").concat((num1 / i).toFixed(2), "</p><hr>");
  }
});
mult.addEventListener("click", function (e) {
  e.preventDefault();
  var num1 = parseInt(document.querySelector("#number1").value);
  var num2 = parseInt(document.querySelector("#number2").value);
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
  saida.innerHTML = "<h3>Multiplicação</h3>";

  for (var i = 1; i <= num2; i++) {
    saida.innerHTML += "<p>".concat(num1, " \xD7 ").concat(i, " = ").concat(num1 * i, "</p><hr>");
  }
});
completa.addEventListener("click", function (e) {
  e.preventDefault();
  var num1 = parseInt(document.querySelector("#number1").value);
  var num2 = parseInt(document.querySelector("#number2").value);
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
  var adicao = document.createElement('div');
  var subtrair = document.createElement('div');
  var multiplicar = document.createElement('div');
  var dividir = document.createElement('div');
  adicao.innerHTML = "<h4>Adição</h4>";
  subtrair.innerHTML = "<h4>Subtração</h4>";
  multiplicar.innerHTML = "<h4>Multiplicação</h4>";
  dividir.innerHTML = "<h4>Divisão</h4>";

  for (var i = 1; i <= num2; i++) {
    adicao.innerHTML += "<p>".concat(num1, " + ").concat(i, " = ").concat(num1 + i, "</p>");
    subtrair.innerHTML += "<p>".concat(num1, " - ").concat(i, " = ").concat(num1 - i, "</p>");
    multiplicar.innerHTML += "<p>".concat(num1, " \xD7 ").concat(i, " = ").concat(num1 * i, "</p>");
    dividir.innerHTML += "<p>".concat(num1, " \xF7 ").concat(i, " = ").concat((num1 / i).toFixed(2), "</p>");
  }

  tbComplet.appendChild(adicao);
  tbComplet.appendChild(subtrair);
  tbComplet.appendChild(multiplicar);
  tbComplet.appendChild(dividir);
});
limp.addEventListener("click", function (e) {
  saida.innerHTML = "";
  tbComplet.innerHTML = "";
});