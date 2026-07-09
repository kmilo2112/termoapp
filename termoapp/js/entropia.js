// js/entropia.js
console.log("entropia.js cargado");

function pantallaEntropia() {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h2>❄ Calcular Entropía (ΔS)</h2>
    <p>Cambio de entropía en un Gas Ideal</p>
    <hr>

    <label><b>Moles (n)</b></label>
    <input id="moles" type="number" placeholder="n">
    <select id="unidadMoles"><option value="mol">mol</option><option value="kmol">kmol</option></select>
    <br><br>

    <label><b>Cp (J/mol·K)</b></label>
    <input id="cp" type="number" placeholder="Ej: 29.10">
    <br><br>

    <label><b>Temp. (T₁ a T₂)</b></label>
    <input id="t1" type="number" placeholder="T₁">
    <input id="t2" type="number" placeholder="T₂">
    <select id="unidadT"><option value="K">Kelvin</option><option value="°C">Celsius</option></select>
    <br><br>

    <label><b>Presión (P₁ a P₂)</b></label>
    <input id="p1" type="number" placeholder="P₁">
    <input id="p2" type="number" placeholder="P₂">
    <select id="unidadP"><option value="Pa">Pa</option><option value="kPa">kPa</option><option value="atm">atm</option></select>
    <br><br>

    <button onclick="ejecutarCalculoEntropia()">Calcular</button>
    <button onclick="inicio()">← Volver</button>
    <br><br>
    <div id="resultado"></div>
    `;
}

function ejecutarCalculoEntropia() {
    let n = parseFloat(document.getElementById("moles").value) * (document.getElementById("unidadMoles").value === "kmol" ? 1000 : 1);
    let cp = parseFloat(document.getElementById("cp").value);
    let t1 = parseFloat(document.getElementById("t1").value);
    let t2 = parseFloat(document.getElementById("t2").value);
    let unidadT = document.getElementById("unidadT").value;
    let p1 = parseFloat(document.getElementById("p1").value);
    let p2 = parseFloat(document.getElementById("p2").value);
    let unidadP = document.getElementById("unidadP").value;

    if (isNaN(n) || isNaN(cp) || isNaN(t1) || isNaN(t2) || isNaN(p1) || isNaN(p2)) {
        alert("Completa todos los campos"); return;
    }

    // Convertir a SI
    let T1 = (unidadT === "°C") ? t1 + 273.15 : t1;
    let T2 = (unidadT === "°C") ? t2 + 273.15 : t2;
    
    let factorP = (unidadP === "kPa") ? 1000 : (unidadP === "atm") ? 101325 : 1;
    let P1 = p1 * factorP;
    let P2 = p2 * factorP;

    const R = 8.314;
    // ΔS = n * (Cp * ln(T2/T1) - R * ln(P2/P1))
    let deltaS = n * (cp * Math.log(T2 / T1) - R * Math.log(P2 / P1));

    document.getElementById("resultado").innerHTML = `
        <hr>
        <h2>Resultado</h2>
        <b>Ecuación:</b> ΔS = n·[Cp·ln(T₂/T₁)] - n·[R·ln(P₂/P₁)]
        <hr>
        <h3>Sustitución</h3>
        <p>ΔS = ${n.toFixed(2)} · [${cp} · ln(${T2.toFixed(2)}/${T1.toFixed(2)}) - ${R} · ln(${P2.toFixed(0)}/${P1.toFixed(0)})]</p>
        <h2 style="color: #2c3e50;">${deltaS.toFixed(4)} J/K</h2>
        <hr>
        <h3>Interpretación:</h3>
        <p>${deltaS > 0 ? "La entropía aumentó, indicando un mayor desorden molecular." : "La entropía disminuyó, indicando un sistema más ordenado."}</p>
    `;
}