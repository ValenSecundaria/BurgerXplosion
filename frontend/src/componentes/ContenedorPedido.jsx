import React, { useEffect, useState } from 'react';
import './Contenedor.css';
import { motion } from 'framer-motion';

function Contenedor_de_pedido({pedido, estaSeleccionado, onSeleccionar}) {
  
  useEffect(() => {

    const obtener_pedidos = async () => {
      try {
        const response = await fetch('/api/pedidos/obtenerPedido', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtener_pedidos();

  }, []);

  return (
    <motion.div
      className={`contenedor-pedido ${estaSeleccionado ? 'seleccionado' : ''}`}
      animate={{
        rotate: estaSeleccionado ? 0 : 0,          
        backgroundColor: estaSeleccionado 
          ? "rgba(236, 236, 236, 0.42)"               
          : "#ffffff",                              
        scale: estaSeleccionado ? 1.02 : 1,
        border: estaSeleccionado ? "2px solid rgb(0, 0, 0)" : "2px solid rgb(0, 0, 0)",
        boxShadow: estaSeleccionado ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",           
      }}
      transition={{ duration: 0.4, type: "spring" }}  
    >
      <h3 className="titulo-pedido">Pedido {pedido.id}</h3>
      <ul>
        {pedido.hamburguesa.map((h, i) => (
          <li className="detalle-pedido" key={i}>{h.nombre} x{h.cantidad}</li>
        ))}
        {pedido.papas.map((h, i) => (
          <li className="detalle-pedido" key={i}>{h.nombre} x{h.cantidad}</li>
        ))}
        {pedido.bebida.map((h, i) => (
          <li className="detalle-pedido" key={i}>{h.nombre} x{h.cantidad}</li>
        ))} 
      </ul>
      <button className ='boton-seleccionar' onClick={() => onSeleccionar(pedido.id)}>
        Seleccionar
      </button>
    </motion.div>
  );
}

export default Contenedor_de_pedido;
