const calcular = document.querySelector(".calcular");
const limpar  = document.querySelector(".limpa");
const containForm = document.querySelector("#container-form");
const containResult = document.querySelector("#saida-dados");
const voltar = document.querySelector("#voltar");
const spanImc = document.querySelector(".imc-number span");
const situacao = document.querySelector(".situacao span");


calcular.addEventListener("click", () => {
    // Obter os valores de altura e peso quando o botão de calcular for clicado
    const num1 = document.querySelector("#altura").value;
    const num2 = document.querySelector("#peso").value;

    // Verificar se os campos de altura e peso estão preenchidos
    if (num1.trim() === "" || num2.trim() === "") {
        alert("Por favor, informe valores válidos para altura e peso.");
        return;
    }

    let altura = num1.replace(",", ".");
    let peso = num2.replace(",", ".");

    containForm.style.display = "none";
    containResult.style.display = "block";

    spanImc.innerHTML = "";
    situacao.innerHTML = "";

    let imc = peso / (altura * altura);
    spanImc.innerHTML += imc.toFixed(2);

    if (imc < 18.5) {
        situacao.innerHTML += "Magreza";
    } else if (imc >= 18.5 && imc <= 24.9) {
        situacao.innerHTML += "Normal";
    } else if (imc >= 25 && imc <= 29.9) {
        situacao.innerHTML += "Sobrepeso";
    } else if (imc >= 30 && imc <= 39.9) {
        situacao.innerHTML += "Obesidade";
    } else {
        situacao.innerHTML += "Obesidade Grave!!";
    }
})

limpar.addEventListener("click", () => {
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
})

voltar.addEventListener("click", () => {
    containForm.style.display = "block";
    containResult.style.display = "none";
})

limpar.addEventListener("click", () => {
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
})

voltar.addEventListener("click", () =>{
    containForm.style.display = "block";
    containResult.style.display = "none";
})

