console.log("gasReal.js cargado correctamente");

//====================================================
// GAS REAL (MÓDULO PRINCIPAL)
//====================================================

function gasReal() {
    contenido.innerHTML = `
    <h2>🧪 Gas Real</h2>
    <hr>
    <p>Seleccione el modelo que desea utilizar.</p>
    <div class="lista">
        <div class="item" onclick="vanDerWaals()">
            🧪 Van der Waals
            <br>
            <small>Ecuación de estado</small>
        </div>
        <div class="item" onclick="virial()">
            📈 Ecuación Virial
            <br>
            <small>Corrección mediante coeficientes</small>
        </div>
        <div class="item" onclick="factorCompresibilidad()">
            📦 Factor de Compresibilidad
            <br>
            <small>Z = PV/nRT</small>
        </div>
    </div>
    <br>
    <button onclick="inicio()">← Volver al Menú Principal</button>
    `;
}


//====================================================
// 1. MÓDULO: VAN DER WAALS
//====================================================

function vanDerWaals() {
    contenido.innerHTML = `
    <h2>🧪 Van der Waals</h2>
    <hr>
    <div style="background: #f0f4f8; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
        <h3>(P + an²/V²)(V-nb) = nRT</h3>
    </div>
    <p>Seleccione el cálculo que desea realizar.</p>
    <div class="lista">
        <div class="item" onclick="vdwPresion()">
            📌 Calcular Presión
            <br>
            <small>Despeje de P</small>
        </div>
        <div class="item" onclick="vdwTemperatura()">
            🌡️ Calcular Temperatura
            <br>
            <small>Despeje de T</small>
        </div>
        <div class="item" onclick="vdwVerificar()">
            ✔ Verificar ecuación
            <br>
            <small>Comparar ambos lados</small>
        </div>
    </div>
    <br>
    <button onclick="gasReal()">← Volver a Gas Real</button>
    `;
}

// --- VDW: PRESIÓN ---
function vdwPresion() {
    contenido.innerHTML = `
    <h2>📌 Presión (Van der Waals)</h2>
    <hr>
    <label><b>Seleccione el gas</b></label>
    <select id="gas" onchange="mostrarConstantesVDW()">
        <option value="aire">Aire</option>
        <option value="co2">CO₂</option>
        <option value="vaporAgua">Vapor de agua</option>
        <option value="personalizado">Personalizado</option>
    </select>
    <br><br>
    <div id="panelConstantesVDW"></div>
    <hr>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Temperatura, T (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Unidad del resultado</b></label>
    <select id="unidadResultado">
        <option value="Pa">Pa</option>
        <option value="kPa">kPa</option>
        <option value="MPa">MPa</option>
        <option value="bar">bar</option>
        <option value="atm">atm</option>
    </select>
    <br><br>
    <button onclick="resolverVdwPresion()">Calcular Presión</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDW();
}

function mostrarConstantesVDW() {
    const gas = document.getElementById("gas").value;
    const panel = document.getElementById("panelConstantesVDW");

    if (gas === "personalizado") {
        panel.innerHTML = `
        <label><b>Constante a (Pa·m⁶/mol²)</b></label>
        <input id="a" type="number" step="any">
        <br><br>
        <label><b>Constante b (m³/mol)</b></label>
        <input id="b" type="number" step="any">
        `;
    } else {
        const datos = GASES_REALES[gas];
        panel.innerHTML = `
        <div style="background: #e8f4fd; padding: 10px; border-radius: 5px; border-left: 4px solid #3498db;">
            <p style="margin:0;"><b>Constantes:</b></p>
            <p style="margin:5px 0 0 0;">a = ${datos.a} Pa·m⁶/mol²</p>
            <p style="margin:0;">b = ${datos.b} m³/mol</p>
        </div>
        `;
    }
}

function resolverVdwPresion() {
    const gas = document.getElementById("gas").value;
    let n = parseFloat(document.getElementById("n").value);
    let T = parseFloat(document.getElementById("T").value);
    let V = parseFloat(document.getElementById("V").value);
    
    let a, b;
    if (gas === "personalizado") {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
    } else {
        a = GASES_REALES[gas].a;
        b = GASES_REALES[gas].b;
    }

    if (isNaN(n) || isNaN(T) || isNaN(V) || isNaN(a) || isNaN(b)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    if (V <= n * b) {
        alert("Error físico: El volumen total (V) debe ser mayor que el volumen ocupado por las moléculas (n·b).");
        return;
    }

    const termino1 = (n * CONSTANTES.R.J * T) / (V - n * b);
    const termino2 = (a * Math.pow(n, 2)) / Math.pow(V, 2);
    let P = termino1 - termino2;

    const unidad = document.getElementById("unidadResultado").value;
    let resultado = P;

    if (unidad === "kPa") resultado /= 1000;
    else if (unidad === "MPa") resultado /= 1000000;
    else if (unidad === "bar") resultado /= 100000;
    else if (unidad === "atm") resultado /= 101325;

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p><b>Gas:</b> ${gas === "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <p>Término Repulsivo: ${(termino1).toFixed(2)} Pa</p>
    <p>Término Atractivo: ${(termino2).toFixed(2)} Pa</p>
    <hr>
    <h2>P = ${resultado.toFixed(6)} ${unidad}</h2>
    `;
}

// --- VDW: TEMPERATURA ---
function vdwTemperatura() {
    contenido.innerHTML = `
    <h2>🌡️ Temperatura (Van der Waals)</h2>
    <hr>
    <label><b>Seleccione el gas</b></label>
    <select id="gas" onchange="mostrarConstantesVDW()">
        <option value="aire">Aire</option>
        <option value="co2">CO₂</option>
        <option value="vaporAgua">Vapor de agua</option>
        <option value="personalizado">Personalizado</option>
    </select>
    <br><br>
    <div id="panelConstantesVDW"></div>
    <hr>
    <label><b>Presión, P (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <button onclick="resolverVdwTemperatura()">Calcular Temperatura</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDW();
}

function resolverVdwTemperatura() {
    const gas = document.getElementById("gas").value;
    let P = parseFloat(document.getElementById("P").value);
    let n = parseFloat(document.getElementById("n").value);
    let V = parseFloat(document.getElementById("V").value);
    
    let a, b;
    if (gas === "personalizado") {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
    } else {
        a = GASES_REALES[gas].a;
        b = GASES_REALES[gas].b;
    }

    if (isNaN(P) || isNaN(n) || isNaN(V) || isNaN(a) || isNaN(b)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    if (V <= n * b) {
        alert("Error físico: El volumen total (V) debe ser mayor que el volumen ocupado por las moléculas (n·b).");
        return;
    }

    let termino1 = P + (a * Math.pow(n, 2)) / Math.pow(V, 2);
    let termino2 = V - n * b;
    let T = (termino1 * termino2) / (n * CONSTANTES.R.J);
    let Tc = T - 273.15;

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p><b>Gas:</b> ${gas === "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <hr>
    <h2>T = ${T.toFixed(3)} K</h2>
    <h2>T = ${Tc.toFixed(3)} °C</h2>
    `;
}

// --- VDW: VERIFICACIÓN ---
function vdwVerificar() {
    contenido.innerHTML = `
    <h2>✔ Verificar Ecuación de VDW</h2>
    <hr>
    <label><b>Seleccione el gas</b></label>
    <select id="gas" onchange="mostrarConstantesVDW()">
        <option value="aire">Aire</option>
        <option value="co2">CO₂</option>
        <option value="vaporAgua">Vapor de agua</option>
        <option value="personalizado">Personalizado</option>
    </select>
    <br><br>
    <div id="panelConstantesVDW"></div>
    <hr>
    <label><b>Presión, P (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Temperatura, T (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <button onclick="resolverVerificacionVDW()">Verificar</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDW();
}

function resolverVerificacionVDW() {
    const gas = document.getElementById("gas").value;
    let P = parseFloat(document.getElementById("P").value);
    let V = parseFloat(document.getElementById("V").value);
    let T = parseFloat(document.getElementById("T").value);
    let n = parseFloat(document.getElementById("n").value);
    
    let a, b;
    if (gas === "personalizado") {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
    } else {
        a = GASES_REALES[gas].a;
        b = GASES_REALES[gas].b;
    }

    if (isNaN(P) || isNaN(V) || isNaN(T) || isNaN(n) || isNaN(a) || isNaN(b)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    const ladoIzquierdo = (P + (a * Math.pow(n, 2) / Math.pow(V, 2))) * (V - n * b);
    const ladoDerecho = n * CONSTANTES.R.J * T;
    const error = Math.abs(ladoIzquierdo - ladoDerecho) / ladoDerecho * 100;

    let mensaje = error < 0.01 ? "✅ La ecuación se satisface correctamente (Error aceptable)." : "⚠ Existe una diferencia significativa entre ambos lados.";

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Validación de VDW</h2>
    <hr>
    <p><b>Gas:</b> ${gas === "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <p>Lado izquierdo: <b>${ladoIzquierdo.toFixed(2)} J</b></p>
    <p>Lado derecho: <b>${ladoDerecho.toFixed(2)} J</b></p>
    <hr>
    <p>Error Porcentual: <b>${error.toFixed(4)} %</b></p>
    <p>${mensaje}</p>
    `;
}


//====================================================
// 2. MÓDULO: ECUACIÓN VIRIAL
//====================================================

function virial() {
    contenido.innerHTML = `
    <h2>📈 Ecuación Virial</h2>
    <hr>
    <div style="background: #f0f4f8; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
        <h3>Z = 1 + B/Vm</h3>
        <h3>PV = ZnRT</h3>
    </div>
    <p>Seleccione la propiedad que desea calcular.</p>
    <div class="lista">
        <div class="item" onclick="virialPresion()">
            📌 Presión
            <br><small>Calcular P a partir de B</small>
        </div>
        <div class="item" onclick="virialTemperatura()">
            🌡 Temperatura
            <br><small>Calcular T a partir de B</small>
        </div>
        <div class="item" onclick="virialValidacion()">
            ✔ Validación
            <br><small>Verificar exactitud</small>
        </div>
    </div>
    <br>
    <button onclick="gasReal()">← Volver a Gas Real</button>
    `;
}

// --- VIRIAL: PRESIÓN ---
function virialPresion() {
    contenido.innerHTML = `
    <h2>📌 Presión (Virial Truncada)</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Temperatura, T (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Unidad del resultado</b></label>
    <select id="unidadResultado">
        <option value="Pa">Pa</option>
        <option value="kPa">kPa</option>
        <option value="MPa">MPa</option>
        <option value="bar">bar</option>
        <option value="atm">atm</option>
    </select>
    <br><br>
    <button onclick="resolverVirialPresion()">Calcular Presión</button>
    <button onclick="virial()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function resolverVirialPresion() {
    let B = parseFloat(document.getElementById("B").value);
    let n = parseFloat(document.getElementById("n").value);
    let T = parseFloat(document.getElementById("T").value);
    let V = parseFloat(document.getElementById("V").value);

    if (isNaN(B) || isNaN(n) || isNaN(T) || isNaN(V)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let P = (Z * n * CONSTANTES.R.J * T) / V;

    let unidad = document.getElementById("unidadResultado").value;
    let resultado = P;
    if (unidad === "kPa") resultado /= 1000;
    else if (unidad === "MPa") resultado /= 1000000;
    else if (unidad === "bar") resultado /= 100000;
    else if (unidad === "atm") resultado /= 101325;

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p>Volumen molar (Vm): ${Vm.toFixed(6)} m³/mol</p>
    <p>Factor de compresibilidad (Z): ${Z.toFixed(5)}</p>
    <hr>
    <h2>P = ${resultado.toFixed(4)} ${unidad}</h2>
    `;
}

// --- VIRIAL: TEMPERATURA ---
function virialTemperatura() {
    contenido.innerHTML = `
    <h2>🌡 Temperatura (Virial Truncada)</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Presión, P (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <button onclick="resolverVirialTemperatura()">Calcular Temperatura</button>
    <button onclick="virial()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function resolverVirialTemperatura() {
    let B = parseFloat(document.getElementById("B").value);
    let P = parseFloat(document.getElementById("P").value);
    let V = parseFloat(document.getElementById("V").value);
    let n = parseFloat(document.getElementById("n").value);

    if (isNaN(B) || isNaN(P) || isNaN(V) || isNaN(n)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let T = (P * V) / (Z * n * CONSTANTES.R.J);

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p>Volumen molar (Vm): ${Vm.toFixed(6)} m³/mol</p>
    <p>Factor de compresibilidad (Z): ${Z.toFixed(5)}</p>
    <hr>
    <h2>T = ${T.toFixed(3)} K</h2>
    <h2>T = ${(T - 273.15).toFixed(3)} °C</h2>
    `;
}

// --- VIRIAL: VALIDACIÓN ---
function virialValidacion() {
    contenido.innerHTML = `
    <h2>✔ Validación Ecuación Virial</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Presión, P (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Volumen, V (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Moles, n (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Temperatura, T (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <button onclick="resolverVirialValidacion()">Validar Ecuación</button>
    <button onclick="virial()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function resolverVirialValidacion() {
    let B = parseFloat(document.getElementById("B").value);
    let P = parseFloat(document.getElementById("P").value);
    let V = parseFloat(document.getElementById("V").value);
    let n = parseFloat(document.getElementById("n").value);
    let T = parseFloat(document.getElementById("T").value);

    if (isNaN(B) || isNaN(P) || isNaN(V) || isNaN(n) || isNaN(T)) {
        alert("Por favor, ingrese todos los datos numéricos requeridos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let izquierda = P * V;
    let derecha = Z * n * CONSTANTES.R.J * T;
    let error = Math.abs(izquierda - derecha) / derecha * 100;

    let mensaje = error < 0.01 ? "✅ Ecuación Virial validada correctamente." : "⚠ Existe diferencia entre ambos lados.";

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Validación</h2>
    <hr>
    <p>Z calculado = ${Z.toFixed(5)}</p>
    <p>Lado izquierdo (PV) = ${izquierda.toFixed(2)} J</p>
    <p>Lado derecho (ZnRT) = ${derecha.toFixed(2)} J</p>
    <hr>
    <p>Error Porcentual = <b>${error.toFixed(4)} %</b></p>
    <p>${mensaje}</p>
    `;
}
