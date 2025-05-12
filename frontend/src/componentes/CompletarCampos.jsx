
import React from "react";
import "./CompletarCampos.css";

function CompletarCampos({ mensajeCompletar }) {
    return (
        <div className="alerta-error">
            {mensajeCompletar || "Por favor complete todos los campos obligatorios y agregue al menos un producto."}
        </div>
    );
}

export default CompletarCampos;