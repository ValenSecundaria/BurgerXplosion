
import React from "react";
import "./OperacionExitosa.css";

function OperacionExitosa({ mensaje }) {
    return (
        <div className="alerta-exit">
            {mensaje || "Operacion exitosa."}
        </div>
    );
}

export default OperacionExitosa;

