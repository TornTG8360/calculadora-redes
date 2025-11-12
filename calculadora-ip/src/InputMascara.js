import React from "react";

function InputMascara({ value, onChange }) {
    function comprobarInputMascara(event) {
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
            <label>Máscara de red: </label>
            <input 
                type="text" 
                placeholder="Ej: 255.255.255.0"
                value={value}
                onChange={comprobarInputMascara}
                maxLength="15"
            />
        </div>
    );
}

export default InputMascara;
