console.log("gasReal.js cargado");

//====================================================
// GAS REAL
//====================================================
//
// Modelos implementados:
//
// 1. Van der Waals
// 2. Ecuación Virial
// 3. Factor de Compresibilidad
//
//====================================================



//====================================================
// MENÚ GAS REAL
//====================================================

function gasReal() {

    contenido.innerHTML = `

    <h2>

    🧪 Gas Real

    </h2>

    <hr>

    <p>

    Seleccione el modelo que desea utilizar.

    </p>

    <div class="lista">

        <div class="item"

        onclick="vanDerWaals()">

            🧪 Van der Waals

            <br>

            <small>

            Ecuación de estado

            </small>

        </div>

        <div class="item"

        onclick="virial()">

            📈 Ecuación Virial

            <br>

            <small>

            Corrección mediante coeficientes

            </small>

        </div>

        <div class="item"

        onclick="factorCompresibilidad()">

            📦 Factor de Compresibilidad

            <br>

            <small>

            Z = PV/nRT

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
// MENÚ VAN DER WAALS
//====================================================

function vanDerWaals() {

    contenido.innerHTML = `

    <h2>

    🧪 Van der Waals

    </h2>

    <hr>

    <h2>

    (P + an²/V²)(V-nb)=nRT

    </h2>

    <hr>

    <p>

    Seleccione el cálculo que desea realizar.

    </p>

    <div class="lista">

        <div class="item"

        onclick="vdwPresion()">

            📌 Calcular Presión

            <br>

            <small>

            Despeje de P

            </small>

        </div>

        <div class="item"

        onclick="vdwTemperatura()">

            🌡️ Calcular Temperatura

            <br>

            <small>

            Despeje de T

            </small>

        </div>

        <div class="item"

        onclick="vdwVerificar()">

            ✔ Verificar ecuación

            <br>

            <small>

            Comparar ambos lados

            </small>

        </div>

    </div>

    <br>

    <button onclick="gasReal()">

        ← Volver

    </button>

    `;

}
//====================================================
// VAN DER WAALS
// CALCULAR PRESIÓN
//====================================================

function vdwPresion() {

    contenido.innerHTML = `

    <h2>

    📌 Presión mediante Van der Waals

    </h2>

    <hr>

    <h2>

    P = nRT/(V-nb) − an²/V²

    </h2>

    <hr>

    <label>

        <b>Seleccione el gas</b>

    </label>

    <select
        id="gas"
        onchange="mostrarConstantesVDW()">

        <option value="aire">

            Aire

        </option>

        <option value="co2">

            CO₂

        </option>

        <option value="vaporAgua">

            Vapor de agua

        </option>

        <option value="personalizado">

            Personalizado

        </option>

    </select>

    <br><br>

    <div id="panelConstantesVDW">

    </div>

    <hr>

    <label>

        <b>Moles (mol)</b>

    </label>

    <input
        id="n"
        type="number">

    <br><br>

    <label>

        <b>Temperatura (K)</b>

    </label>

    <input
        id="T"
        type="number">

    <br><br>

    <label>

        <b>Volumen (m³)</b>

    </label>

    <input
        id="V"
        type="number">

    <br><br>

    <label>

        <b>Unidad del resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="Pa">

            Pa

        </option>

        <option value="kPa">

            kPa

        </option>

        <option value="MPa">

            MPa

        </option>

        <option value="bar">

            bar

        </option>

        <option value="atm">

            atm

        </option>

    </select>

    <br><br>

    <button
        onclick="resolverVdwPresion()">

        Calcular

    </button>

    <button
        onclick="vanDerWaals()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

    mostrarConstantesVDW();

}
//====================================================
// MOSTRAR CONSTANTES
//====================================================

function mostrarConstantesVDW() {

    const gas =

        document.getElementById("gas").value;

    const panel =

        document.getElementById("panelConstantesVDW");

    //------------------------------------------
    // PERSONALIZADO
    //------------------------------------------

    if (gas == "personalizado") {

        panel.innerHTML = `

        <label>

        <b>Constante a (Pa·m⁶/mol²)</b>

        </label>

        <input
            id="a"
            type="number">

        <br><br>

        <label>

        <b>Constante b (m³/mol)</b>

        </label>

        <input
            id="b"
            type="number">

        `;

        return;

    }

    //------------------------------------------
    // BASE DE DATOS
    //------------------------------------------

    const datos =

        GASES_REALES[gas];

    panel.innerHTML = `

        <label>

        <b>Coeficiente Virial B (m³/mol)</b>

        </label>

        <input

        id="B"

        type="number"

        placeholder="Ejemplo: -0.00012">

`;

}
//====================================================
// RESOLVER PRESIÓN
//====================================================

function resolverVdwPresion() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    const gas =

        document.getElementById("gas").value;

    let n = parseFloat(

        document.getElementById("n").value

    );

    let T = parseFloat(

        document.getElementById("T").value

    );

    let V = parseFloat(

        document.getElementById("V").value

    );

    let a = parseFloat(

        document.getElementById("a").value

    );

    let b = parseFloat(

        document.getElementById("b").value

    );

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(n) ||

        isNaN(T) ||

        isNaN(V) ||

        isNaN(a) ||

        isNaN(b)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    if (V <= n * b) {

        alert("El volumen debe ser mayor que n·b.");

        return;

    }

    //----------------------------------
    // Van der Waals
    //----------------------------------

    const termino1 =

        (n * CONSTANTES.R.J * T) / (V - n * b);

    const termino2 =

        (a * Math.pow(n, 2)) / Math.pow(V, 2);

    let P =

        termino1 - termino2;

    //----------------------------------
    // Conversión
    //----------------------------------

    const unidad =

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

    <b>Gas seleccionado:</b>

    ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}

    </p>

    <hr>

    <p>

    Primer término

    </p>

    <p>

    ${(termino1).toFixed(6)} Pa

    </p>

    <p>

    Segundo término

    </p>

    <p>

    ${(termino2).toFixed(6)} Pa

    </p>

    <hr>

    <h2>

    P =

    ${resultado.toFixed(6)}

    ${unidad}

    </h2>

    <hr>

    <p>

    Presión calculada mediante la ecuación de Van der Waals.

    </p>

    `;

}
//====================================================
// VAN DER WAALS
// CALCULAR TEMPERATURA
//====================================================

function vdwTemperatura() {

    contenido.innerHTML = `

    <h2>

    🌡️ Temperatura mediante Van der Waals

    </h2>

    <hr>

    <h2>

    T=((P+an²/V²)(V−nb))/(nR)

    </h2>

    <hr>

    <label>

        <b>Seleccione el gas</b>

    </label>

    <select

        id="gas"

        onchange="mostrarConstantesVDWTemperatura()">

        <option value="aire">

            Aire

        </option>

        <option value="co2">

            CO₂

        </option>

        <option value="vaporAgua">

            Vapor de agua

        </option>

        <option value="personalizado">

            Personalizado

        </option>

    </select>

    <br><br>

    <div id="panelConstantesVDW">

    </div>

    <hr>

    <label>

        <b>Presión (Pa)</b>

    </label>

    <input

        id="P"

        type="number">

    <br><br>

    <label>

        <b>Moles (mol)</b>

    </label>

    <input

        id="n"

        type="number">

    <br><br>

    <label>

        <b>Volumen (m³)</b>

    </label>

    <input

        id="V"

        type="number">

    <br><br>

    <button

        onclick="resolverVdwTemperatura()">

        Calcular

    </button>

    <button

        onclick="vanDerWaals()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

    mostrarConstantesVDWTemperatura();

}
//====================================================
// MOSTRAR CONSTANTES TEMPERATURA
//====================================================

function mostrarConstantesVDWTemperatura() {

    mostrarConstantesVDW();

}
//====================================================
// RESOLVER TEMPERATURA
//====================================================

function resolverVdwTemperatura() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    const gas =

        document.getElementById("gas").value;

    let P = parseFloat(

        document.getElementById("P").value

    );

    let n = parseFloat(

        document.getElementById("n").value

    );

    let V = parseFloat(

        document.getElementById("V").value

    );

    let a = parseFloat(

        document.getElementById("a").value

    );

    let b = parseFloat(

        document.getElementById("b").value

    );

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(P) ||

        isNaN(n) ||

        isNaN(V) ||

        isNaN(a) ||

        isNaN(b)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    if (V <= n * b) {

        alert("El volumen debe ser mayor que n·b.");

        return;

    }

    //----------------------------------
    // Van der Waals
    //----------------------------------

    let termino1 =

        P +

        (a * Math.pow(n, 2)) / Math.pow(V, 2);

    let termino2 =

        V -

        n * b;

    let T =

        (termino1 * termino2) / (n * CONSTANTES.R.J);

    let Tc =

        T - 273.15;

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    <b>Gas seleccionado:</b>

    ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}

    </p>

    <hr>

    <p>

    Primer término

    </p>

    <p>

    ${termino1.toFixed(6)} Pa

    </p>

    <p>

    Segundo término

    </p>

    <p>

    ${termino2.toFixed(6)} m³

    </p>

    <hr>

    <h2>

    T =

    ${T.toFixed(6)}

    K

    </h2>

    <h2>

    T =

    ${Tc.toFixed(6)}

    °C

    </h2>

    <hr>

    <p>

    Temperatura calculada mediante la ecuación de Van der Waals.

    </p>

    `;

}
//====================================================
// VERIFICAR ECUACIÓN DE VAN DER WAALS
//====================================================

function vdwVerificar() {

    contenido.innerHTML = `

    <h2>

    ✔ Verificar ecuación de Van der Waals

    </h2>

    <hr>

    <h2>

    (P + an²/V²)(V-nb)=nRT

    </h2>

    <hr>

    <label>

        <b>Seleccione el gas</b>

    </label>

    <select

        id="gas"

        onchange="mostrarConstantesVDW()">

        <option value="aire">

            Aire

        </option>

        <option value="co2">

            CO₂

        </option>

        <option value="vaporAgua">

            Vapor de agua

        </option>

        <option value="personalizado">

            Personalizado

        </option>

    </select>

    <br><br>

    <div id="panelConstantesVDW"></div>

    <hr>

    <label>

        <b>Presión (Pa)</b>

    </label>

    <input id="P" type="number">

    <br><br>

    <label>

        <b>Volumen (m³)</b>

    </label>

    <input id="V" type="number">

    <br><br>

    <label>

        <b>Temperatura (K)</b>

    </label>

    <input id="T" type="number">

    <br><br>

    <label>

        <b>Moles (mol)</b>

    </label>

    <input id="n" type="number">

    <br><br>

    <button

        onclick="resolverVerificacionVDW()">

        Verificar

    </button>

    <button

        onclick="vanDerWaals()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

    mostrarConstantesVDW();

}
//====================================================
// RESOLVER VERIFICACIÓN
//====================================================

function resolverVerificacionVDW() {

    //----------------------------------
    // Lectura
    //----------------------------------

    const gas =

        document.getElementById("gas").value;

    let P = parseFloat(document.getElementById("P").value);

    let V = parseFloat(document.getElementById("V").value);

    let T = parseFloat(document.getElementById("T").value);

    let n = parseFloat(document.getElementById("n").value);

    let a = parseFloat(document.getElementById("a").value);

    let b = parseFloat(document.getElementById("b").value);

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(P) ||

        isNaN(V) ||

        isNaN(T) ||

        isNaN(n) ||

        isNaN(a) ||

        isNaN(b)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Cálculo
    //----------------------------------

    const ladoIzquierdo =

        (

            P +

            (a * Math.pow(n, 2) / Math.pow(V, 2))

        )

        *

        (V - n * b);

    const ladoDerecho =

        n *

        CONSTANTES.R.J *

        T;

    //----------------------------------
    // Error porcentual
    //----------------------------------

    const error =

        Math.abs(

            ladoIzquierdo -

            ladoDerecho

        )

        /

        ladoDerecho

        *

        100;

    //----------------------------------
    // Interpretación
    //----------------------------------

    let mensaje = "";

    if (error < 0.01) {

        mensaje = "✅ La ecuación se satisface correctamente.";

    }

    else {

        mensaje = "⚠ Existe una diferencia entre ambos lados de la ecuación.";

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

    <b>Gas:</b>

    ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}

    </p>

    <hr>

    <p>

    Lado izquierdo

    </p>

    <h3>

    ${ladoIzquierdo.toFixed(6)}

    </h3>

    <p>

    Lado derecho

    </p>

    <h3>

    ${ladoDerecho.toFixed(6)}

    </h3>

    <p>

    Error

    </p>

    <h3>

    ${error.toFixed(6)} %

    </h3>

    <hr>

    <p>

    ${mensaje}

    </p>

    `;

}
//====================================================
// ECUACIÓN VIRIAL
//====================================================
//
// Z = 1 + B/Vm
//
// PV = ZnRT
//
//====================================================

function virial() {

    contenido.innerHTML = `

    <h2>

    📈 Ecuación Virial

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

        onclick="virialPresion()">

            📌 Presión

            <br>

            <small>

            Calcular presión

            </small>

        </div>

        <div class="item"

        onclick="virialTemperatura()">

            🌡 Temperatura

            <br>

            <small>

            Calcular temperatura

            </small>

        </div>

        <div class="item"

        onclick="virialValidacion()">

            ✔ Validación

            <br>

            <small>

            Verificar ecuación

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
// CALCULAR PRESIÓN
//====================================================

function virialPresion() {

    contenido.innerHTML = `

    <h2>

    📌 Presión mediante la Ecuación Virial

    </h2>

    <hr>

    <h2>

    PV = ZnRT

    </h2>

    <p>

    Z = 1 + B/Vm

    </p>

    <hr>

    <label>

    <b>Coeficiente Virial B (m³/mol)</b>

    </label>

    <input

        id="B"

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

        <option value="Pa">

            Pa

        </option>

        <option value="kPa">

            kPa

        </option>

        <option value="MPa">

            MPa

        </option>

        <option value="bar">

            bar

        </option>

        <option value="atm">

            atm

        </option>

    </select>

    <br><br>

    <button

        onclick="resolverVirialPresion()">

        Calcular

    </button>

    <button

        onclick="virial()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER PRESIÓN
//====================================================

function resolverVirialPresion() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let B = parseFloat(

        document.getElementById("B").value

    );

    let n = parseFloat(

        document.getElementById("n").value

    );

    let T = parseFloat(

        document.getElementById("T").value

    );

    let V = parseFloat(

        document.getElementById("V").value

    );

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(B) ||

        isNaN(n) ||

        isNaN(T) ||

        isNaN(V)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Volumen molar
    //----------------------------------

    let Vm =

        V / n;

    //----------------------------------
    // Factor de compresibilidad
    //----------------------------------

    let Z =

        1 +

        (B / Vm);

    //----------------------------------
    // Presión
    //----------------------------------

    let P =

        (Z * n * CONSTANTES.R.J * T) / V;

    //----------------------------------
    // Conversión de unidades
    //----------------------------------

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

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    Volumen molar

    </p>

    <h3>

    ${Vm.toFixed(6)} m³/mol

    </h3>

    <p>

    Factor de compresibilidad

    </p>

    <h3>

    Z = ${Z.toFixed(6)}

    </h3>

    <hr>

    <h2>

    Presión

    </h2>

    <h2>

    ${resultado.toFixed(6)}

    ${unidad}

    </h2>

    `;

}
//====================================================
// CALCULAR TEMPERATURA
//====================================================

function virialTemperatura() {

    contenido.innerHTML = `

    <h2>

    🌡 Temperatura mediante la Ecuación Virial

    </h2>

    <hr>

    <h2>

    PV = ZnRT

    </h2>

    <p>

    Z = 1 + B/Vm

    </p>

    <hr>

    <label>

    <b>Coeficiente Virial B (m³/mol)</b>

    </label>

    <input

        id="B"

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

        onclick="resolverVirialTemperatura()">

        Calcular

    </button>

    <button

        onclick="virial()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER TEMPERATURA
//====================================================

function resolverVirialTemperatura() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let B = parseFloat(document.getElementById("B").value);

    let P = parseFloat(document.getElementById("P").value);

    let V = parseFloat(document.getElementById("V").value);

    let n = parseFloat(document.getElementById("n").value);

    //----------------------------------
    // Validación
    //----------------------------------

    if (isNaN(B) || isNaN(P) || isNaN(V) || isNaN(n)) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Volumen molar
    //----------------------------------

    let Vm = V / n;

    //----------------------------------
    // Factor de compresibilidad
    //----------------------------------

    let Z = 1 + (B / Vm);

    //----------------------------------
    // Temperatura
    //----------------------------------

    let T = (P * V) / (Z * n * CONSTANTES.R.J);

    //----------------------------------
    // Conversión a °C
    //----------------------------------

    let Tc = T - 273.15;

    //----------------------------------
    // Mostrar resultados
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <hr>

    <p>

    Volumen molar = ${Vm.toFixed(6)} m³/mol

    </p>

    <p>

    Factor de compresibilidad Z = ${Z.toFixed(6)}

    </p>

    <hr>

    <h2>

    Temperatura = ${T.toFixed(3)} K

    </h2>

    <h2>

    Temperatura = ${Tc.toFixed(3)} °C

    </h2>

    `;

}
//====================================================
// VALIDACIÓN ECUACIÓN VIRIAL
//====================================================

function virialValidacion() {

    contenido.innerHTML = `

    <h2>

    ✔ Validación de la Ecuación Virial

    </h2>

    <hr>

    <h2>

    PV = ZnRT

    </h2>

    <p>

    Z = 1 + B/Vm

    </p>

    <hr>

    <label>

    <b>Coeficiente Virial B (m³/mol)</b>

    </label>

    <input

        id="B"

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

    <label>

    <b>Temperatura (K)</b>

    </label>

    <input

        id="T"

        type="number"

        step="any">

    <br><br>

    <button

        onclick="resolverVirialValidacion()">

        Validar

    </button>

    <button

        onclick="virial()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER VALIDACIÓN
//====================================================

function resolverVirialValidacion() {

    //----------------------------------
    // Lectura
    //----------------------------------

    let B = parseFloat(document.getElementById("B").value);

    let P = parseFloat(document.getElementById("P").value);

    let V = parseFloat(document.getElementById("V").value);

    let n = parseFloat(document.getElementById("n").value);

    let T = parseFloat(document.getElementById("T").value);

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(B) ||

        isNaN(P) ||

        isNaN(V) ||

        isNaN(n) ||

        isNaN(T)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Volumen molar
    //----------------------------------

    let Vm = V / n;

    //----------------------------------
    // Factor Z
    //----------------------------------

    let Z = 1 + (B / Vm);

    //----------------------------------
    // Lados de la ecuación
    //----------------------------------

    let izquierda = P * V;

    let derecha = Z * n * CONSTANTES.R.J * T;

    //----------------------------------
    // Error
    //----------------------------------

    let error =

        Math.abs(izquierda - derecha)

        / derecha

        * 100;

    //----------------------------------
    // Mensaje
    //----------------------------------

    let mensaje = "";

    if (error < 0.01) {

        mensaje = "✅ La ecuación se satisface correctamente.";

    }

    else {

        mensaje = "⚠ Existe diferencia entre ambos lados de la ecuación.";

    }

    //----------------------------------
    // Mostrar
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Validación

    </h2>

    <hr>

    <p>

    Volumen molar = ${Vm.toFixed(6)} m³/mol

    </p>

    <p>

    Z = ${Z.toFixed(6)}

    </p>

    <hr>

    <p>

    Lado izquierdo (PV)

    </p>

    <h3>

    ${izquierda.toFixed(6)}

    </h3>

    <p>

    Lado derecho (ZnRT)

    </p>

    <h3>

    ${derecha.toFixed(6)}

    </h3>

    <hr>

    <h2>

    Error = ${error.toFixed(6)} %

    </h2>

    <hr>

    <h3>

    ${mensaje}

    </h3>

    `;

}