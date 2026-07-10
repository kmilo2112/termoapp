// js/energia_libre.js
console.log("energia_libre.js cargado");

function pantallaEnergiaLibre() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h2>🧪 Energía Libre de Gibbs (ΔG)</h2>
    <p>Espontaneidad de un proceso a presión y temperatura constantes.</p>
    <hr>

    <label><b>Variación de Entalpía (ΔH)</b></label>
    <input id="dh" type="number" placeholder="Ingrese ΔH">
    <select id="unidadDH">
        <option value="J">J</option>
        <option value="kJ" selected>kJ</option>
    </select>
    <br><br>

    <label><b>Variación de Entropía (ΔS)</b></label>
    <input id="ds" type="number" placeholder="Ingrese ΔS">
    <select id="unidadDS">
        <option value="J/K" selected>J/K</option>
        <option value="kJ/K">kJ/K</option>
    </select>
    <br><br>

    <label><b>Temperatura del Sistema (T)</b></label>
    <input id="temp" type="number" placeholder="Temperatura">
    <select id="unidadTemp">
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

    <button onclick="ejecutarCalculoGibbs()">Calcular</button>
    <button onclick="inicio()">← Volver al Menú</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function ejecutarCalculoGibbs() {
    let dh = parseFloat(document.getElementById("dh").value);
    let unidadDH = document.getElementById("unidadDH").value;
    let ds = parseFloat(document.getElementById("ds").value);
    let unidadDS = document.getElementById("unidadDS").value;
    let t = parseFloat(document.getElementById("temp").value);
    let unidadTemp = document.getElementById("unidadTemp").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(dh) || isNaN(ds) || isNaN(t)) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // 1. Conversión al SI
    let dh_J = (unidadDH === "kJ") ? dh * 1000 : dh;
    let ds_J = (unidadDS === "kJ/K") ? ds * 1000 : ds;
    let t_K = (unidadTemp === "°C") ? t + 273.15 : t;

    // Validación de cero absoluto
    if (t_K < 0) {
        alert("La temperatura no puede ser menor al cero absoluto (0 K).");
        return;
    }

    // 2. Cálculo
    let deltaG_J = dh_J - (t_K * ds_J);

    // 3. Conversión final
    let resFinal = (unidadRes === "kJ") ? deltaG_J / 1000 : deltaG_J;

    // 4. Interpretación dinámica
    let interpretacion = "";
    if (deltaG_J < 0) {
        interpretacion = "✅ Proceso Espontáneo: El sistema puede realizar trabajo útil y la transformación ocurre naturalmente en las condiciones dadas.";
    } else if (deltaG_J > 0) {
        interpretacion = "❌ Proceso No Espontáneo: El sistema requiere energía del entorno para que el proceso ocurra. (La reacción inversa sí sería espontánea).";
    } else {
        interpretacion = "⚖️ Sistema en Equilibrio: Las fases o reacciones están en balance termodinámico y no hay tendencia neta al cambio.";
    }

    // 5. Renderizado
    document.getElementById("resultado").innerHTML = `
        <hr style="border: 1px solid #ddd;">
        <h2 style="margin-bottom: 5px;">Resultado</h2>
        <b>Energía Libre de Gibbs</b><br>
        <b>Ecuación:</b> ΔG = ΔH - T · ΔS
        
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Conversión al SI</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #000;">
                <th style="text-align: left; padding-bottom: 5px;">Variable</th>
                <th style="text-align: right; padding-bottom: 5px;">Valor SI</th>
            </tr>
            <tr><td style="padding: 5px 0;">Entalpía (ΔH)</td><td style="text-align: right;">${dh_J.toFixed(2)} J</td></tr>
            <tr><td style="padding: 5px 0;">Entropía (ΔS)</td><td style="text-align: right;">${ds_J.toFixed(4)} J/K</td></tr>
            <tr><td style="padding: 5px 0;">Temperatura (T)</td><td style="text-align: right;">${t_K.toFixed(2)} K</td></tr>
        </table>

        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Sustitución</h3>
        <p style="margin-top: 0;">ΔG = (${dh_J.toFixed(2)}) - [(${t_K.toFixed(2)}) × (${ds_J.toFixed(4)})]</p>
        <h2 style="font-size: 1.8em; margin: 10px 0;">${resFinal.toFixed(3)} ${unidadRes}</h2>
        
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <h3 style="margin-bottom: 5px;">Interpretación:</h3>
        <p style="margin-top: 0;">${interpretacion}</p>
    `;
}