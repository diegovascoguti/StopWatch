let contadorInterval;
let contadorValor = 0;
let contadorDecremental = false;
let contadorPausado = false;

function iniciarContador() {
    contadorInterval = setInterval(actualizarContador, 1000);
}

function detenerContador() {
    clearInterval(contadorInterval);
}

function pausarContador() {
    detenerContador();
    contadorPausado = true;
    actualizarBotones();
}

function reanudarContador() {
    iniciarContador();
    contadorPausado = false;
    actualizarBotones();
}

function retornarMenu() {
    detenerContador();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('botones').innerHTML = '';
}

function actualizarContador() {
    if (contadorDecremental) {
        contadorValor--;
        if (contadorValor <= 0) {
            detenerContador();
        }
    } else {
        contadorValor++;
    }
    mostrarContador();
}

function mostrarContador() {
    const horas = Math.floor(contadorValor / 3600);
    const minutos = Math.floor((contadorValor % 3600) / 60);
    const segundos = contadorValor % 60;
    document.getElementById('contadorDisplay').innerHTML = `${formatoDosDigitos(horas)}:${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundos)}`;
}

function actualizarBotones() {
    const botonesDiv = document.getElementById('botones');
    if (contadorPausado) {
        botonesDiv.innerHTML = '<button id="botonReanudar" class="btn btn-success mr-2" onclick="reanudarContador()">Reanudar</button><button id="botonPausar" class="btn btn-warning" onclick="pausarContador()">Pausar</button><button class="btn btn-danger ml-2" onclick="retornarMenu()">Volver al Menú</button>';
    } else {
        botonesDiv.innerHTML = '<button id="botonPausar" class="btn btn-warning mr-2" onclick="pausarContador()">Pausar</button><button id="botonReanudar" class="btn btn-success" onclick="reanudarContador()">Reanudar</button><button class="btn btn-danger ml-2" onclick="retornarMenu()">Volver al Menú</button>';
    }
}

function formatoDosDigitos(valor) {
    return valor < 10 ? '0' + valor : valor;
}

function seleccionarContadorIncremental() {
    contadorDecremental = false;
    contadorValor = 0;
    iniciarContador();
    document.getElementById('menu').style.display = 'none';
    actualizarBotones();
}

function seleccionarContadorDecremental() {
    contadorDecremental = true;
    contadorValor = obtenerHoraInicial();
    mostrarContador();
    document.getElementById('menu').style.display = 'none';
    actualizarBotones();
}

function obtenerHoraInicial() {
    const hora = prompt("Ingrese la hora inicial en formato HH:MM:SS");
    if (hora) {
        const partesHora = hora.split(":");
        const horas = parseInt(partesHora[0]) || 0;
        const minutos = parseInt(partesHora[1]) || 0;
        const segundos = parseInt(partesHora[2]) || 0;
        return horas * 3600 + minutos * 60 + segundos;
    } else {
        return 0;
    }
}

document.getElementById('contadorIncrementalBtn').addEventListener('click', seleccionarContadorIncremental);
document.getElementById('contadorDecrementalBtn').addEventListener('click', seleccionarContadorDecremental);
