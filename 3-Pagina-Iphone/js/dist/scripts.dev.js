"use strict";

var buttons = document.querySelectorAll("#image-picker li");
var image = document.querySelector("#product-image");
buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    console.log(e);
    buttons.forEach(function (btn) {
      return btn.querySelector(".color").classList.remove("selected");
    });
    var button = e.target;
    var id = button.getAttribute("id");
    button.querySelector(".color").classList.add("selected");
    image.classList.toggle("changing");
    image.setAttribute("src", "img/iphone_".concat(id, ".jpg"));
    setTimeout(function () {
      image.classList.toggle("changing");
    }, 200);
  });
});