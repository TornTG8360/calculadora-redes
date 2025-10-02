
import React from "react";
import "./styles.css";
import InputIP from "./InputIP";
import InputMascara from "./InputMascara";
import ResultadosIP from "./ResultadosIP";

function Calculadora() {
    let [inputIP, setInputIP] = React.useState("");
    let [inputMascara, setInputMascara] = React.useState("");
    let [resultado, setResultado] = React.useState(null);

    // Las funciones de comprobación ahora están en los componentes hijos

    function obtenerClaseIP(primerOcteto) {
        if (primerOcteto >= 1 && primerOcteto <= 126) return "A";
        if (primerOcteto >= 128 && primerOcteto <= 191) return "B";
        if (primerOcteto >= 192 && primerOcteto <= 223) return "C";
        if (primerOcteto >= 224 && primerOcteto <= 239) return "D";
        if (primerOcteto >= 240 && primerOcteto <= 255) return "E";
        return "No válida";
    }

    function convertirOctetosABinario(octetos) {
        // Convertir cada octeto a su representación binaria
        let binarios = octetos.map(octeto => {
            // Convertir a número y obtener representación binaria
            let bin = parseInt(octeto).toString(2);
            // Rellenar con ceros a la izquierda hasta tener 8 bits
            return bin.padStart(8, '0');
        });
        
        // Unir todos los octetos en una sola cadena binaria
        return binarios.join('');
    }

    function convertirBinarioADecimal(binario) {
        const octetos = [];
        // Separar la cadena binaria en grupos de 8 bits
        for(let i = 0; i < 32; i += 8) {
            const octeto = parseInt(binario.substr(i, 8), 2);
            octetos.push(octeto);
        }
        return octetos.join('.');
    }

    function esIPPrivada(ip) {
        const octetos = ip.split('.');
        if (octetos.length !== 4) return false;

        const primerOcteto = parseInt(octetos[0]);
        const segundoOcteto = parseInt(octetos[1]);
        
        // Clase A: 10.0.0.0 - 10.255.255.255
        if (primerOcteto === 10) {
            return true;
        }

        // Clase B: 172.16.0.0 - 172.31.255.255
        if (primerOcteto === 172 && 
            segundoOcteto >= 16 && 
            segundoOcteto <= 31) {
            return true;
        }

        // Clase C: 192.168.0.0 - 192.168.255.255
        if (primerOcteto === 192 && 
            segundoOcteto === 168) {
            return true;
        }

        // Link-local: 169.254.0.0 - 169.254.255.255
        if (primerOcteto === 169 && 
            segundoOcteto === 254) {
            return true;
        }

        // Loopback: 127.0.0.0 - 127.255.255.255
        if (primerOcteto === 127) {
            return true;
        }

        return false;
    }

    function visualizarRedBinaria(ipBinario, mascaraBinaria) {
        const ip = ipBinario.slice(0, 32);
        const mascara = mascaraBinaria.slice(0, 32);
        
        const octetos = ip.match(/.{8}/g);
        
        // Encontrar la posición donde comienza la parte de host
        const posicionHost = mascara.indexOf('0');
        
        return {
            ipCompleta: octetos.map((octeto, index) => {
                // Calcular la posición inicial de este octeto en bits
                const posInicial = index * 8;
                const posFinal = posInicial + 8;
                
                // Si este octeto contiene la transición de red a host
                if (posicionHost >= posInicial && posicionHost < posFinal) {
                    const splitPos = posicionHost % 8;
                    return (
                        <span key={index}>
                            <span className="red-portion">{octeto.substring(0, splitPos)}</span>
                            <span className="host-portion">{octeto.substring(splitPos)}</span>
                        </span>
                    );
                }
                // Si el octeto está completamente en la porción de red
                else if (posInicial < posicionHost) {
                    return <span key={index} className="red-portion">{octeto}</span>;
                }
                // Si el octeto está completamente en la porción de host
                else {
                    return <span key={index} className="host-portion">{octeto}</span>;
                }
            })
        };
    }

    function calcular() {
        let partesIP = inputIP.split(".");
        let partesMascara = inputMascara.split(".");

        // Validar que cada octeto esté en el rango correcto
        for (let i = 0; i < partesIP.length; i++) {
            const octeto = parseInt(partesIP[i]);
            
            // Verificar que sea un número válido y esté en el rango 0-255
            if (isNaN(octeto) || octeto < 0 || octeto > 255) {
                alert(`El octeto ${i + 1} de la IP no es válido. Debe ser un número entre 0 y 255.`);
                return;
            }

            // Verificar que no haya números con ceros a la izquierda (excepto el 0)
            if (partesIP[i].length > 1 && partesIP[i][0] === '0') {
                alert(`El octeto ${i + 1} de la IP no puede tener ceros a la izquierda.`);
                return;
            }
        }

        for (let i = 0; i < partesMascara.length; i++) {
            const octeto = parseInt(partesMascara[i]);
            
            // Verificar que sea un número válido y esté en el rango 0-255
            if (isNaN(octeto) || octeto < 0 || octeto > 255) {
                alert(`El octeto ${i + 1} de la máscara no es válido. Debe ser un número entre 0 y 255.`);
                return;
            }

            // Verificar que no haya números con ceros a la izquierda (excepto el 0)
            if (partesMascara[i].length > 1 && partesMascara[i][0] === '0') {
                alert(`El octeto ${i + 1} de la máscara no puede tener ceros a la izquierda.`);
                return;
            }
        }
        
        console.log("La dirección IP y la máscara son válidas");

        const ipBinario = convertirOctetosABinario(partesIP);
        const mascaraBinario = convertirOctetosABinario(partesMascara);

        // Realizar operaciones AND y OR a nivel de bits
        let redBinaria = '';
        let broadcastBinaria = '';
        
        for(let i = 0; i < 32; i++) {
            // Calcular dirección de red (AND)
            redBinaria += (ipBinario[i] === '1' && mascaraBinario[i] === '1') ? '1' : '0';
            
            // Calcular broadcast (OR con NOT máscara)
            broadcastBinaria += (mascaraBinario[i] === '1') ? redBinaria[i] : '1';
        }

        // Convertir resultados a formato decimal
        const ipRed = convertirBinarioADecimal(redBinaria);
        const ipBroadcast = convertirBinarioADecimal(broadcastBinaria);

        // Calcular primera y última IP útil
        const primeraIPBinaria = redBinaria.slice(0, -1) + '1';
        const ultimaIPBinaria = broadcastBinaria.slice(0, -1) + '0';

        const primeraIP = convertirBinarioADecimal(primeraIPBinaria);
        const ultimaIP = convertirBinarioADecimal(ultimaIPBinaria);

        // Calcular hosts (utilizando la máscara)
        const unosEnMascara = mascaraBinario.split('1').length - 1;
        const hosts = Math.pow(2, 32 - unosEnMascara) - 2;

        const representacionBinaria = visualizarRedBinaria(ipBinario, mascaraBinario);
        
        setResultado({
            ipRed,
            ipBroadcast,
            hosts,
            rangoUtil: `${primeraIP} - ${ultimaIP}`,
            clase: obtenerClaseIP(parseInt(partesIP[0])),
            esPrivada: esIPPrivada(inputIP),
            representacionBinaria: representacionBinaria
        });
    }

    function limpiar() {
        setInputIP("");
        setInputMascara("");
        setResultado(null);
    }

    return (
        <div className="calculadora">
            <h1 className="titulo-principal">Calculadora de Direcciones IP</h1>
            <div className="input-group">
                <InputIP value={inputIP} onChange={setInputIP} />
                <InputMascara value={inputMascara} onChange={setInputMascara} />
                <button onClick={calcular}>Calcular</button>
                <button onClick={limpiar} style={{marginLeft: '10px'}}>Limpiar</button>
            </div>
            <ResultadosIP resultado={resultado} />
        </div>
    );
}

export default Calculadora;