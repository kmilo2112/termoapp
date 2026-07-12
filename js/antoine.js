console.log("antoine.js cargado");

//====================================================
// ECUACIÓN DE ANTOINE
//====================================================
//
// log10(P)=A-B/(T+C)
//
//====================================================



//====================================================
// MENÚ
//====================================================

function antoine() {

    contenido.innerHTML = `

    <h2>

    🌡️ Ecuación de Antoine

    </h2>

    <hr>

    <p>

    Seleccione el cálculo que desea realizar.

    </p>

    <div class="lista">

        <div class="item"

        onclick="presionVapor()">

            🌡️ Presión de vapor

            <br>

            <small>

            Calcular P

            </small>

        </div>

        <div class="item"

        onclick="temperaturaSaturacion()">

            💧 Temperatura de saturación

            <br>

            <small>

            Calcular T

            </small>

        </div>

    </div>

    <br>

    <button onclick="inicio()">

        ← Volver

    </button>

    `;

}
//====================================================
// PRESIÓN DE VAPOR
//====================================================

function presionVapor() {

    contenido.innerHTML = `

    <h2>

    🌡️ Presión de Vapor

    </h2>

    <hr>

    <h2>

    log₁₀(P)=A-B/(T+C)

    </h2>

    <hr>

    <label>

    <b>Constante A</b>

    </label>

    <input
        id="A"
        type="number">

    <br><br>

    <label>

    <b>Constante B</b>

    </label>

    <input
        id="B"
        type="number">

    <br><br>

    <label>

    <b>Constante C</b>

    </label>

    <input
        id="C"
        type="number">

    <br><br>

    <label>

    <b>Temperatura</b>

    </label>

    <input
        id="temperatura"
        type="number">

    <select id="unidadTemperatura">

        <option value="°C">

        °C

        </option>

        <option value="K">

        K

        </option>

    </select>

    <br><br>

    <label>

    <b>Unidad de presión</b>

    </label>

    <select id="unidadResultado">

        <option value="mmHg">

        mmHg

        </option>

    </select>

    <br><br>

    <button

    onclick="resolverPresionVapor()">

        Calcular

    </button>

    <button

    onclick="antoine()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER PRESIÓN DE VAPOR
//====================================================

function resolverPresionVapor() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let A = parseFloat(document.getElementById("A").value);

    let B = parseFloat(document.getElementById("B").value);

    let C = parseFloat(document.getElementById("C").value);

    let T = parseFloat(document.getElementById("temperatura").value);

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(A) ||

        isNaN(B) ||

        isNaN(C) ||

        isNaN(T)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión de temperatura
    //----------------------------------

    if (

        document.getElementById("unidadTemperatura").value == "K"

    ) {

        T = T - 273.15;

    }

    //----------------------------------
    // Antoine
    //----------------------------------

    let exponente =

        A -

        (B / (T + C));

    let P = Math.pow(10, exponente);

    //----------------------------------
    // Mostrar
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    <b>Ecuación</b>

    </p>

    <p>

    log₁₀(P)=A-B/(T+C)

    </p>

    <hr>

    <p>

    <b>Sustitución</b>

    </p>

    <p>

    log₁₀(P)=

    ${A}

    -

    ${B}/(${T.toFixed(2)}+${C})

    </p>

    <hr>

    <h2>

    P =

    ${P.toFixed(3)}

    mmHg

    </h2>

    <hr>

    <p>

    Presión de vapor calculada mediante la ecuación de Antoine.

    </p>

    `;

}
//====================================================
// TEMPERATURA DE SATURACIÓN
//====================================================

function temperaturaSaturacion() {

    contenido.innerHTML = `

    <h2>

    💧 Temperatura de Saturación

    </h2>

    <hr>

    <h2>

    T = B/(A-log₁₀(P))-C

    </h2>

    <hr>

    <label>

    <b>Constante A</b>

    </label>

    <input id="A" type="number">

    <br><br>

    <label>

    <b>Constante B</b>

    </label>

    <input id="B" type="number">

    <br><br>

    <label>

    <b>Constante C</b>

    </label>

    <input id="C" type="number">

    <br><br>

    <label>

    <b>Presión de vapor</b>

    </label>

    <input id="presion" type="number">

    <small>

    mmHg

    </small>

    <br><br>

    <label>

    <b>Unidad del resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="°C">

        °C

        </option>

        <option value="K">

        K

        </option>

    </select>

    <br><br>

    <button

    onclick="resolverTemperaturaSaturacion()">

        Calcular

    </button>

    <button

    onclick="antoine()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER TEMPERATURA DE SATURACIÓN
//====================================================

function resolverTemperaturaSaturacion() {

    //----------------------------------
    // Lectura
    //----------------------------------

    let A = parseFloat(document.getElementById("A").value);

    let B = parseFloat(document.getElementById("B").value);

    let C = parseFloat(document.getElementById("C").value);

    let P = parseFloat(document.getElementById("presion").value);

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(A) ||

        isNaN(B) ||

        isNaN(C) ||

        isNaN(P)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    if (P <= 0) {

        alert("La presión debe ser mayor que cero.");

        return;

    }

    //----------------------------------
    // Cálculo
    //----------------------------------

    let T =

        (B / (A - Math.log10(P)))

        -

        C;

    //----------------------------------
    // Conversión
    //----------------------------------

    let temperatura = T;

    if (

        document.getElementById("unidadResultado").value == "K"

    ) {

        temperatura += 273.15;

    }

    //----------------------------------
    // Mostrar
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    <b>Ecuación</b>

    </p>

    <p>

    T = B/(A-log₁₀(P))-C

    </p>

    <hr>

    <p>

    <b>Sustitución</b>

    </p>

    <p>

    T =

    ${B}

    /

    (

    ${A}

    -

    log₁₀(${P})

    )

    -

    ${C}

    </p>

    <hr>

    <h2>

    T =

    ${temperatura.toFixed(3)}

    ${document.getElementById("unidadResultado").value}

    </h2>

    <hr>

    <p>

    Temperatura de saturación calculada mediante la ecuación de Antoine.

    </p>

    `;

}