import React from "react";  
import "./MenuBotones.css";
import burgerBlur from '../assets/burger.png';

import { FaTrash, FaPlus, FaEye, FaEdit } from "react-icons/fa";

function MenuBotones({ onNuevoPedido, onObtenerMensaje, onVerPedidos, onModificarPedidos }) {
    
    return (
        <div className="menu-botones">
            <div className="boton" id="botonNuevoPedido" alt="Nuevo Pedido" onClick={onNuevoPedido}>
                <FaPlus className="icono" /> Nuevo pedido
            </div>
            <div className="boton" id="botonEliminarPedido" alt="Eliminar Pedido" onClick={onObtenerMensaje}>
                <FaTrash className="icono" /> Eliminar Pedido
            </div>
            <div className="boton" id="botonVerPedidos" alt="Ver Pedido" onClick={onVerPedidos}>
                <FaEye className="icono" /> Ver Pedido
            </div>
            <div className="boton" id="botonModificarPedidos" alt="Modificar Pedido" onClick={onModificarPedidos}>
                <FaEdit className="icono" /> Modificar Pedido
            </div>
            <div className="ImagenLogo">
                <img className="imagen-logo" alt="Logo" src={burgerBlur} />
            </div>
        </div>
    );
}

export default MenuBotones;
