let timer;
let isRunning = false;
let currentSeconds = 0;
let totalTimeRan = 0; // Tempo total de estudo
let currentPomodoroIndex = 0; // Índice do Pomodoro atual
let pomodoros = 0; // Total de Pomodoros
let pomodoroDuration = 0; // Duração de cada Pomodoro
let breakDuration = 0; // Duração de cada Pausa
let accumulatedSeconds = 0; // Armazena o tempo acumulado ao clicar nos botões

const startButton = document.getElementById('startPomodoro');
const stopButton = document.getElementById('stopPomodoro');
const pomodoroList = document.getElementById('pomodoroList');
const add1MinButton = document.getElementById('add1Min');
const add5MinButton = document.getElementById('add5Min');
const add10MinButton = document.getElementById('add10Min');

startButton.addEventListener('click', function () {
    if (isRunning) return;

    const studyTime = parseInt(document.getElementById('studyTimeInput').value);
    const pauseTime = parseInt(document.getElementById('pauseTimeInput').value);
    pomodoros = parseInt(document.getElementById('pomodoroInput').value);

    if (isNaN(studyTime) || studyTime <= 0 || isNaN(pomodoros) || pomodoros <= 0) {
        alert('Por favor, insira valores válidos!');
        return;
    }

    // Calcular a duração de cada pomodoro
    pomodoroDuration = Math.floor(studyTime / pomodoros);

    // Define a pausa com base na entrada do usuário ou no valor padrão
    breakDuration = isNaN(pauseTime) || pauseTime <= 0 ? (pomodoroDuration >= 40 ? 10 : 7) : pauseTime;

    document.getElementById('breakTimeDisplay').textContent = `Cada pausa terá ${breakDuration} minutos.`;

    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    toggleAddTimeButtons(false);

    totalTimeRan = 0; // Reseta o tempo total de estudo (não inclui pausas)

    renderPomodoroList(pomodoros, pomodoroDuration); // Renderiza o quadro dos Pomodoros
    runPomodoroCycle(pomodoros);
});

stopButton.addEventListener('click', function () {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;

    document.getElementById('timerDisplay').textContent = "00:00";
    document.getElementById('statusDisplay').textContent = "Pomodoro interrompido.";
    startButton.disabled = false;
    stopButton.disabled = true;
    toggleAddTimeButtons(true);
    displayFinalResult();
});

function runPomodoroCycle(pomodoros) {
    const display = document.getElementById('timerDisplay');
    const statusDisplay = document.getElementById('statusDisplay');

    function startPhase(seconds, message, callback, currentPomodoro) {
        currentSeconds = seconds; // Salvar os segundos restantes para modificar com os botões
        statusDisplay.textContent = message;
        highlightPomodoro(currentPomodoro, seconds); // Destaca o Pomodoro atual

        timer = setInterval(() => {
            if (currentSeconds <= 0) {
                clearInterval(timer);
                callback();
            } else {
                currentSeconds--;
                if (currentPomodoro > 0) {
                    totalTimeRan++; // Contabiliza o tempo total de estudo (apenas os pomodoros)
                }
                const minutes = Math.floor(currentSeconds / 60);
                const remainingSeconds = currentSeconds % 60;
                display.textContent = `${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
                updatePomodoroTime(currentPomodoro, minutes, remainingSeconds); // Atualiza o tempo no quadro
            }
        }, 1000);
    }

    function startPomodoro(index) {
        if (index > pomodoros || !isRunning) {
            isRunning = false;
            statusDisplay.textContent = "Ciclo de Pomodoros concluído!";
            startButton.disabled = false;
            stopButton.disabled = true;
            toggleAddTimeButtons(true);
            displayFinalResult();
            return;
        }
        currentPomodoroIndex = index; // Atualiza o Pomodoro atual
        startPhase(
            pomodoroDuration * 60,
            `Pomodoro ${index} em andamento...`,
            () => startBreak(index),
            index
        );
    }

    function startBreak(index) {
        if (index === pomodoros || !isRunning) {
            isRunning = false;
            statusDisplay.textContent = "Ciclo de Pomodoros concluído!";
            startButton.disabled = false;
            stopButton.disabled = true;
            toggleAddTimeButtons(true);
            displayFinalResult();
            return;
        }
        startPhase(
            breakDuration * 60,
            `Pausa após Pomodoro ${index}...`,
            () => startPomodoro(index + 1),
            0 // Nenhum Pomodoro destacado durante a pausa
        );
    }

    startPomodoro(1);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function toggleAddTimeButtons(disable) {
    add1MinButton.disabled = disable;
    add5MinButton.disabled = disable;
    add10MinButton.disabled = disable;
}

function renderPomodoroList(pomodoros, pomodoroDuration) {
    pomodoroList.innerHTML = '';
    for (let i = 1; i <= pomodoros; i++) {
        const li = document.createElement('li');
        li.textContent = `Pomodoro ${i}: ${formatTime(pomodoroDuration)}:00`;
        li.id = `pomodoro-${i}`;
        pomodoroList.appendChild(li);
    }
}

function updatePomodoroTime(index, minutes, seconds) {
    const pomodoroItem = document.getElementById(`pomodoro-${index}`);
    if (pomodoroItem) {
        pomodoroItem.textContent = `Pomodoro ${index} = ${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

function highlightPomodoro(index, seconds) {
    const items = pomodoroList.querySelectorAll('li');
    items.forEach((item, i) => {
        if (i === index - 1) {
            item.style.fontWeight = 'bold';
            item.style.color = '#28a745';
            item.style.textDecoration = 'underline';
        } else {
            item.style.fontWeight = 'normal';
            item.style.color = '#333';
        }
    });
}

function displayFinalResult() {
    const totalMinutes = Math.floor(totalTimeRan / 60);
    const totalSeconds = totalTimeRan % 60;
    document.getElementById('finalResult').textContent =
        `Tempo de estudo (sem pausas): ${formatTime(totalMinutes)}:${formatTime(totalSeconds)}.`;
}

// Botões para adicionar tempo
function showMessage(button, message) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.style.position = 'absolute';
    messageBox.style.backgroundColor = '#28a745';
    messageBox.style.color = 'white';
    messageBox.style.padding = '5px 10px';
    messageBox.style.borderRadius = '5px';
    messageBox.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    messageBox.style.fontSize = '12px';
    messageBox.style.whiteSpace = 'nowrap';
    messageBox.style.transform = 'translate(-50%, -10px)';
    messageBox.style.zIndex = '1000';

    button.parentElement.appendChild(messageBox);

    const buttonRect = button.getBoundingClientRect();
    messageBox.style.left = `${button.offsetLeft + button.offsetWidth / 2}px`;
    messageBox.style.top = `${button.offsetTop - messageBox.offsetHeight}px`;

    // Remove a mensagem após 2 segundos
    setTimeout(() => {
        button.parentElement.removeChild(messageBox);
        accumulatedSeconds = 0; // Zera o acumulador apenas quando a mensagem for removida
    }, 500);
}

function addTime(seconds, button) {
    if (isRunning) {
        accumulatedSeconds += seconds;
        currentSeconds += seconds;

        const accumulatedMinutes = Math.floor(accumulatedSeconds / 60);
        const remainingSeconds = accumulatedSeconds % 60;

        showMessage(
            button,
            `+${accumulatedMinutes > 0 ? `${accumulatedMinutes} minutos ` : ""}${
                remainingSeconds > 0 ? `${remainingSeconds} segundos` : ""
            } adicionados!`
        );
    }
}

// Eventos para os botões
add1MinButton.addEventListener('click', function () {
    addTime(60, this);
});

add5MinButton.addEventListener('click', function () {
    addTime(300, this);
});

add10MinButton.addEventListener('click', function () {
    addTime(600, this);
});
