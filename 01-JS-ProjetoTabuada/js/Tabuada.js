const saida = document.getElementById("saida-dados");
const limp = document.getElementById("limp");
const completa = document.getElementById("complet");
const tbComplet = document.getElementById("tb-complet");

const mais = document.querySelector("#soma");
const menos = document.querySelector("#sub");
const divid = document.querySelector("#divid");
const mult = document.querySelector("#mult");

mais.addEventListener("click", (e) => {
    e.preventDefault();
    let num1 = parseInt(document.querySelector("#number1").value);
    let num2 = parseInt(document.querySelector("#number2").value);
    saida.innerHTML = "";
    tbComplet.innerHTML = "";
    saida.innerHTML = "<h3>Adição</h3>";
    for (let i = 1; i <= num2; i++) {
        saida.innerHTML += `<p>${num1} + ${i} = ${num1 + i}</p><hr>`;
    }
});

menos.addEventListener("click", (e) => {
    e.preventDefault();
    let num1 = parseInt(document.querySelector("#number1").value);
    let num2 = parseInt(document.querySelector("#number2").value);
    saida.innerHTML = "";
    tbComplet.innerHTML = "";
    saida.innerHTML = "<h3>Subtração</h3>";
    for (let i = 1; i <= num2; i++) {
        saida.innerHTML += `<p>${num1} - ${i} = ${num1 - i}</p><hr>`;
    }
});

divid.addEventListener("click", (e) => {
    e.preventDefault();
    let num1 = parseInt(document.querySelector("#number1").value);
    let num2 = parseInt(document.querySelector("#number2").value);
    saida.innerHTML = "";
    tbComplet.innerHTML = "";
    saida.innerHTML = "<h3>Divisão</h3>";
    for (let i = 1; i <= num2; i++) {
        saida.innerHTML += `<p>${num1} ÷ ${i} = ${(num1 / i).toFixed(2)}</p><hr>`;
    }
});

mult.addEventListener("click", (e) => {
    e.preventDefault();
    let num1 = parseInt(document.querySelector("#number1").value);
    let num2 = parseInt(document.querySelector("#number2").value);
    saida.innerHTML = "";
    tbComplet.innerHTML = "";
    saida.innerHTML = "<h3>Multiplicação</h3>";
    for (let i = 1; i <= num2; i++) {
        saida.innerHTML += `<p>${num1} × ${i} = ${num1 * i}</p><hr>`;
    }
});

completa.addEventListener("click", (e) => {
    e.preventDefault();
    let num1 = parseInt(document.querySelector("#number1").value);
    let num2 = parseInt(document.querySelector("#number2").value);
    saida.innerHTML = "";
    tbComplet.innerHTML = "";

    let adicao = document.createElement('div');
    let subtrair = document.createElement('div');
    let multiplicar = document.createElement('div');
    let dividir = document.createElement('div');

    adicao.innerHTML = "<h4>Adição</h4>";
    subtrair.innerHTML = "<h4>Subtração</h4>";
    multiplicar.innerHTML = "<h4>Multiplicação</h4>";
    dividir.innerHTML = "<h4>Divisão</h4>";

    for (let i = 1; i <= num2; i++) {
        adicao.innerHTML += `<p>${num1} + ${i} = ${num1 + i}</p>`;
        subtrair.innerHTML += `<p>${num1} - ${i} = ${num1 - i}</p>`;
        multiplicar.innerHTML += `<p>${num1} × ${i} = ${num1 * i}</p>`;
        dividir.innerHTML += `<p>${num1} ÷ ${i} = ${(num1 / i).toFixed(2)}</p>`;
    }

    tbComplet.appendChild(adicao);
    tbComplet.appendChild(subtrair);
    tbComplet.appendChild(multiplicar);
    tbComplet.appendChild(dividir);
});

limp.addEventListener("click", (e) => {
    saida.innerHTML = "";
    tbComplet.innerHTML = "";
});