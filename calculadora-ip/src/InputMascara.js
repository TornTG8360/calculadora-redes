import React from "react";

function InputMascara({ value, onChange }) {
    function comprobarInputMascara(event) {
        // Solo permitir números y puntos
        const valor = event.target.value.replace(/[^0-9.]/g, '');
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
            />
        </div>
    );
}

export default InputMascara;
