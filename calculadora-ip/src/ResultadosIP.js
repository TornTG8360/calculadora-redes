import React from "react";

function ResultadosIP({ resultado }) {
    if (!resultado) return null;
    return (
        <div className="resultados">
            <h3>Resultados:</h3>
            <p><strong>IP de Red:</strong> {resultado.ipRed}</p>
            <p><strong>IP de Broadcast:</strong> {resultado.ipBroadcast}</p>
            <p><strong>Cantidad de IPs útiles:</strong> {resultado.hosts}</p>
            <p><strong>Rango de IPs útiles:</strong> {resultado.rangoUtil}</p>
            <p><strong>Clase de IP:</strong> {resultado.clase}</p>
            <p><strong>Tipo de IP:</strong> {resultado.esPrivada ? 'Privada' : 'Pública'}</p>
            <div className="representacion-binaria">
                <h4>Representación Binaria:</h4>
                <div className="binario-container">
                    {resultado.representacionBinaria.ipCompleta.map((octeto, index) => (
                        <React.Fragment key={`fragment-${index}`}>
                            {octeto}
                            {index < 3 && <span className="separador">.</span>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="leyenda">
                    <span><span className="red-dot"></span> Porción de Red</span>
                    <span><span className="host-dot"></span> Porción de Host</span>
                </div>
            </div>
        </div>
    );
}

export default ResultadosIP;
