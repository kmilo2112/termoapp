// js/conceptos.js
console.log("conceptos.js cargado con formato de ecuaciones");

//========================================
// BASE DE DATOS TEÓRICA (GLOSARIO)
//========================================
const glosarioTermo = {
    "Gas Ideal": {
        definicion: "Un gas ideal es un modelo teórico de gas cuyas moléculas se consideran partículas puntuales, de volumen despreciable y sin fuerzas de atracción o repulsión intermoleculares.",
        conceptos: {
            "Presión": { 
                ecuacion: "P = \\frac{nRT}{V}",
                variables: {
                    "P": "Presión absoluta del gas (Pa, atm, bar).",
                    "n": "Número de moles de la sustancia (mol).",
                    "R": "Constante universal de los gases ideales.",
                    "T": "Temperatura absoluta (K o R).",
                    "V": "Volumen total ocupado (m³ o L)."
                },
                def: "La presión es una propiedad intensiva que representa la fuerza normal ejercida por un fluido sobre una superficie por unidad de área." 
            },
            "Volumen": { 
                ecuacion: "V = \\frac{nRT}{P}",
                variables: {
                    "V": "Volumen total ocupado.",
                    "n": "Número de moles.",
                    "R": "Constante universal.",
                    "T": "Temperatura absoluta.",
                    "P": "Presión absoluta."
                },
                def: "El volumen es una propiedad extensiva que corresponde al espacio ocupado por un sistema o sustancia." 
            },
            "Temperatura": { 
                ecuacion: "T = \\frac{PV}{nR}",
                variables: {
                    "T": "Temperatura absoluta.",
                    "P": "Presión absoluta.",
                    "V": "Volumen.",
                    "n": "Número de moles.",
                    "R": "Constante universal."
                },
                def: "La temperatura es una propiedad intensiva que indica el estado térmico de un sistema y determina el sentido de la transferencia de calor." 
            }
            ,
            "Número de moles": {
                ecuacion: "n = \\frac{m}{M} \\quad \\text{o} \\quad n = \\frac{PV}{RT}",
                variables: {
                    "n": "Número de moles de la sustancia (mol).",
                    "m": "Masa total de la sustancia (g o kg).",
                    "M": "Masa molar o peso molecular (g/mol o kg/kmol).",
                    "P, V, T, R": "Presión, Volumen, Temperatura y Constante del gas."
                },
                def: "El número de moles es una medida de la cantidad de sustancia. En los gases ideales, permite relacionar la masa del gas con su comportamiento térmico y de presión de manera uniforme."
            }
            ,
            "Trabajo": {
                def: "El trabajo es una forma de transferencia de energía entre un sistema y sus alrededores, asociada a la acción de una fuerza o un cambio de volumen.",
                subtemas: {
                    "Trabajo Isobárico": "W = P(V₂ - V₁). Proceso a presión constante.",
                    "Trabajo Isocórico": "W = 0. Proceso a volumen constante.",
                    "Trabajo Isotérmico": "W = nRT ln(V₂/V₁). Proceso a temperatura constante.",
                    "Trabajo Adiabático": "Q = 0. No hay transferencia de calor con el entorno."
                }
            }
            ,
            "Calor": {
                def: "El calor es la energía que se transfiere entre un sistema y sus alrededores exclusivamente como consecuencia de una diferencia de temperatura.",
                subtemas: {
                    "Calor Sensible": "Q = mcΔT. Produce cambio de temperatura sin modificar estado de agregación.",
                    "Calor Latente": "Q = mL. Produce cambio de fase a temperatura constante.",
                    "Primera Ley": "ΔU = Q - W. Conservación de la energía."
                }
            }
            ,
            "Energía Interna": {
                ecuacion: "\\Delta U = n C_v \\Delta T = n C_v (T_2 - T_1)",
                variables: {
                    "\\Delta U": "Cambio en la energía interna (J).",
                    "n": "Número de moles (mol).",
                    "C_v": "Capacidad calorífica molar a volumen constante (J/mol·K).",
                    "T_1, T_2": "Temperaturas inicial y final (K)."
                },
                def: "La energía interna es la suma de todas las energías cinéticas microscópicas de las partículas del gas. Para un gas ideal de Joule, esta propiedad depende única y exclusivamente de su temperatura."
            }
            ,
            "Entalpía": {
                ecuacion: "\\Delta H = \\Delta U + \\Delta(PV) = n C_p \\Delta T",
                variables: {
                    "\\Delta H": "Cambio en la entalpía (J).",
                    "n": "Número de moles (mol).",
                    "C_p": "Capacidad calorífica molar a presión constante (J/mol·K).",
                    "\\Delta T": "Diferencia de temperatura (K)."
                },
                def: "La entalpía es una propiedad termodinámica que representa la energía total de un sistema, combinando su energía interna y el trabajo de flujo (PV). En un gas ideal, al igual que la energía interna, depende exclusivamente de la temperatura."
            }
            ,
            "Entropía": {
                ecuacion: "\\Delta S = n C_p \\ln\\left(\\frac{T_2}{T_1}\\right) - n R \\ln\\left(\\frac{P_2}{P_1}\\right)",
                variables: {
                    "\\Delta S": "Cambio en la entropía (J/K).",
                    "n": "Número de moles (mol).",
                    "C_p": "Capacidad calorífica a presión constante.",
                    "T_1, T_2": "Temperaturas inicial y final (K).",
                    "P_1, P_2": "Presiones inicial y final.",
                    "R": "Constante universal de los gases."
                },
                def: "La entropía es una propiedad termodinámica que cuantifica el grado de dispersión de la energía de un sistema y constituye un criterio para establecer la dirección natural de los procesos."
            }
            ,
            "Energía libre de Gibbs": {
                ecuacion: "\\Delta G = \\Delta H - T \\Delta S",
                variables: {
                    "\\Delta G": "Cambio en la energía libre de Gibbs (J).",
                    "\\Delta H": "Cambio de entalpía en el proceso (J).",
                    "T": "Temperatura absoluta a la que ocurre el proceso (K).",
                    "\\Delta S": "Cambio de entropía en el proceso (J/K)."
                },
                def: "La energía libre de Gibbs es una función de estado que representa la energía máxima disponible para realizar trabajo útil (que no sea de expansión). Es el criterio principal para predecir si un proceso será espontáneo (cuando ΔG < 0)."
            }
            
        }
    },
    "Gas Real": {
        definicion: "Los gases reales son aquellos cuyas moléculas poseen volumen propio y experimentan fuerzas intermoleculares, desviándose del modelo ideal.",
        conceptos: {
            "Ecuación de Van der Waals": { 
                ecuacion: "\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT",
                variables: {
                    "P": "Presión del gas.",
                    "V": "Volumen del gas.",
                    "n": "Número de moles.",
                    "T": "Temperatura absoluta.",
                    "R": "Constante universal.",
                    "a": "Constante de corrección por fuerzas intermoleculares atractivas.",
                    "b": "Constante de corrección por el volumen de las moléculas (covolumen)."
                },
                def: "La ecuación de Van der Waals es una ecuación de estado para gases reales que incorpora correcciones al volumen molecular y a las fuerzas de atracción intermoleculares." 
            }
            ,
            "Ecuación Virial": { 
                ecuacion: "Z = \\frac{P \\bar{V}}{RT} = 1 + \\frac{B}{\\bar{V}} + \\frac{C}{\\bar{V}^2} + \\dots",
                variables: {
                    "Z": "Factor de compresibilidad.",
                    "P": "Presión absoluta.",
                    "\\bar{V}": "Volumen molar del gas (V/n).",
                    "R": "Constante universal de los gases.",
                    "T": "Temperatura absoluta.",
                    "B, C": "Segundo y tercer coeficiente virial (dependen de la temperatura y de las interacciones moleculares)."
                },
                def: "La ecuación virial es una expansión en serie de potencias teóricamente fundamentada que describe el comportamiento de los gases reales. El segundo coeficiente virial (B) representa las interacciones entre pares de moléculas, y el tercero (C) entre tríos." 
            }
            ,
            "Factor de compresibilidad": { 
                ecuacion: "Z = \\frac{PV}{nRT}",
                variables: {
                    "Z": "Factor de compresibilidad (adimensional).",
                    "P": "Presión.",
                    "V": "Volumen real.",
                    "n": "Número de moles.",
                    "R": "Constante universal.",
                    "T": "Temperatura."
                },
                def: "Es una propiedad que mide la desviación del comportamiento de un gas real respecto al gas ideal. Si Z=1, el gas se comporta idealmente." 
            }
        }
    },
    "Antoine": {
        definicion: "La ecuación de Antoine es una correlación empírica que relaciona la presión de vapor de una sustancia pura con su temperatura.",
        conceptos: {
            "Presión de vapor": { 
                ecuacion: "\\log_{10}(P) = A - \\frac{B}{T + C}",
                variables: {
                    "P": "Presión de vapor de la sustancia.",
                    "T": "Temperatura.",
                    "A, B, C": "Constantes de Antoine específicas para cada sustancia."
                },
                def: "La presión de vapor es la presión ejercida por el vapor de una sustancia cuando se encuentra en equilibrio termodinámico con su fase líquida o sólida." 
            }
            ,
            "Temperatura de saturación": { 
                ecuacion: "T_{sat} = \\frac{B}{A - \\log_{10}(P)} - C",
                variables: {
                    "T_{sat}": "Temperatura de saturación (hervor o condensación).",
                    "P": "Presión del sistema (presión de vapor).",
                    "A, B, C": "Constantes de Antoine específicas para la sustancia."
                },
                def: "La temperatura de saturación es la temperatura a la cual una sustancia pura cambia de fase (por ejemplo, hierve o se condensa) a una presión determinada. Despejando la ecuación de Antoine, podemos predecir a qué temperatura hervirá un fluido si conocemos la presión a la que está sometido el sistema." 
            }
        }
    }
};

//========================================
// MOTOR DE NAVEGACIÓN TEÓRICA
//========================================

function pantallaConceptos() {
    const contenido = document.getElementById("contenido");
    let html = `
        <h2>📖 Conceptos Teóricos</h2>
        <p>Selecciona una categoría para ver sus definiciones y ecuaciones.</p>
        <hr>
        <div class="lista">
    `;
    
    for (const categoria in glosarioTermo) {
        html += `<div class="item" onclick="mostrarCategoriaTeoria('${categoria}')"><b>📘 ${categoria}</b></div>`;
    }
    
    html += `
        </div>
        <br>
        <button onclick="inicio()">← Volver al Menú Principal</button>
    `;
    contenido.innerHTML = html;
}

function mostrarCategoriaTeoria(categoria) {
    const data = glosarioTermo[categoria];
    const contenido = document.getElementById("contenido");
    
    let html = `
        <h2>${categoria}</h2>
        <p style="text-align: justify; line-height: 1.5; color: #444; font-size: 0.95em;"><i>"${data.definicion}"</i></p>
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <div class="lista">
    `;

    for (const concepto in data.conceptos) {
        html += `<div class="item" onclick="mostrarLecturaConcepto('${categoria}', '${concepto}')">📄 <b>${concepto}</b></div>`;
    }

    html += `
        </div>
        <br>
        <button onclick="pantallaConceptos()">← Volver a Categorías</button>
    `;
    contenido.innerHTML = html;
}

function mostrarLecturaConcepto(categoria, concepto) {
    const dataConcepto = glosarioTermo[categoria].conceptos[concepto];
    const contenido = document.getElementById("contenido");
    
    let html = `<h2>${concepto}</h2>`;

    // Renderizar la ecuación si existe
    if (dataConcepto.ecuacion) {
        html += `
            <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; font-size: 1.1em; border-left: 5px solid #3498db; overflow-x: auto;">
                \\[ ${dataConcepto.ecuacion} \\]
            </div>
        `;
    }

    // Renderizar las variables si existen
    if (dataConcepto.variables) {
        html += `<h3 style="color: #2c3e50; font-size: 1.1em; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Variables:</h3>`;
        html += `<ul style="text-align: left; margin-bottom: 20px; color: #444; line-height: 1.6; padding-left: 20px; font-size: 0.95em;">`;
        for (const v in dataConcepto.variables) {
            html += `<li style="margin-bottom: 8px;"><b>\\(${v}\\)</b>: ${dataConcepto.variables[v]}</li>`;
        }
        html += `</ul>`;
    }

    // Renderizar Definición
    html += `
        <h3 style="color: #2c3e50; font-size: 1.1em; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Definición:</h3>
        <p style="text-align: justify; line-height: 1.6; color: #333; font-size: 1em; padding: 0 5px;">${dataConcepto.def}</p>
    `;

    // Renderizar Subtemas si existen
    if (dataConcepto.subtemas) {
        html += `<hr style="border: 1px dashed #ccc; margin: 15px 0;">`;
        html += `<h3 style="color: #2c3e50; font-size: 1.1em; margin-bottom: 10px;">Clasificación:</h3>`;
        html += `<ul style="text-align: justify; line-height: 1.6; color: #444; padding-left: 20px; font-size: 0.95em;">`;
        for (const subtema in dataConcepto.subtemas) {
            html += `<li style="margin-bottom: 10px;"><b>${subtema}:</b> ${dataConcepto.subtemas[subtema]}</li>`;
        }
        html += `</ul>`;
    }

    html += `
        <br>
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <button onclick="mostrarCategoriaTeoria('${categoria}')">← Volver a ${categoria}</button>
    `;
    
    // Inyectamos el contenido primero
    contenido.innerHTML = html;

    // --- ESTA ES LA LÍNEA VITAL QUE FALTA ---
    // Esto recarga el script de MathJax para procesar las nuevas fórmulas mostradas
    if (window.MathJax) {
        MathJax.typeset();
    }
    // --- FIN DE LA CORRECCIÓN ---
}