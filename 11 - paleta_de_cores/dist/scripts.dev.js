"use strict";

var generateButton = document.querySelector("#generate-button");
var colorsDiv = document.querySelector(".colors");
generateButton.addEventListener("click", generateColors);

function generateColors() {
  colorsDiv.innerHTML = "";

  for (var i = 0; i < 5; i++) {
    var color = generateRandomColor();
    var colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    var colorName = document.createElement("p");
    colorName.innerText = color;
    colorName.style.color = color;
    colorDiv.appendChild(colorName);
    colorsDiv.appendChild(colorDiv);
  }
}

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}