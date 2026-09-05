/* ============================================================
   Ejercicios de manipulación del DOM
   Juan Manuel Moreno Muñoz
   Desarrollo de Aplicaciones Web — Universidad de Medellín
   ============================================================ */


/* ------------------------------------------------------------
   Ejercicio 1
   Crear un botón que cambie el color del fondo al hacer clic.
   ------------------------------------------------------------ */

const COLORES = [
    { nombre: "Azul claro",  valor: "#DCE7F7" },
    { nombre: "Verde menta", valor: "#DAF0E3" },
    { nombre: "Durazno",     valor: "#FAE6D8" },
    { nombre: "Lavanda",     valor: "#E6E0F3" },
    { nombre: "Arena",       valor: "#F2ECD9" }
];

const COLOR_INICIAL = "#EDF0F3";

let indiceColor = -1;

const btnColor = document.getElementById("btn-color");
const btnRestaurar = document.getElementById("btn-restaurar");
const salidaColor = document.getElementById("salida-color");

btnColor.addEventListener("click", function () {
    // El operador % hace que el índice vuelva a 0 al pasar del último color.
    indiceColor = (indiceColor + 1) % COLORES.length;
    const color = COLORES[indiceColor];

    document.body.style.backgroundColor = color.valor;
    salidaColor.textContent = `Color actual: ${color.nombre} (${color.valor})`;
});

btnRestaurar.addEventListener("click", function () {
    indiceColor = -1;
    document.body.style.backgroundColor = COLOR_INICIAL;
    salidaColor.textContent = "Color actual: por defecto";
});


/* ------------------------------------------------------------
   Ejercicio 2
   Lista dinámica. Los datos viven en un arreglo en memoria y
   la lista se vuelve a dibujar cada vez que el arreglo cambia.
   ------------------------------------------------------------ */

const elementos = [];

const entradaTarea = document.getElementById("entrada-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const lista = document.getElementById("lista");
const avisoLista = document.getElementById("aviso-lista");
const contadorLista = document.getElementById("contador-lista");

/**
 * Dibuja la lista completa a partir del arreglo.
 */
function pintarLista() {
    // Se limpia el contenedor antes de volver a construirlo.
    lista.innerHTML = "";

    if (elementos.length === 0) {
        const vacio = document.createElement("li");
        vacio.className = "vacio";
        vacio.textContent = "La lista está vacía.";
        lista.appendChild(vacio);
    } else {
        elementos.forEach(function (texto, indice) {
            // 1. Crear
            const item = document.createElement("li");
            item.className = "item";

            const span = document.createElement("span");
            span.className = "item-texto";
            // textContent en vez de innerHTML: si el usuario escribe
            // etiquetas HTML se muestran como texto, no se ejecutan.
            span.textContent = texto;

            const btnEliminar = document.createElement("button");
            btnEliminar.className = "btn-eliminar";
            btnEliminar.type = "button";
            btnEliminar.textContent = "Eliminar";
            // El índice se guarda como atributo data-* para leerlo
            // después desde el listener del contenedor.
            btnEliminar.dataset.indice = indice;

            // 2. Modificar / 3. Insertar
            item.appendChild(span);
            item.appendChild(btnEliminar);
            lista.appendChild(item);
        });
    }

    const plural = elementos.length === 1 ? "elemento" : "elementos";
    contadorLista.textContent = `${elementos.length} ${plural}`;
}

/**
 * Agrega el texto del input al arreglo, si es válido.
 */
function agregarElemento() {
    const texto = entradaTarea.value.trim();

    if (texto === "") {
        avisoLista.textContent = "Escribe algo antes de agregar.";
        entradaTarea.focus();
        return;
    }

    elementos.push(texto);
    entradaTarea.value = "";
    avisoLista.textContent = "";
    pintarLista();
    entradaTarea.focus();
}

btnAgregar.addEventListener("click", agregarElemento);

// Permitir agregar con la tecla Enter.
entradaTarea.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        agregarElemento();
    }
});

// DELEGACIÓN DE EVENTOS: un solo listener en el contenedor en vez
// de uno por botón. Funciona también con los elementos creados
// después, porque el evento burbujea hasta el <ul>.
lista.addEventListener("click", function (evento) {
    const boton = evento.target;

    if (!boton.classList.contains("btn-eliminar")) {
        return;
    }

    const indice = Number(boton.dataset.indice);
    elementos.splice(indice, 1);
    pintarLista();
});

pintarLista();


/* ------------------------------------------------------------
   Ejercicio 3
   Contador con límite. Al llegar a 10 muestra una alerta.
   ------------------------------------------------------------ */

const LIMITE = 10;
const MINIMO = 0;

let cuenta = 0;

const marcador = document.getElementById("marcador");
const btnSumar = document.getElementById("btn-sumar");
const btnRestar = document.getElementById("btn-restar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const mensajeContador = document.getElementById("mensaje-contador");

/**
 * Refleja el valor de la variable cuenta en la interfaz.
 */
function pintarContador() {
    marcador.textContent = cuenta;

    // classList.toggle agrega la clase si el segundo argumento
    // es true y la quita si es false.
    marcador.classList.toggle("limite", cuenta >= LIMITE);

    btnSumar.disabled = cuenta >= LIMITE;
    btnRestar.disabled = cuenta <= MINIMO;

    if (cuenta >= LIMITE) {
        mensajeContador.textContent = "Límite alcanzado. No se puede seguir sumando.";
    } else {
        mensajeContador.textContent = `Límite: ${LIMITE}`;
    }
}

btnSumar.addEventListener("click", function () {
    if (cuenta >= LIMITE) {
        return;
    }

    cuenta = cuenta + 1;
    pintarContador();

    if (cuenta === LIMITE) {
        alert("Has llegado al límite de 10.");
    }
});

btnRestar.addEventListener("click", function () {
    if (cuenta <= MINIMO) {
        return;
    }

    cuenta = cuenta - 1;
    pintarContador();
});

btnReiniciar.addEventListener("click", function () {
    cuenta = 0;
    pintarContador();
});

pintarContador();


/* ------------------------------------------------------------
   Ejercicio 4
   Calculadora funcional SIN usar eval.
   Las operaciones se resuelven con operadores matemáticos
   escritos a mano dentro de la función operar().
   ------------------------------------------------------------ */

const pantalla = document.getElementById("pantalla");
const teclado = document.getElementById("teclado");

// Estado de la calculadora.
let valorEnPantalla = "0";
let valorAnterior = null;
let operadorPendiente = null;
let esperandoNuevoNumero = false;

/**
 * Resuelve una operación entre dos números.
 * Aquí es donde se reemplaza eval: cada operador se maneja
 * explícitamente con un switch.
 */
function operar(a, b, operador) {
    switch (operador) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return null; // División por cero
            }
            return a / b;
        default:
            return b;
    }
}

/**
 * Formatea el resultado para que no muestre decimales infinitos.
 */
function formatear(numero) {
    if (numero === null) {
        return "Error";
    }

    // Redondea a 8 decimales y elimina los ceros sobrantes.
    const redondeado = Math.round(numero * 1e8) / 1e8;
    return String(redondeado);
}

function actualizarPantalla() {
    pantalla.textContent = valorEnPantalla;
}

function marcarOperadorActivo(operador) {
    const teclasOperador = document.querySelectorAll(".tecla-operador");

    teclasOperador.forEach(function (tecla) {
        tecla.classList.toggle("activo", tecla.dataset.operador === operador);
    });
}

function escribirDigito(digito) {
    if (esperandoNuevoNumero || valorEnPantalla === "0" || valorEnPantalla === "Error") {
        valorEnPantalla = digito;
        esperandoNuevoNumero = false;
    } else {
        valorEnPantalla = valorEnPantalla + digito;
    }

    actualizarPantalla();
}

function escribirDecimal() {
    if (esperandoNuevoNumero) {
        valorEnPantalla = "0.";
        esperandoNuevoNumero = false;
    } else if (!valorEnPantalla.includes(".")) {
        valorEnPantalla = valorEnPantalla + ".";
    }

    actualizarPantalla();
}

function pulsarOperador(operador) {
    const actual = parseFloat(valorEnPantalla);

    if (operadorPendiente !== null && !esperandoNuevoNumero) {
        // Encadena operaciones: 2 + 3 + 4 resuelve 2 + 3 antes de seguir.
        const resultado = operar(valorAnterior, actual, operadorPendiente);
        valorEnPantalla = formatear(resultado);
        valorAnterior = resultado;
        actualizarPantalla();
    } else {
        valorAnterior = actual;
    }

    operadorPendiente = operador;
    esperandoNuevoNumero = true;
    marcarOperadorActivo(operador);
}

function calcularResultado() {
    if (operadorPendiente === null) {
        return;
    }

    const actual = parseFloat(valorEnPantalla);
    const resultado = operar(valorAnterior, actual, operadorPendiente);

    valorEnPantalla = formatear(resultado);
    valorAnterior = null;
    operadorPendiente = null;
    esperandoNuevoNumero = true;

    marcarOperadorActivo(null);
    actualizarPantalla();
}

function limpiar() {
    valorEnPantalla = "0";
    valorAnterior = null;
    operadorPendiente = null;
    esperandoNuevoNumero = false;

    marcarOperadorActivo(null);
    actualizarPantalla();
}

function cambiarSigno() {
    if (valorEnPantalla === "0" || valorEnPantalla === "Error") {
        return;
    }

    if (valorEnPantalla.startsWith("-")) {
        valorEnPantalla = valorEnPantalla.slice(1);
    } else {
        valorEnPantalla = "-" + valorEnPantalla;
    }

    actualizarPantalla();
}

function aplicarPorcentaje() {
    const actual = parseFloat(valorEnPantalla);
    valorEnPantalla = formatear(actual / 100);
    actualizarPantalla();
}

// Un solo listener para las 19 teclas, por delegación de eventos.
teclado.addEventListener("click", function (evento) {
    const tecla = evento.target;

    if (tecla.tagName !== "BUTTON") {
        return;
    }

    // Los data-* del HTML indican qué hace cada tecla.
    if (tecla.dataset.digito !== undefined) {
        escribirDigito(tecla.dataset.digito);
        return;
    }

    if (tecla.dataset.operador !== undefined) {
        pulsarOperador(tecla.dataset.operador);
        return;
    }

    switch (tecla.dataset.accion) {
        case "igual":
            calcularResultado();
            break;
        case "limpiar":
            limpiar();
            break;
        case "signo":
            cambiarSigno();
            break;
        case "porcentaje":
            aplicarPorcentaje();
            break;
        case "decimal":
            escribirDecimal();
            break;
    }
});

actualizarPantalla();