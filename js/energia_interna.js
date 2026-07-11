// js/energia_interna.js
console.log("energia_interna.js cargado");

function pantallaEnergiaInterna() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h2>🧪 Calcular Energía Interna (ΔU)</h2>
    <p>Para un Gas Ideal</p>
    <hr>

    <label><b>Cantidad de sustancia (n)</b></label>
    <input id="moles" type="number" placeholder="Ingrese los moles">
    <select id="unidadMoles">
        <option value="mol" selected>mol</option>
        <option value="kmol">kmol</option>
    </select>
    <br><br>

    <label><b>Capacidad calorífica molar (Cv)</b></label>
    <input id="cv" type="number" placeholder="Ej: 20.78" step="0.01">
    <small style="display:block; margin-top:5px; color:#555;">
        Unidad: J/(mol·K). <i>Monoatómico ≈ 12.47 | Diatómico ≈ 20.78</i>
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

    <button onclick="ejecutarCalculoEnergiaInterna()">Calcular</button>
    <button onclick="inicio()">← Volver al Menú</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function ejecutarCalculoEnergiaInterna() {
    let n = parseFloat(document.getElementById("moles").value);
    let unidadN = document.getElementById("unidadMoles").value;
    let cv = parseFloat(document.getElementById("cv").value);
    let t1 = parseFloat(document.getElementById("t1").value);
    let unidadT1 = document.getElementById("unidadT1").value;
    let t2 = parseFloat(document.getElementById("t2").value);
    let unidadT2 = document.getElementById("unidadT2").value;
    let unidadRes = document.getElementById("unidadResultado").value;

    if (isNaN(n) || isNaN(cv) || isNaN(t1) || isNaN(t2)) {
        alert("Complete todos los campos.");
        return;
    }

    let n_mol = (unidadN === "kmol") ? n * 1000 : n;
    let t1_K = (unidadT1 === "°C") ? t1 + 273.15 : t1;
    let t2_K = (unidadT2 === "°C") ? t2 + 273.15 : t2;
    let deltaT = t2_K - t1_K;
    let deltaU_J = n_mol * cv * deltaT;
    let resFinal = (unidadRes === "kJ") ? deltaU_J / 1000 : deltaU_J;

    let interpretacion = (deltaU_J > 0) ? "La energía interna aumenta (aumenta la energía cinética de las partículas)." : 
                         (deltaU_J < 0) ? "La energía interna disminuye (disminuye la energía cinética)." : "No hay variación de energía interna (ΔU = 0).";

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <b>Ecuación:</b> ΔU = n · Cv · ΔT
        <hr>
        <h3>Conversión al SI</h3>
        <table style="width:100%">
            <tr><td>Moles (n)</td><td align="right">${n_mol.toFixed(4)} mol</td></tr>
            <tr><td>Var. Temp. (ΔT)</td><td align="right">${deltaT.toFixed(2)} K</td></tr>
        </table>
        <hr>
        <h3>Sustitución</h3>
        <p>ΔU = (${n_mol.toFixed(4)}) × (${cv.toFixed(2)}) × (${deltaT.toFixed(2)})</p>
        <h2>${resFinal.toFixed(3)} ${unidadRes}</h2>
        <hr>
        <h3>Interpretación:</h3>
        <p>${interpretacion}</p>
    `;
}