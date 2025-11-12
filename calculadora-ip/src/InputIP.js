import React from "react";

function InputIP({ value, onChange }) {
    function comprobarInputIP(event) {
        let valor = event.target.value.replace(/[^0-9.]/g, '');
        
        // Limitar a máximo 4 octetos
        const partes = valor.split('.');
        if (partes.length > 4) {
            valor = partes.slice(0, 4).join('.');
        }
        
        // Validar cada octeto
        valor = partes.map((octeto, index) => {
            // Si el octeto está vacío, dejarlo como está
            if (octeto === '') return '';
            
            // Convertir a número y validar que sea <= 255
            let num = parseInt(octeto);
            if (isNaN(num) || num < 0) return '0';
            if (num > 255) return '255';
            
            return num.toString();
        }).join('.');
        
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
                maxLength="15"
            />
        </div>
    );
}

export default InputIP;
