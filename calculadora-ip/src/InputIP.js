import React from "react";

function InputIP({ value, onChange }) {
    function comprobarInputIP(event) {
        // Solo permitir números y puntos
        const valor = event.target.value.replace(/[^0-9.]/g, '');
        onChange(valor);
    }

    return (
        <div>
            <label>Dirección IP: </label>
            <input 
                type="text" 
                placeholder="Ej: 192.168.1.1"
                value={value}
                onChange={comprobarInputIP}
            />
        </div>
    );
}

export default InputIP;
