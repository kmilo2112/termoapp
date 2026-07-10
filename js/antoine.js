// js/antoine.js
console.log("antoine.js cargado (Modo Formulario)");

// ==========================================
// 1. MOTOR MATEMÁTICO ANTOINE
// ==========================================
const Antoine = (function() {
    const coeficientesSustancias = {
        "agua": { A: 8.07131, B: 1730.63, C: 233.426, Tmin: 1, Tmax: 100 },
        "etanol": { A: 8.2166, B: 1673.12, C: 230.17, Tmin: -50, Tmax: 100 }
    };

    function calcularPresionVapor(sustancia, temperatura) {
        const coef = coeficientesSustancias[sustancia.toLowerCase()];
        if (!coef || temperatura < coef.Tmin || temperatura > coef.Tmax) return null;
        return Math.pow(10, coef.A - (coef.B / (coef.C + temperatura)));
    }

    function calcularTemperaturaDesdePresion(sustancia, presionVapor) {
        const coef = coeficientesSustancias[sustancia.toLowerCase()];
        if (!coef || presionVapor <= 0) return null;
        const denominador = coef.A - Math.log10(presionVapor);
        if (denominador === 0) return null;
        const temperatura = (coef.B / denominador) - coef.C;
        if (temperatura < coef.Tmin || temperatura > coef.Tmax) return null;
        return temperatura;
    }

    return { calcularPresionVapor, calcularTemperaturaDesdePresion };
})();

// ==========================================
// 2. MENÚ SECUNDARIO (Igual a Gas Ideal)
// ==========================================
function antoine() {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
    <h2>🌡 Ecuación de Antoine</h2>
    <p>Seleccione lo que desea calcular.</p>
    
    <div class="lista">
        <div class="item" onclick="abrirFormularioAntoine('presion')">
            🌡 Calcular Presión de Vapor
            <br><small>Dada una temperatura</small>
        </div>
        <div class="item" onclick="abrirFormularioAntoine('temperatura')">
            🔥 Calcular Temperatura de Saturación
            <br><small>Dada una presión</small>
        </div>
    </div>
    <br>
    <button onclick="inicio()">← Volver</button>
    `;
}

// ==========================================
// 3. GENERADOR DE FORMULARIOS
// ==========================================
function abrirFormularioAntoine(id) {
    const contenido = document.getElementById("contenido");

    if (id === "presion") {
        contenido.innerHTML = `
        <h2>🌡 Calcular Presión</h2>
        <p>Ecuación de Antoine</p>
        <hr>

        <label><b>Sustancia</b></label>
        <select id="sustancia">
            <option value="agua">Agua (H₂O)</option>
            <option value="etanol">Etanol (C₂H₆O)</option>
        </select>
        <br><br>

        <label><b>Temperatura</b></label>
        <input id="temperatura" type="number" placeholder="Ingrese la temperatura">
        <select id="unidadTemperatura">
            <option value="°C">°C</option>
            <option value="K">K</option>
        </select>
        <br><br>

        <label><b>Unidad del resultado</b></label>
        <select id="unidadResultado">
            <option value="kPa" selected>kPa</option>
            <option value="mmHg">mmHg</option>
            <option value="atm">atm</option>
            <option value="bar">bar</option>
            <option value="Pa">Pa</option>
        </select>
        <br><br>

        <button onclick="ejecutarCalculoPresionAntoine()">Calcular</button>
        <button onclick="antoine()">Volver</button>
        <br><br>
        <div id="resultado"></div>
        `;
    } 
    else if (id === "temperatura") {
        contenido.innerHTML = `
        <h2>🔥 Calcular Temperatura</h2>
        <p>Ecuación de Antoine</p>
        <hr>

        <label><b>Sustancia</b></label>
        <select id="sustancia">
            <option value="agua">Agua (H₂O)</option>
            <option value="etanol">Etanol (C₂H₆O)</option>
        </select>
        <br><br>

        <label><b>Presión de Vapor</b></label>
        <input id="presion" type="number" placeholder="Ingrese la presión">
        <select id="unidadPresion">
            <option value="kPa" selected>kPa</option>
            <option value="mmHg">mmHg</option>
            <option value="atm">atm</option>
            <option value="bar">bar</option>
            <option value="Pa">Pa</option>
        </select>
        <br><br>

        <label><b>Unidad del resultado</b></label>
        <select id="unidadResultado">
            <option value="°C" selected>°C</option>
            <option value="K">K</option>
        </select>
        <br><br>

        <button onclick="ejecutarCalculoTempAntoine()">Calcular</button>
        <button onclick="antoine()">Volver</button>
        <br><br>
        <div id="resultado"></div>
        `;
    }
}

// ==========================================
// 4. LÓGICA DE CÁLCULO Y CONVERSIÓN
// ==========================================
function ejecutarCalculoPresionAntoine() {
    let sustancia = document.getElementById("sustancia").value;
    let temp = parseFloat(document.getElementById("temperatura").value);
    let unidadTemp = document.getElementById("unidadTemperatura").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(temp)) {
        alert("Por favor, ingrese un valor válido para la temperatura.");
        return;
    }

    // Convertir a °C para el motor de Antoine
    let tempC = (unidadTemp === "K") ? temp - 273.15 : temp;

    let p_mmHg = Antoine.calcularPresionVapor(sustancia, tempC);

    if (p_mmHg === null) {
        document.getElementById("resultado").innerHTML = `
            <hr>
            <p style="color:red; font-weight:bold;">❌ Error: La temperatura ingresada (${tempC.toFixed(2)} °C) está fuera del rango válido para ${sustancia.toUpperCase()}.</p>
        `;
        return;
    }

    // Convertir mmHg a la unidad solicitada
    let p_final = p_mmHg;
    if (unidadRes === "kPa") p_final = p_mmHg * (101.325 / 760);
    else if (unidadRes === "atm") p_final = p_mmHg / 760;
    else if (unidadRes === "bar") p_final = p_mmHg * (1.01325 / 760);
    else if (unidadRes === "Pa") p_final = p_mmHg * (101325 / 760);

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <p>Sustancia: <b>${sustancia.toUpperCase()}</b></p>
        <h2>${p_final.toFixed(4)} ${unidadRes}</h2>
    `;
}

function ejecutarCalculoTempAntoine() {
    let sustancia = document.getElementById("sustancia").value;
    let presion = parseFloat(document.getElementById("presion").value);
    let unidadPresion = document.getElementById("unidadPresion").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(presion)) {
        alert("Por favor, ingrese un valor válido para la presión.");
        return;
    }

    // Convertir cualquier presión a mmHg para el motor de Antoine
    let p_mmHg = presion;
    if (unidadPresion === "kPa") p_mmHg = presion * (760 / 101.325);
    else if (unidadPresion === "atm") p_mmHg = presion * 760;
    else if (unidadPresion === "bar") p_mmHg = presion * (760 / 1.01325);
    else if (unidadPresion === "Pa") p_mmHg = presion * (760 / 101325);

    let t_C = Antoine.calcularTemperaturaDesdePresion(sustancia, p_mmHg);

    if (t_C === null) {
        document.getElementById("resultado").innerHTML = `
            <hr>
            <p style="color:red; font-weight:bold;">❌ Error: La presión ingresada está fuera del rango válido de la sustancia o es negativa.</p>
        `;
        return;
    }

    // Convertir resultado a Kelvin si se solicita
    let t_final = (unidadRes === "K") ? t_C + 273.15 : t_C;

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <p>Sustancia: <b>${sustancia.toUpperCase()}</b></p>
        <h2>${t_final.toFixed(2)} ${unidadRes}</h2>
    `;
}
// js/antoine.js
// Actualizado con formato pedagógico consistente

function ejecutarCalculoPresionAntoine() {
    let sustancia = document.getElementById("sustancia").value;
    let temp = parseFloat(document.getElementById("temperatura").value);
    let unidadTemp = document.getElementById("unidadTemperatura").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(temp)) { alert("Ingrese un valor válido."); return; }

    // Conversión a SI (Antoine usa °C, pero mostramos el valor base para el usuario)
    let tempC = (unidadTemp === "K") ? temp - 273.15 : temp;
    let p_mmHg = Antoine.calcularPresionVapor(sustancia, tempC);

    if (p_mmHg === null) {
        document.getElementById("resultado").innerHTML = `<p style="color:red;">Fuera de rango.</p>`;
        return;
    }

    // Conversión resultado
    let p_final = p_mmHg;
    if (unidadRes === "kPa") p_final = p_mmHg * (101.325 / 760);
    else if (unidadRes === "atm") p_final = p_mmHg / 760;
    else if (unidadRes === "bar") p_final = p_mmHg * (1.01325 / 760);
    else if (unidadRes === "Pa") p_final = p_mmHg * (101325 / 760);

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <h3>Ecuación de Antoine</h3>
        <p><b>Ecuación:</b> log₁₀(P) = A - (B / (C + T))</p>
        <hr>
        <h3>Conversión al SI</h3>
        <p>Temperatura: ${tempC.toFixed(2)} °C</p>
        <hr>
        <h3>Sustitución</h3>
        <p>P = 10^(A - (B / (C + T)))</p>
        <h2>${p_final.toFixed(4)} ${unidadRes}</h2>
        <hr>
        <h3>Interpretación:</h3>
        <p>Esta es la presión de vapor de la sustancia a la temperatura especificada.</p>
    `;
}

function ejecutarCalculoTempAntoine() {
    let sustancia = document.getElementById("sustancia").value;
    let presion = parseFloat(document.getElementById("presion").value);
    let unidadPresion = document.getElementById("unidadPresion").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(presion)) { alert("Ingrese un valor válido."); return; }

    // Conversión a mmHg (base para Antoine)
    let p_mmHg = presion;
    if (unidadPresion === "kPa") p_mmHg = presion * (760 / 101.325);
    else if (unidadPresion === "atm") p_mmHg = presion * 760;
    else if (unidadPresion === "bar") p_mmHg = presion * (760 / 1.01325);
    
    let t_C = Antoine.calcularTemperaturaDesdePresion(sustancia, p_mmHg);

    if (t_C === null) {
        document.getElementById("resultado").innerHTML = `<p style="color:red;">Fuera de rango.</p>`;
        return;
    }

    let t_final = (unidadRes === "K") ? t_C + 273.15 : t_C;

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <h3>Ecuación de Antoine (Inversa)</h3>
        <p><b>Ecuación:</b> T = B / (A - log₁₀(P)) - C</p>
        <hr>
        <h3>Conversión al SI</h3>
        <p>Presión: ${p_mmHg.toFixed(2)} mmHg</p>
        <hr>
        <h3>Sustitución</h3>
        <p>T = B / (A - log₁₀(${p_mmHg.toFixed(2)})) - C</p>
        <h2>${t_final.toFixed(2)} ${unidadRes}</h2>
        <hr>
        <h3>Interpretación:</h3>
        <p>Esta es la temperatura de saturación necesaria para alcanzar la presión especificada.</p>
    `;
}