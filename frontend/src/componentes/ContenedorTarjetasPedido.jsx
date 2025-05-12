import React from "react";
import "./ContenedorTarjetasPedido.css";

function ContenedorTarjetasPedido({ children }) {
    const hayPedidos = React.Children.count(children) > 0;

    return (
        <div className="contenedor-tarjetas-pedido">
            <div className="contenedor-pedidos">
                {hayPedidos ? (
                    children
                ) : (
                    <div className="mensaje-vacio">
                        <p>🛒 No hay pedidos por ahora</p>
                        <span>¡Cuando lleguen, los verás aquí!</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContenedorTarjetasPedido;
