console.log("ThermoLab iniciado correctamente.");

const contenido = document.getElementById("contenido");

inicio();

//========================================
// MENÚ PRINCIPAL
//========================================

//========================================
// MENÚ PRINCIPAL
//========================================

function inicio() {

    contenido.innerHTML = `

    <div class="menu">

        <div class="card" onclick="gasIdeal()">

            <h2>🧪 Gas Ideal</h2>

            <p>

            Cálculo de propiedades mediante la Ley del Gas Ideal.

            </p>

        </div>

        <div class="card">

            <h2>🧪 Gas Real</h2>

            <p>

            Volumen, presión y factor de compresibilidad.

            </p>

        </div>

        <!-- 👇 AQUÍ ESTÁ EL CAMBIO: Se agregó onclick="antoine()" 👇 -->
        <div class="card" onclick="antoine()">

            <h2>🌡 Antoine</h2>

            <p>

            Presión de vapor.

            </p>

        </div>

        <div class="card">

            <h2>📖 Conceptos</h2>

            <p>

            Explicaciones teóricas.

            </p>

        </div>

    </div>

    `;

}

//========================================
// MENÚ GAS IDEAL
//========================================

function gasIdeal() {

    contenido.innerHTML = `

    <h2>🧪 Ley del Gas Ideal</h2>

    <p>

    Seleccione la propiedad que desea calcular.

    </p>

    <div class="lista">

        <div class="item"

        onclick="abrirPropiedad('presion')">

            Presión

        </div>

        <div class="item"

        onclick="abrirPropiedad('volumen')">

            Volumen

        </div>

        <div class="item"

        onclick="abrirPropiedad('temperatura')">

            Temperatura

        </div>

        <div class="item"

        onclick="abrirPropiedad('moles')">

            Número de moles

        </div>

        <div class="item"

        onclick="trabajo()">

            Trabajo

        </div>

        <div class="item"

        onclick="calor()">

            Calor

        </div>

        <div class="item">

            Energía Interna

        </div>

        <div class="item">

            Entalpía

        </div>

        <div class="item">

            Entropía

        </div>

        <div class="item">

            Energía Libre de Gibbs

        </div>

    </div>

    <br>

    <button onclick="inicio()">

        ← Volver

    </button>

    `;

}

//========================================
// FORMULARIOS
//========================================

function abrirPropiedad(id) {
    if (id == "presion") {

        contenido.innerHTML = `

        <h2>🧪 Calcular Presión</h2>

        <p>Ley del Gas Ideal</p>

        <hr>

        <label><b>Volumen</b></label>

        <input id="volumen" type="number" placeholder="Ingrese el volumen">

        <select id="unidadVolumen">

            <option value="m3">m³</option>
            <option value="L">L</option>
            <option value="cm3">cm³</option>

        </select>

        <br><br>

        <label><b>Temperatura</b></label>

        <input id="temperatura" type="number" placeholder="Ingrese la temperatura">

        <select id="unidadTemperatura">

            <option value="K">K</option>
            <option value="°C">°C</option>

        </select>

        <br><br>

        <label><b>Cantidad de sustancia</b></label>

        <input id="moles" type="number" placeholder="Ingrese los moles">

        <select id="unidadMoles">

            <option value="mol">mol</option>
            <option value="kmol">kmol</option>

        </select>

        <br><br>

        <label><b>Unidad del resultado</b></label>

        <select id="unidadResultado">

            <option value="Pa">Pa</option>
            <option value="kPa" selected>kPa</option>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="atm">atm</option>
            <option value="mmHg">mmHg</option>

        </select>

        <br><br>

        <button onclick="calcularPresion()">

            Calcular

        </button>

        <button onclick="gasIdeal()">

            Volver

        </button>

        <br><br>

        <div id="resultado"></div>

        `;

    }

    else if (id == "volumen") {

        contenido.innerHTML = `

        <h2>🧪 Calcular Volumen</h2>

        <p>Ley del Gas Ideal</p>

        <hr>

        <label><b>Presión</b></label>

        <input id="presion" type="number" placeholder="Ingrese la presión">

        <select id="unidadPresion">

            <option value="Pa">Pa</option>
            <option value="kPa" selected>kPa</option>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="atm">atm</option>
            <option value="mmHg">mmHg</option>

        </select>

        <br><br>

        <label><b>Temperatura</b></label>

        <input id="temperatura" type="number" placeholder="Ingrese la temperatura">

        <select id="unidadTemperatura">

            <option value="K">K</option>
            <option value="°C">°C</option>

        </select>

        <br><br>

        <label><b>Cantidad de sustancia</b></label>

        <input id="moles" type="number" placeholder="Ingrese los moles">

        <select id="unidadMoles">

            <option value="mol">mol</option>
            <option value="kmol">kmol</option>

        </select>

        <br><br>

        <label><b>Unidad del resultado</b></label>

        <select id="unidadResultado">

            <option value="m3" selected>m³</option>
            <option value="L">L</option>
            <option value="cm3">cm³</option>

        </select>

        <br><br>

        <button onclick="calcularVolumen()">

            Calcular

        </button>

        <button onclick="gasIdeal()">

            Volver

        </button>

        <br><br>

        <div id="resultado"></div>

        `;

    }
    else if (id == "temperatura") {

        contenido.innerHTML = `

        <h2>🧪 Calcular Temperatura</h2>

        <p>Ley del Gas Ideal</p>

        <hr>

        <label><b>Presión</b></label>

        <input id="presion" type="number" placeholder="Ingrese la presión">

        <select id="unidadPresion">

            <option value="Pa">Pa</option>
            <option value="kPa" selected>kPa</option>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="atm">atm</option>
            <option value="mmHg">mmHg</option>

        </select>

        <br><br>

        <label><b>Volumen</b></label>

        <input id="volumen" type="number" placeholder="Ingrese el volumen">

        <select id="unidadVolumen">

            <option value="m3" selected>m³</option>
            <option value="L">L</option>
            <option value="cm3">cm³</option>

        </select>

        <br><br>

        <label><b>Cantidad de sustancia</b></label>

        <input id="moles" type="number" placeholder="Ingrese los moles">

        <select id="unidadMoles">

            <option value="mol" selected>mol</option>
            <option value="kmol">kmol</option>

        </select>

        <br><br>

        <label><b>Unidad del resultado</b></label>

        <select id="unidadResultado">

            <option value="K" selected>K</option>
            <option value="°C">°C</option>

        </select>

        <br><br>

        <button onclick="calcularTemperatura()">

            Calcular

        </button>

        <button onclick="gasIdeal()">

            Volver

        </button>

        <br><br>

        <div id="resultado"></div>

        `;

    }

    else if (id == "moles") {

        contenido.innerHTML = `

        <h2>🧪 Calcular Número de Moles</h2>

        <p>Ley del Gas Ideal</p>

        <hr>

        <label><b>Presión</b></label>

        <input id="presion" type="number" placeholder="Ingrese la presión">

        <select id="unidadPresion">

            <option value="Pa">Pa</option>
            <option value="kPa" selected>kPa</option>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="atm">atm</option>
            <option value="mmHg">mmHg</option>

        </select>

        <br><br>

        <label><b>Volumen</b></label>

        <input id="volumen" type="number" placeholder="Ingrese el volumen">

        <select id="unidadVolumen">

            <option value="m3" selected>m³</option>
            <option value="L">L</option>
            <option value="cm3">cm³</option>

        </select>

        <br><br>

        <label><b>Temperatura</b></label>

        <input id="temperatura" type="number" placeholder="Ingrese la temperatura">

        <select id="unidadTemperatura">

            <option value="K" selected>K</option>
            <option value="°C">°C</option>

        </select>

        <br><br>

        <label><b>Unidad del resultado</b></label>

        <select id="unidadResultado">

            <option value="mol" selected>mol</option>
            <option value="kmol">kmol</option>

        </select>

        <br><br>

        <button onclick="calcularMoles()">

            Calcular

        </button>

        <button onclick="gasIdeal()">

            Volver

        </button>

        <br><br>

        <div id="resultado"></div>

        `;

    }
}
//========================================
// MÓDULO TRABAJO
//========================================

function trabajo() {

    contenido.innerHTML = `

    <h2>⚙ Trabajo Termodinámico</h2>

    <p>

    El trabajo es una forma de transferencia de energía asociada al movimiento de la frontera de un sistema.

    </p>

    <hr>

    <h3>

    Seleccione el proceso termodinámico

    </h3>

    <br>

    <div class="lista">

        <div class="item"

        onclick="trabajoIsobarico()">

            📈 Trabajo Isobárico

            <br>

            <small>

            Presión constante

            </small>

        </div>

        <div class="item"

        onclick="trabajoIsocorico()">

            📦 Trabajo Isocórico

            <br>

            <small>

            Volumen constante

            </small>

        </div>

        <div class="item"

        onclick="trabajoIsotermico()">

            🌡 Trabajo Isotérmico

            <br>

            <small>

            Temperatura constante

            </small>

        </div>

        <div class="item"

        onclick="trabajoAdiabatico()">

            🔥 Trabajo Adiabático

            <br>

            <small>

            Sin transferencia de calor

            </small>

        </div>

        <div class="item"

        onclick="trabajoPolitropico()">

            ⚙ Trabajo Politrópico

            <br>

            <small>

            Proceso general

            </small>

        </div>

    </div>

    <br>

    <button onclick="gasIdeal()">

        ← Volver

    </button>

    `;

}
//========================================
// TRABAJO ISOBÁRICO
//========================================

function trabajoIsobarico() {

    contenido.innerHTML = `

    <h2>📈 Trabajo Isobárico</h2>

    <hr>

    <h3>📖 ¿Qué es un proceso isobárico?</h3>

    <p>

    Un proceso isobárico es aquel en el que la presión permanece
    constante durante todo el proceso.

    Durante una expansión o una compresión, el trabajo realizado
    depende únicamente del cambio de volumen.

    </p>

    <hr>

    <h3>📐 Ecuación</h3>

    <h2>

    W = P (V₂ − V₁)

    </h2>

    <hr>

    <h3>📚 Significado de las variables</h3>

    <table style="width:100%; border-collapse:collapse;">

        <tr>

            <th align="left">Símbolo</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td><b>W</b></td>

            <td>Trabajo</td>

            <td>J</td>

        </tr>

        <tr>

            <td><b>P</b></td>

            <td>Presión constante</td>

            <td>Pa</td>

        </tr>

        <tr>

            <td><b>V₁</b></td>

            <td>Volumen inicial</td>

            <td>m³</td>

        </tr>

        <tr>

            <td><b>V₂</b></td>

            <td>Volumen final</td>

            <td>m³</td>

        </tr>

    </table>

    <hr>

    <h3>Ingrese los datos</h3>

    <label><b>Presión</b></label>

    <input id="presion" type="number">

    <select id="unidadPresion">

        <option value="Pa">Pa</option>

        <option value="kPa">kPa</option>

        <option value="MPa">MPa</option>

        <option value="bar">bar</option>

        <option value="atm">atm</option>

        <option value="mmHg">mmHg</option>

    </select>

    <br><br>

    <label><b>Volumen inicial</b></label>

    <input id="volumenInicial" type="number">

    <select id="unidadVolumenInicial">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Volumen final</b></label>

    <input id="volumenFinal" type="number">

    <select id="unidadVolumenFinal">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Unidad del resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button onclick="
    
    calcularTrabajoIsobarico()">

        Calcular

    </button>

    <button onclick="trabajo()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//========================================
// TRABAJO ISOCÓRICO
//========================================

function trabajoIsocorico() {

    contenido.innerHTML = `

    <h2>📦 Trabajo Isocórico</h2>

    <hr>

    <h3>📖 ¿Qué es un proceso isocórico?</h3>

    <p>

    Un proceso isocórico es aquel en el que el volumen permanece constante durante todo el proceso.

    Debido a que no existe cambio de volumen, no se realiza trabajo de frontera.

    </p>

    <hr>

    <h3>📐 Ecuación</h3>

    <h2>

    W = 0

    </h2>

    <hr>

    <h3>📚 Significado de las variables</h3>

    <table style="width:100%; border-collapse:collapse;">

        <tr>

            <th align="left">Símbolo</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td><b>W</b></td>

            <td>Trabajo</td>

            <td>J</td>

        </tr>

        <tr>

            <td><b>V</b></td>

            <td>Volumen constante</td>

            <td>m³</td>

        </tr>

    </table>

    <hr>

    <h3>Observación</h3>

    <p>

    En un proceso isocórico no es necesario ingresar datos.

    Como el volumen permanece constante,

    el trabajo siempre es igual a cero.

    </p>

    <br>

    <button onclick="calcularTrabajoIsocorico()">

        Calcular

    </button>

    <button onclick="trabajo()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//========================================
// TRABAJO ISOTÉRMICO
//========================================

function trabajoIsotermico() {

    contenido.innerHTML = `

    <h2>🌡 Trabajo Isotérmico</h2>

    <hr>

    <h3>📖 ¿Qué es un proceso isotérmico?</h3>

    <p>

    Un proceso isotérmico es aquel en el que la temperatura permanece
    constante durante toda la transformación.

    En un gas ideal, la energía interna depende únicamente de la temperatura,
    por lo que durante este proceso se cumple que ΔU = 0.

    </p>

    <hr>

    <h3>📐 Desarrollo de la ecuación</h3>

    <p>W = ∫PdV</p>

    <p>Como PV = nRT</p>

    <p>P = nRT/V</p>

    <p>W = ∫(nRT/V)dV</p>

    <p>W = nRT∫dV/V</p>

    <h2>

    W = nRT ln(V₂/V₁)

    </h2>

    <hr>

    <h3>📚 Significado de las variables</h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">Símbolo</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td><b>W</b></td>

            <td>Trabajo</td>

            <td>J</td>

        </tr>

        <tr>

            <td><b>n</b></td>

            <td>Número de moles</td>

            <td>mol</td>

        </tr>

        <tr>

            <td><b>T</b></td>

            <td>Temperatura</td>

            <td>K</td>

        </tr>

        <tr>

            <td><b>V₁</b></td>

            <td>Volumen inicial</td>

            <td>m³</td>

        </tr>

        <tr>

            <td><b>V₂</b></td>

            <td>Volumen final</td>

            <td>m³</td>

        </tr>

    </table>

    <hr>

    <h3>Ingrese los datos</h3>

    <label><b>Moles</b></label>

    <input id="moles" type="number">

    <select id="unidadMoles">

        <option value="mol">mol</option>

        <option value="kmol">kmol</option>

    </select>

    <br><br>

    <label><b>Temperatura</b></label>

    <input id="temperatura" type="number">

    <select id="unidadTemperatura">

        <option value="K">K</option>

        <option value="°C">°C</option>

    </select>

    <br><br>

    <label><b>Volumen inicial</b></label>

    <input id="volumenInicial" type="number">

    <select id="unidadVolumenInicial">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Volumen final</b></label>

    <input id="volumenFinal" type="number">

    <select id="unidadVolumenFinal">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Unidad del resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button onclick="calcularTrabajoIsotermico()">

        Calcular

    </button>

    <button onclick="trabajo()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//========================================
// TRABAJO ADIABÁTICO
//========================================

function trabajoAdiabatico() {

    contenido.innerHTML = `

    <h2>🔥 Trabajo Adiabático</h2>

    <hr>

    <h3>📖 ¿Qué es un proceso adiabático?</h3>

    <p>

    Un proceso adiabático es aquel en el que no existe
    transferencia de calor entre el sistema y los alrededores.

    Durante el proceso se cumple:

    </p>

    <h2>

    Q = 0

    </h2>

    <p>

    Por lo tanto, el cambio de energía del sistema ocurre
    únicamente debido al trabajo realizado.

    </p>

    <hr>

    <h3>📐 Desarrollo</h3>

    <p>

    Primera Ley de la Termodinámica

    </p>

    <p>

    ΔU = Q − W

    </p>

    <p>

    Como Q = 0

    </p>

    <p>

    ΔU = −W

    </p>

    <p>

    Para un proceso adiabático reversible:

    </p>

    <h2>

    W = (P₂V₂ − P₁V₁)/(1 − γ)

    </h2>

    <hr>

    <h3>📚 Variables</h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">Variable</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td>P₁</td>

            <td>Presión inicial</td>

            <td>Pa</td>

        </tr>

        <tr>

            <td>P₂</td>

            <td>Presión final</td>

            <td>Pa</td>

        </tr>

        <tr>

            <td>V₁</td>

            <td>Volumen inicial</td>

            <td>m³</td>

        </tr>

        <tr>

            <td>V₂</td>

            <td>Volumen final</td>

            <td>m³</td>

        </tr>

        <tr>

            <td>γ</td>

            <td>Cp/Cv</td>

            <td>-</td>

        </tr>

    </table>

    <hr>

    <h3>Ingrese los datos</h3>

    <label><b>Presión inicial</b></label>

    <input id="presionInicial" type="number">

    <select id="unidadPresionInicial">

        <option value="Pa">Pa</option>

        <option value="kPa">kPa</option>

        <option value="MPa">MPa</option>

        <option value="bar">bar</option>

        <option value="atm">atm</option>

        <option value="mmHg">mmHg</option>

    </select>

    <br><br>

    <label><b>Presión final</b></label>

    <input id="presionFinal" type="number">

    <select id="unidadPresionFinal">

        <option value="Pa">Pa</option>

        <option value="kPa">kPa</option>

        <option value="MPa">MPa</option>

        <option value="bar">bar</option>

        <option value="atm">atm</option>

        <option value="mmHg">mmHg</option>

    </select>

    <br><br>

    <label><b>Volumen inicial</b></label>

    <input id="volumenInicial" type="number">

    <select id="unidadVolumenInicial">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Volumen final</b></label>

    <input id="volumenFinal" type="number">

    <select id="unidadVolumenFinal">

        <option value="m3">m³</option>

        <option value="L">L</option>

        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>γ (Cp/Cv)</b></label>

    <input id="gamma" type="number" step="0.01">

    <small>

    Aire ≈ 1.40 &nbsp;&nbsp; Helio ≈ 1.66 &nbsp;&nbsp;
    Argón ≈ 1.67 &nbsp;&nbsp;
    Vapor ≈ 1.33

    </small>

    <br><br>

    <label><b>Unidad del resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button onclick="calcularTrabajoAdiabatico()">

        Calcular

    </button>

    <button onclick="trabajo()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//========================================
// TRABAJO POLITRÓPICO
//========================================

function trabajoPolitropico() {

    contenido.innerHTML = `

    <h2>⚙ Trabajo Politrópico</h2>

    <hr>

    <h3>📖 ¿Qué es un proceso politrópico?</h3>

    <p>

    Un proceso politrópico es una transformación que cumple la relación

    </p>

    <h2>

    PVⁿ = Constante

    </h2>

    <p>

    Dependiendo del valor del exponente n, este proceso puede representar
    diferentes transformaciones termodinámicas.

    </p>

    <hr>

    <h3>📐 Ecuación</h3>

    <h2>

    W = (P₂V₂ − P₁V₁)/(1 − n)

    </h2>

    <hr>

    <h3>📚 Variables</h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">Variable</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td>P₁</td>

            <td>Presión inicial</td>

            <td>Pa</td>

        </tr>

        <tr>

            <td>P₂</td>

            <td>Presión final</td>

            <td>Pa</td>

        </tr>

        <tr>

            <td>V₁</td>

            <td>Volumen inicial</td>

            <td>m³</td>

        </tr>

        <tr>

            <td>V₂</td>

            <td>Volumen final</td>

            <td>m³</td>

        </tr>

        <tr>

            <td>n</td>

            <td>Índice politrópico</td>

            <td>-</td>

        </tr>

    </table>

    <hr>

    <h3>Valores típicos de n</h3>

    <ul>

        <li>n = 0 → Isobárico</li>

        <li>n = 1 → Isotérmico</li>

        <li>n = γ → Adiabático</li>

        <li>n → ∞ → Isocórico</li>

    </ul>

    <hr>

    <h3>Ingrese los datos</h3>

    <label><b>Presión inicial</b></label>

    <input id="presionInicial" type="number">

    <select id="unidadPresionInicial">

        <option value="Pa">Pa</option>
        <option value="kPa">kPa</option>
        <option value="MPa">MPa</option>
        <option value="bar">bar</option>
        <option value="atm">atm</option>
        <option value="mmHg">mmHg</option>

    </select>

    <br><br>

    <label><b>Presión final</b></label>

    <input id="presionFinal" type="number">

    <select id="unidadPresionFinal">

        <option value="Pa">Pa</option>
        <option value="kPa">kPa</option>
        <option value="MPa">MPa</option>
        <option value="bar">bar</option>
        <option value="atm">atm</option>
        <option value="mmHg">mmHg</option>

    </select>

    <br><br>

    <label><b>Volumen inicial</b></label>

    <input id="volumenInicial" type="number">

    <select id="unidadVolumenInicial">

        <option value="m3">m³</option>
        <option value="L">L</option>
        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Volumen final</b></label>

    <input id="volumenFinal" type="number">

    <select id="unidadVolumenFinal">

        <option value="m3">m³</option>
        <option value="L">L</option>
        <option value="cm3">cm³</option>

    </select>

    <br><br>

    <label><b>Índice politrópico (n)</b></label>

    <input id="n" type="number" step="0.01">

    <br><br>

    <label><b>Unidad del resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button onclick="calcularTrabajoPolitropico()">

        Calcular

    </button>

    <button onclick="trabajo()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//========================================
// MENÚ CALOR
//========================================

function calor() {

    contenido.innerHTML = `

    <h2>🔥 Calor</h2>

    <p>

    Seleccione el tipo de cálculo que desea realizar.

    </p>

    <div class="lista">

        <div class="item"

        onclick="calorSensible()">

            🔥 Calor Sensible

            <br>

            <small>

            Cambio de temperatura

            </small>

        </div>

        <div class="item"

        onclick="calorLatente()">

            ❄ Calor Latente

            <br>

            <small>

            Cambio de fase

            </small>

        </div>

        <div class="item">

            ⚙ Primera Ley

            <br>

            <small>

            Q = ΔU + W

            </small>

        </div>

    </div>

    <br>

    <button onclick="gasIdeal()">

        ← Volver

    </button>

    `;

}
//========================================
// CALCULAR CALOR LATENTE
//========================================

function calcularCalorLatente() {

    let masa = parseFloat(document.getElementById("masa").value);

    let latente = parseFloat(document.getElementById("latente").value);

    let unidadMasa = document.getElementById("unidadMasa").value;

    let unidadLatente = document.getElementById("unidadLatente").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (isNaN(masa) || isNaN(latente)) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    if (unidadMasa == "g") {

        masa = masa / 1000;

    }

    if (unidadLatente == "kJ") {

        latente = latente * 1000;

    }

    //----------------------------------
    // Cálculo
    //----------------------------------

    const calorJ = masa * latente;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    let calorFinal = calorJ;

    if (unidadResultado == "kJ") {

        calorFinal = calorJ / 1000;

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Procedimiento</h3>

        <p>

        Q = mL

        </p>

        <hr>

        <h3>Conversión al SI</h3>

        <p>Masa = ${masa.toFixed(4)} kg</p>

        <p>Calor latente = ${latente.toFixed(2)} J/kg</p>

        <hr>

        <h3>Sustitución</h3>

        <p>

        Q = (${masa.toFixed(4)}) × (${latente.toFixed(2)})

        </p>

        <hr>

        <h2>

        ${calorFinal.toFixed(3)} ${unidadResultado}

        </h2>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        Esta es la energía necesaria para producir el cambio de fase de la masa especificada.

        </p>

    `;

}