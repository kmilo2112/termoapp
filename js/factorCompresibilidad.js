console.log("factorCompresibilidad.js cargado");

//====================================================
// FACTOR DE COMPRESIBILIDAD
//====================================================
//
// Z = PV / nRT
//
//====================================================

function factorCompresibilidad() {

    contenido.innerHTML = `

    <h2>

    📦 Factor de Compresibilidad

    </h2>

    <hr>

    <h2>

    PV = ZnRT

    </h2>

    <p>

    Seleccione la propiedad que desea calcular.

    </p>

    <div class="lista">

        <div class="item"

        onclick="factorZ()">

            📌 Factor Z

            <br>

            <small>

            Calcular Z

            </small>

        </div>

        <div class="item"

        onclick="factorPresion()">

            📌 Presión

            <br>

            <small>

            Calcular presión

            </small>

        </div>

        <div class="item"

        onclick="factorTemperatura()">

            🌡 Temperatura

            <br>

            <small>

            Calcular temperatura

            </small>

        </div>

    </div>

    <br>

    <button

        onclick="gasReal()">

        ← Volver

    </button>

    `;

}
//====================================================
// CALCULAR Z
//====================================================

function factorZ() {

    contenido.innerHTML = `

    <h2>

    📦 Factor de Compresibilidad

    </h2>

    <hr>

    <h2>

    Z = PV / nRT

    </h2>

    <hr>

    <label>

    <b>Presión (Pa)</b>

    </label>

    <input

        id="P"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Volumen (m³)</b>

    </label>

    <input

        id="V"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Moles (mol)</b>

    </label>

    <input

        id="n"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Temperatura (K)</b>

    </label>

    <input

        id="T"

        type="number"

        step="any">

    <br><br>

    <button

        onclick="resolverFactorZ()">

        Calcular

    </button>

    <button

        onclick="factorCompresibilidad()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER FACTOR Z
//====================================================

function resolverFactorZ() {

    let P = parseFloat(document.getElementById("P").value);

    let V = parseFloat(document.getElementById("V").value);

    let n = parseFloat(document.getElementById("n").value);

    let T = parseFloat(document.getElementById("T").value);

    if (

        isNaN(P) ||

        isNaN(V) ||

        isNaN(n) ||

        isNaN(T)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------

    let Z =

        (P * V) /

        (n * CONSTANTES.R.J * T);

    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    Factor de Compresibilidad

    </p>

    <h2>

    Z = ${Z.toFixed(6)}

    </h2>

    `;

}
//====================================================
// CALCULAR PRESIÓN
//====================================================

function factorPresion() {

    contenido.innerHTML = `

    <h2>

    📌 Presión mediante el Factor de Compresibilidad

    </h2>

    <hr>

    <h2>

    P = ZnRT / V

    </h2>

    <hr>

    <label>

    <b>Factor de Compresibilidad (Z)</b>

    </label>

    <input

        id="Z"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Moles (mol)</b>

    </label>

    <input

        id="n"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Temperatura (K)</b>

    </label>

    <input

        id="T"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Volumen (m³)</b>

    </label>

    <input

        id="V"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Unidad del resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="Pa">Pa</option>

        <option value="kPa">kPa</option>

        <option value="MPa">MPa</option>

        <option value="bar">bar</option>

        <option value="atm">atm</option>

    </select>

    <br><br>

    <button

        onclick="resolverFactorPresion()">

        Calcular

    </button>

    <button

        onclick="factorCompresibilidad()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER PRESIÓN
//====================================================

function resolverFactorPresion() {

    let Z = parseFloat(document.getElementById("Z").value);

    let n = parseFloat(document.getElementById("n").value);

    let T = parseFloat(document.getElementById("T").value);

    let V = parseFloat(document.getElementById("V").value);

    if (

        isNaN(Z) ||

        isNaN(n) ||

        isNaN(T) ||

        isNaN(V)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------------

    let P =

        (Z * n * CONSTANTES.R.J * T) / V;

    //----------------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    let resultado = P;

    if (unidad == "kPa") {

        resultado /= 1000;

    }

    else if (unidad == "MPa") {

        resultado /= 1000000;

    }

    else if (unidad == "bar") {

        resultado /= 100000;

    }

    else if (unidad == "atm") {

        resultado /= 101325;

    }

    //----------------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    Factor de Compresibilidad

    </p>

    <h3>

    Z = ${Z.toFixed(6)}

    </h3>

    <hr>

    <h2>

    Presión =

    ${resultado.toFixed(6)}

    ${unidad}

    </h2>

    `;

}
//====================================================
// CALCULAR TEMPERATURA
//====================================================

function factorTemperatura() {

    contenido.innerHTML = `

    <h2>

    🌡 Temperatura mediante el Factor de Compresibilidad

    </h2>

    <hr>

    <h2>

    T = PV / ZnR

    </h2>

    <hr>

    <label>

    <b>Factor de Compresibilidad (Z)</b>

    </label>

    <input

        id="Z"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Presión (Pa)</b>

    </label>

    <input

        id="P"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Volumen (m³)</b>

    </label>

    <input

        id="V"

        type="number"

        step="any">

    <br><br>

    <label>

    <b>Moles (mol)</b>

    </label>

    <input

        id="n"

        type="number"

        step="any">

    <br><br>

    <button

        onclick="resolverFactorTemperatura()">

        Calcular

    </button>

    <button

        onclick="factorCompresibilidad()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER TEMPERATURA
//====================================================

function resolverFactorTemperatura() {

    //----------------------------------------
    // Lectura de datos
    //----------------------------------------

    let Z = parseFloat(document.getElementById("Z").value);

    let P = parseFloat(document.getElementById("P").value);

    let V = parseFloat(document.getElementById("V").value);

    let n = parseFloat(document.getElementById("n").value);

    //----------------------------------------
    // Validación
    //----------------------------------------

    if (

        isNaN(Z) ||

        isNaN(P) ||

        isNaN(V) ||

        isNaN(n)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------------
    // Temperatura
    //----------------------------------------

    let T =

        (P * V) /

        (Z * n * CONSTANTES.R.J);

    //----------------------------------------
    // Celsius
    //----------------------------------------

    let Tc =

        T - 273.15;

    //----------------------------------------
    // Mostrar resultados
    //----------------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    Factor de Compresibilidad

    </p>

    <h3>

    Z = ${Z.toFixed(6)}

    </h3>

    <hr>

    <h2>

    Temperatura

    </h2>

    <h3>

    ${T.toFixed(6)} K

    </h3>

    <h3>

    ${Tc.toFixed(6)} °C

    </h3>

    `;

}