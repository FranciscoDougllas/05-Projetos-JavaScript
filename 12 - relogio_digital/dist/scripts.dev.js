"use strict";

function updateClock() {
  var clockElement = document.querySelector(".clock");
  var hoursElement = clockElement.querySelector(".hours");
  var minutesElement = clockElement.querySelector(".minutes");
  var secondsElement = clockElement.querySelector(".seconds");
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

updateClock();
setInterval(updateClock, 1000);