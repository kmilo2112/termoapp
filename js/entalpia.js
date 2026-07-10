// js/entalpia.js
console.log("entalpia.js cargado");

function pantallaEntalpia() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h2>🧪 Calcular Entalpía (ΔH)</h2>
    <p>Para un Gas Ideal</p>
    <hr>

    <label><b>Cantidad de sustancia (n)</b></label>
    <input id="moles" type="number" placeholder="Ingrese los moles">
    <select id="unidadMoles">
        <option value="mol" selected>mol</option>
        <option value="kmol">kmol</option>
    </select>
    <br><br>

    <label><b>Capacidad calorífica molar (Cp)</b></label>
    <input id="cp" type="number" placeholder="Ej: 29.10" step="0.01">
    <small style="display:block; margin-top:5px; color:#555;">
        Unidad: J/(mol·K). <i>Monoatómico ≈ 20.78 | Diatómico ≈ 29.10</i>
    </small>
    <br><br>

    <label><b>Temperatura Inicial (T₁)</b></label>
    <input id="t1" type="number">
    <select id="unidadT1">
        <option value="K" selected>K</option>
        <option value="°C">°C</option>
    </select>
    <br><br>

    <label><b>Temperatura Final (T₂)</b></label>
    <input id="t2" type="number">
    <select id="unidadT2">
        <option value="K" selected>K</option>
        <option value="°C">°C</option>
    </select>
    <br><br>

    <label><b>Unidad del resultado</b></label>
    <select id="unidadResultado">
        <option value="J">J</option>
        <option value="kJ" selected>kJ</option>
    </select>
    <br><br>

    <button onclick="ejecutarCalculoEntalpia()">Calcular</button>
    <button onclick="inicio()">← Volver al Menú</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function ejecutarCalculoEntalpia() {
    let n = parseFloat(document.getElementById("moles").value);
    let unidadN = document.getElementById("unidadMoles").value;
    let cp = parseFloat(document.getElementById("cp").value);
    let t1 = parseFloat(document.getElementById("t1").value);
    let unidadT1 = document.getElementById("unidadT1").value;
    let t2 = parseFloat(document.getElementById("t2").value);
    let unidadT2 = document.getElementById("unidadT2").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(n) || isNaN(cp) || isNaN(t1) || isNaN(t2)) {
        alert("Complete todos los campos.");
        return;
    }

    // 1. Conversión al SI
    let n_mol = (unidadN === "kmol") ? n * 1000 : n;
    let t1_K = (unidadT1 === "°C") ? t1 + 273.15 : t1;
    let t2_K = (unidadT2 === "°C") ? t2 + 273.15 : t2;
    let deltaT = t2_K - t1_K;
    
    // 2. Cálculo
    let deltaH_J = n_mol * cp * deltaT;
    
    // 3. Conversión final
    let resFinal = (unidadRes === "kJ") ? deltaH_J / 1000 : deltaH_J;

    // 4. Interpretación dinámica
    let interpretacion = (deltaH_J > 0) ? "Proceso Endotérmico: El sistema absorbe calor del entorno manteniendo la presión constante." : 
                         (deltaH_J < 0) ? "Proceso Exotérmico: El sistema libera calor hacia el entorno a presión constante." : "No hay variación de entalpía (Proceso isotérmico para un gas ideal).";

    // 5. Renderizado
    document.getElementById("resultado").innerHTML = `
        <hr style="border: 1px solid #ddd;">
        <h2 style="margin-bottom: 5px;">Resultado</h2>
        <b>Entalpía de un Gas Ideal</b><br>
        <b>Ecuación:</b> ΔH = n · Cp · ΔT<br>
        <b>Desglose:</b> ΔT = T₂ - T₁
        
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Conversión al SI</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #000;">
                <th style="text-align: left; padding-bottom: 5px;">Variable</th>
                <th style="text-align: right; padding-bottom: 5px;">Valor SI</th>
            </tr>
            <tr><td style="padding: 5px 0;">Moles (n)</td><td style="text-align: right;">${n_mol.toFixed(4)} mol</td></tr>
            <tr><td style="padding: 5px 0;">Cp</td><td style="text-align: right;">${cp.toFixed(2)} J/(mol·K)</td></tr>
            <tr><td style="padding: 5px 0;">Temp. Inicial (T₁)</td><td style="text-align: right;">${t1_K.toFixed(2)} K</td></tr>
            <tr><td style="padding: 5px 0;">Temp. Final (T₂)</td><td style="text-align: right;">${t2_K.toFixed(2)} K</td></tr>
            <tr><td style="padding: 5px 0;">Var. Temp. (ΔT)</td><td style="text-align: right;">${deltaT.toFixed(2)} K</td></tr>
        </table>

        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Sustitución</h3>
        <p style="margin-top: 0;">ΔH = (${n_mol.toFixed(4)}) × (${cp.toFixed(2)}) × (${deltaT.toFixed(2)})</p>
        <h2 style="font-size: 1.8em; margin: 10px 0;">${resFinal.toFixed(3)} ${unidadRes}</h2>
        
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Interpretación:</h3>
        <p style="margin-top: 0;">${interpretacion}</p>
    `;
}