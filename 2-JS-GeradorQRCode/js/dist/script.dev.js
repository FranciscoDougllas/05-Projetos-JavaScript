"use strict";

var container = document.querySelector("#container");
var qrCodeBtn = document.querySelector("#qr-form button");
var qrCodeInput = document.querySelector("#qr-form input");
var qrCodeImg = document.querySelector("#qr-code img");
var oculto = document.querySelector("#qr-code"); // Eventos

function generateQrCode() {
  var qrCodeInputValue = qrCodeInput.value;
  if (!qrCodeInputValue) return;
  qrCodeBtn.innerText = "Gerando QR Code...";
  qrCodeImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=".concat(qrCodeInputValue);
  qrCodeImg.addEventListener("load", function () {
    container.classList.add("active");
    qrCodeBtn.innerText = "QR Code Gerado";
  });
  oculto.style.display = "block";
}

qrCodeBtn.addEventListener("click", function () {
  generateQrCode();
});
qrCodeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    generateQrCode();
  }
}); // Limpa Área do QR Code

qrCodeInput.addEventListener("keyup", function () {
  if (!qrCodeInput.value) {
    container.classList.remove("active");
    qrCodeImg.src = "";
    oculto.style.display = "none";
    qrCodeBtn.innerText = "Gerar QR Code";
  }
});