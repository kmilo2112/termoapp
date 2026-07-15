console.log("gasReal.js cargado");

//====================================================
// GAS REAL
//====================================================
//
// Modelos implementados:
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
    <button onclick="inicio()">← Volver</button>
    `;
}

//====================================================
// MENÚ VAN DER WAALS
//====================================================
function vanDerWaals() {
    contenido.innerHTML = `
    <h2>🧪 Van der Waals</h2>
    <hr>
    <h2>(P + an²/V²)(V-nb)=nRT</h2>
    <hr>
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
    <button onclick="gasReal()">← Volver</button>
    `;
}

//====================================================
// VAN DER WAALS: CALCULAR PRESIÓN
//====================================================
function vdwPresion() {
    contenido.innerHTML = `
    <h2>📌 Presión mediante Van der Waals</h2>
    <hr>
    <h2>P = nRT/(V-nb) − an²/V²</h2>
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
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number">
    <br><br>
    <label><b>Temperatura (K)</b></label>
    <input id="T" type="number">
    <br><br>
    <label><b>Volumen (m³)</b></label>
    <input id="V" type="number">
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
    <button onclick="resolverVdwPresion()">Calcular</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDW();
}

//====================================================
// MOSTRAR CONSTANTES VAN DER WAALS
//====================================================
function mostrarConstantesVDW() {
    const gas = document.getElementById("gas").value;
    const panel = document.getElementById("panelConstantesVDW");

    if (gas == "personalizado") {
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
        <div style="background: #f0f4f8; padding: 10px; border-radius: 8px; border-left: 4px solid #3498db;">
            <p style="margin:0;"><b>Constantes de la base de datos:</b></p>
            <p style="margin:5px 0 0 0;">a = ${datos.a} Pa·m⁶/mol²</p>
            <p style="margin:0;">b = ${datos.b} m³/mol</p>
        </div>
        `;
    }
}

//====================================================
// RESOLVER PRESIÓN VDW
//====================================================
function resolverVdwPresion() {
    const gas = document.getElementById("gas").value;
    let n = parseFloat(document.getElementById("n").value);
    let T = parseFloat(document.getElementById("T").value);
    let V = parseFloat(document.getElementById("V").value);
    
    let a, b;

    // Lógica para obtener 'a' y 'b' de forma segura
    if (gas === "personalizado") {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
    } else {
        a = GASES_REALES[gas].a;
        b = GASES_REALES[gas].b;
    }

    if (isNaN(n) || isNaN(T) || isNaN(V) || isNaN(a) || isNaN(b)) {
        alert("Ingrese todos los datos.");
        return;
    }

    if (V <= n * b) {
        alert("El volumen debe ser mayor que el covolumen (n·b).");
        return;
    }

    const termino1 = (n * CONSTANTES.R.J * T) / (V - n * b);
    const termino2 = (a * Math.pow(n, 2)) / Math.pow(V, 2);
    let P = termino1 - termino2;

    const unidad = document.getElementById("unidadResultado").value;
    let resultado = P;

    if (unidad == "kPa") resultado /= 1000;
    else if (unidad == "MPa") resultado /= 1000000;
    else if (unidad == "bar") resultado /= 100000;
    else if (unidad == "atm") resultado /= 101325;

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p><b>Gas:</b> ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <hr>
    <p>Término Repulsivo: ${(termino1).toFixed(2)} Pa</p>
    <p>Término Atractivo: ${(termino2).toFixed(2)} Pa</p>
    <hr>
    <h2>P = ${resultado.toFixed(6)} ${unidad}</h2>
    `;
}

//====================================================
// VAN DER WAALS: CALCULAR TEMPERATURA
//====================================================
function vdwTemperatura() {
    contenido.innerHTML = `
    <h2>🌡️ Temperatura mediante Van der Waals</h2>
    <hr>
    <h2>T=((P+an²/V²)(V−nb))/(nR)</h2>
    <hr>
    <label><b>Seleccione el gas</b></label>
    <select id="gas" onchange="mostrarConstantesVDWTemperatura()">
        <option value="aire">Aire</option>
        <option value="co2">CO₂</option>
        <option value="vaporAgua">Vapor de agua</option>
        <option value="personalizado">Personalizado</option>
    </select>
    <br><br>
    <div id="panelConstantesVDW"></div>
    <hr>
    <label><b>Presión (Pa)</b></label>
    <input id="P" type="number">
    <br><br>
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number">
    <br><br>
    <label><b>Volumen (m³)</b></label>
    <input id="V" type="number">
    <br><br>
    <button onclick="resolverVdwTemperatura()">Calcular</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDWTemperatura();
}

function mostrarConstantesVDWTemperatura() {
    mostrarConstantesVDW();
}

//====================================================
// RESOLVER TEMPERATURA VDW
//====================================================
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
        alert("Ingrese todos los datos.");
        return;
    }

    if (V <= n * b) {
        alert("El volumen debe ser mayor que el covolumen (n·b).");
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
    <p><b>Gas:</b> ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <hr>
    <h2>T = ${T.toFixed(2)} K</h2>
    <h2>T = ${Tc.toFixed(2)} °C</h2>
    `;
}

//====================================================
// VERIFICAR ECUACIÓN DE VAN DER WAALS
//====================================================
function vdwVerificar() {
    contenido.innerHTML = `
    <h2>✔ Verificar ecuación de Van der Waals</h2>
    <hr>
    <h2>(P + an²/V²)(V-nb)=nRT</h2>
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
    <label><b>Presión (Pa)</b></label>
    <input id="P" type="number">
    <br><br>
    <label><b>Volumen (m³)</b></label>
    <input id="V" type="number">
    <br><br>
    <label><b>Temperatura (K)</b></label>
    <input id="T" type="number">
    <br><br>
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number">
    <br><br>
    <button onclick="resolverVerificacionVDW()">Verificar</button>
    <button onclick="vanDerWaals()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
    mostrarConstantesVDW();
}

//====================================================
// RESOLVER VERIFICACIÓN VDW
//====================================================
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
        alert("Ingrese todos los datos.");
        return;
    }

    const ladoIzquierdo = (P + (a * Math.pow(n, 2) / Math.pow(V, 2))) * (V - n * b);
    const ladoDerecho = n * CONSTANTES.R.J * T;
    const error = Math.abs(ladoIzquierdo - ladoDerecho) / ladoDerecho * 100;

    let mensaje = error < 0.01 ? "✅ La ecuación se satisface correctamente." : "⚠ Existe una diferencia entre ambos lados de la ecuación.";

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p><b>Gas:</b> ${gas == "personalizado" ? "Personalizado" : GASES_REALES[gas].nombre}</p>
    <hr>
    <p>Lado izquierdo: <b>${ladoIzquierdo.toFixed(2)}</b></p>
    <p>Lado derecho: <b>${ladoDerecho.toFixed(2)}</b></p>
    <p>Error: <b>${error.toFixed(4)} %</b></p>
    <hr>
    <p>${mensaje}</p>
    `;
}

//====================================================
// ECUACIÓN VIRIAL
//====================================================
function virial() {
    contenido.innerHTML = `
    <h2>📈 Ecuación Virial</h2>
    <hr>
    <h2>PV = ZnRT</h2>
    <p>Seleccione la propiedad que desea calcular.</p>
    <div class="lista">
        <div class="item" onclick="virialPresion()">📌 Presión</div>
        <div class="item" onclick="virialTemperatura()">🌡 Temperatura</div>
        <div class="item" onclick="virialValidacion()">✔ Validación</div>
    </div>
    <br>
    <button onclick="gasReal()">← Volver</button>
    `;
}

function virialPresion() {
    contenido.innerHTML = `
    <h2>📌 Presión mediante Virial</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Temperatura (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <label><b>Volumen (m³)</b></label>
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
    <button onclick="resolverVirialPresion()">Calcular</button>
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
        alert("Ingrese todos los datos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let P = (Z * n * CONSTANTES.R.J * T) / V;

    let unidad = document.getElementById("unidadResultado").value;
    let resultado = P;
    if (unidad == "kPa") resultado /= 1000;
    else if (unidad == "MPa") resultado /= 1000000;
    else if (unidad == "bar") resultado /= 100000;
    else if (unidad == "atm") resultado /= 101325;

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p>Volumen molar = ${Vm.toFixed(6)} m³/mol</p>
    <p>Z = ${Z.toFixed(4)}</p>
    <hr>
    <h2>P = ${resultado.toFixed(4)} ${unidad}</h2>
    `;
}

function virialTemperatura() {
    contenido.innerHTML = `
    <h2>🌡 Temperatura mediante Virial</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Presión (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Volumen (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <button onclick="resolverVirialTemperatura()">Calcular</button>
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
        alert("Ingrese todos los datos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let T = (P * V) / (Z * n * CONSTANTES.R.J);

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Resultado</h2>
    <hr>
    <p>Volumen molar = ${Vm.toFixed(6)} m³/mol</p>
    <p>Z = ${Z.toFixed(4)}</p>
    <hr>
    <h2>T = ${T.toFixed(2)} K</h2>
    <h2>T = ${(T - 273.15).toFixed(2)} °C</h2>
    `;
}

function virialValidacion() {
    contenido.innerHTML = `
    <h2>✔ Validación de la Ecuación Virial</h2>
    <hr>
    <label><b>Coeficiente Virial B (m³/mol)</b></label>
    <input id="B" type="number" step="any">
    <br><br>
    <label><b>Presión (Pa)</b></label>
    <input id="P" type="number" step="any">
    <br><br>
    <label><b>Volumen (m³)</b></label>
    <input id="V" type="number" step="any">
    <br><br>
    <label><b>Moles (mol)</b></label>
    <input id="n" type="number" step="any">
    <br><br>
    <label><b>Temperatura (K)</b></label>
    <input id="T" type="number" step="any">
    <br><br>
    <button onclick="resolverVirialValidacion()">Validar</button>
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
        alert("Ingrese todos los datos.");
        return;
    }

    let Vm = V / n;
    let Z = 1 + (B / Vm);
    let izquierda = P * V;
    let derecha = Z * n * CONSTANTES.R.J * T;
    let error = Math.abs(izquierda - derecha) / derecha * 100;

    let mensaje = error < 0.01 ? "✅ La ecuación se satisface correctamente." : "⚠ Existe diferencia entre ambos lados.";

    document.getElementById("resultado").innerHTML = `
    <hr>
    <h2>Validación</h2>
    <hr>
    <p>Lado izquierdo (PV) = ${izquierda.toFixed(2)}</p>
    <p>Lado derecho (ZnRT) = ${derecha.toFixed(2)}</p>
    <p>Error = ${error.toFixed(4)} %</p>
    <hr>
    <h3>${mensaje}</h3>
    `;
}
