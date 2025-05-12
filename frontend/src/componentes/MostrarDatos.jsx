import React from 'react';
import './MostrarDatos.css';
import estilos from './MostrarDatos.css?inline';

function MostrarDatos({ pedido , onVolver}) {

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
  
    const html = `
      <html>
        <head>
          <title>Imprimir Pedido</title>
          <style>
            ${estilos}
          </style>
        </head>
        <body>
          <div class="overlay">
            <div class="popup-datos-pedido">
              ${document.querySelector('.popup-datos-pedido').innerHTML}
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;
  
    printWindow.document.write(html);
    printWindow.document.close();
  };




  return (
    <div className='overlay'>
      <div className='popup-datos-pedido'>
        <h2>Detalles del Pedido #{pedido.id}</h2>
        
        <div className="datos-contenido">
          {/* Sección de datos del cliente */}
          <div className="seccion-datos">
            <h3>Datos del Cliente</h3>
            <div className="dato-item">
              <span className="dato-label">Nombre:</span>
              <span className="dato-valor">{pedido.nombreCliente || 'No especificado'}</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Email:</span>
              <span className="dato-valor">{pedido.emailCliente || 'No especificado'}</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Teléfono:</span>
              <span className="dato-valor">{pedido.telefonoCliente || 'No especificado'}</span>
            </div>
            <div className="dato-item">
              <span className="dato-label">Direccion:</span>
              <span className="dato-valor">{pedido.direccionCliente || 'No especificado'}</span>
            </div>
          </div>

          {/* Sección de hamburguesas */}
          <div className="seccion-datos">
            <h3>Hamburguesas</h3>
            {pedido.hamburguesa && pedido.hamburguesa.length > 0 ? (
              <ul className="lista-productos">
                {pedido.hamburguesa.map((hamburguesa, index) => (
                  <li key={index}>
                    {hamburguesa.nombre} - Cantidad: {hamburguesa.cantidad || pedido.cantidadHamburguesas || 10}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dato-item">No se seleccionaron hamburguesas</div>
            )}
          </div>

          {/* Sección de papas */}
          <div className="seccion-datos">
            <h3>Papas</h3>
            {pedido.papas && pedido.papas.length > 0 ? (
              <ul className="lista-productos">
                {pedido.papas.map((papa, index) => (
                  <li key={index}>
                    {papa.nombre} - Cantidad: {papa.cantidad || pedido.cantidadPapas || 1}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dato-item">No se seleccionaron papas</div>
            )}
          </div>

          {/* Sección de bebidas */}
          <div className="seccion-datos">
            <h3>Bebidas</h3>
            { pedido.bebida.length > 0 ? (
              <ul className="lista-productos">
                {pedido.bebida.map((bebida, index) => (
                  <li key={index}>
                    {bebida.nombre} - Cantidad: {bebida.cantidad || pedido.cantidadBebidas || 1}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dato-item">No se seleccionaron bebidas</div>
            )}
          </div>
          <button className="boton-pedido" onClick={handlePrint}>Imprimir</button>
          <button onClick={onVolver} style={{ marginTop: '20px' }}> Volver </button>
        </div>
      </div>
    </div>
  );
}

export default MostrarDatos;