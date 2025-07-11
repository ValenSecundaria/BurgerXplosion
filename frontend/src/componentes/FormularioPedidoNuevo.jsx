import React, { useState, useEffect } from 'react';
import './FormularioPedidoNuevo.css';
import CompletarCampos from './CompletarCampos';

function FormularioPedidoNuevo({ cerrarFormularioNuevo, onSubmit, mostrarAlerta, mostrarResultadoOperacion }) {
  const [opciones, setOpciones] = useState({ hamburguesas: [], papas: [], bebidas: [] });

  const [pedido, setPedido] = useState({
    nombreCliente: '',
    emailCliente: '',
    telefonoCliente: '',
    direccionCliente: '',
    hamburguesas: [{ nombre: '', cantidad: 1 }],
    papas: [],
    bebidas: [],
    id: 0
  });
  
  const [mensajeError, setMensajeError] = useState(false);

  const cargarPedido = async () => {

    if (
      pedido.nombreCliente.trim() === '' ||
      pedido.telefonoCliente.trim() === '' ||
      pedido.direccionCliente.trim() === ''
    ) {
      mostrarAlerta("⚠️ Completá todos los campos del cliente.");
      return;
    }

    const tienePedido = 
      pedido.hamburguesas.some(h => h.nombre.trim() !== '') ||
      pedido.papas.some(p => p.nombre.trim() !== '') ||
      pedido.bebidas.some(b => b.nombre.trim() !== '');

    if (!tienePedido) {
      mostrarAlerta("⚠️ Seleccioná al menos un producto.");
      return;
    }

    const nuevoPedido = {
      nombreCliente: pedido.nombreCliente,
      emailCliente: pedido.emailCliente,
      telefonoCliente: pedido.telefonoCliente,
      direccionCliente: pedido.direccionCliente,
      hamburguesas: pedido.hamburguesas.map(item => ({ nombre: item.nombre, cantidad: item.cantidad })),
      papas: pedido.papas.map(item => ({ nombre:item.nombre, cantidad: item.cantidad })),
      bebidas: pedido.bebidas.map(item => ({ nombre:item.nombre, cantidad: item.cantidad })),
      id: 0
    };
    
    console.log(nuevoPedido);

    try {
      const response = await fetch('https://burgerxplosion.onrender.com/api/pedidos/crearPedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });
      if (response.ok) {
        const data = await response.json();
        onSubmit(data);
        mostrarResultadoOperacion("✅ Pedido creado.");
      } else {
        mostrarAlerta('❌ Error al enviar pedido');
      }
    } catch (error) {
      console.error('❌ Error en la conexión:', error);
    }
  };

  useEffect(() => {
    const traerOpciones = async () => {
      try {
        const response = await fetch('https://burgerxplosion.onrender.com/api/opciones');
        if (response.ok) {
          const data = await response.json();
          setOpciones(data);
        } else {
          console.error('❌ Error al cargar las opciones');
        }
      } catch (error) {
        console.error('❌ Error en la conexión al cargar opciones:', error);
      }
    };
    traerOpciones();
  }, []);

  const cerrarAdvertencia = async () => {
    setMensajeError(false);
  }

  return (
    <div className='overlay'>
      <div className='popup-formulario-pedido'>
        <h2>Nuevo Pedido</h2>
        <div className="formulario-contenido">

        {mensajeError && <CompletarCampos onVolver={cerrarAdvertencia} />}

          <div className="grupo-campos">
          <h3>Datos Cliente:</h3>
            <input type="text" placeholder="Nombre y apellido" value={pedido.nombreCliente}
              onChange={(e) => setPedido({ ...pedido, nombreCliente: e.target.value })}
            />
            <input type="email" placeholder="Email" value={pedido.emailCliente}
              onChange={(e) => setPedido({ ...pedido, emailCliente: e.target.value })}
            />
            <input 
              type="tel" 
              placeholder="Número de teléfono" 
              value={pedido.telefonoCliente}
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/[^0-9]/g, '');
                setPedido({ ...pedido, telefonoCliente: soloNumeros });
              }}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              pattern="[0-9]*"
            />
            <input type="text" placeholder="Direccion" value={pedido.direccionCliente}
              onChange={(e) => setPedido({ ...pedido, direccionCliente: e.target.value })}
            />
          </div>
          

          <div className="grupo-campos">
              <label>Hamburguesas:</label>

              {pedido.hamburguesas.map((item, index) => (
                <div key={index} className="item-hamburguesa">
                  <select
                    value={item.nombre}
                    onChange={(e) => {
                      const nuevasHamburguesas = [...pedido.hamburguesas];
                      nuevasHamburguesas[index].nombre = e.target.value;
                      setPedido({ ...pedido, hamburguesas: nuevasHamburguesas });
                    }}
                  >
                    <option value="">Seleccionar</option>
                    {opciones.hamburguesas.map((h, i) => (
                      <option key={i} value={h}>{h}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevasHamburguesas = [...pedido.hamburguesas];
                      nuevasHamburguesas[index].cantidad = parseInt(e.target.value);
                      setPedido({ ...pedido, hamburguesas: nuevasHamburguesas });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const nuevasHamburguesas = pedido.hamburguesas.filter((_, i) => i !== index);
                      setPedido({ ...pedido, hamburguesas: nuevasHamburguesas });
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setPedido({
                    ...pedido,
                    hamburguesas: [...pedido.hamburguesas, { nombre: '', cantidad: 1 }]
                  });
                }}
              >
                + Agregar hamburguesa
              </button>
            </div>


            <div className="grupo-campos">
              <label>Papas:</label>

              {pedido.papas.map((item, index) => (
                <div key={index} className="item-hamburguesa">
                  <select
                    value={item.nombre}
                    onChange={(e) => {
                      const nuevasPapas = [...pedido.papas];
                      nuevasPapas[index].nombre = e.target.value;
                      setPedido({ ...pedido, papas: nuevasPapas});
                    }}
                  >
                    <option value="">Seleccionar</option>
                    {opciones.papas.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevasPapas = [...pedido.papas];
                      nuevasPapas[index].cantidad = parseInt(e.target.value);
                      setPedido({ ...pedido, papas: nuevasPapas });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const nuevasPapas = pedido.papas.filter((_, i) => i !== index);
                      setPedido({ ...pedido, papas: nuevasPapas });
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setPedido({
                    ...pedido,
                    papas: [...pedido.papas, { nombre: '', cantidad: 1 }]
                  });
                }}
              >
                + Agregar Papas
              </button>
            </div>

          <div className="grupo-campos">
              <label>Bebidas:</label>

              {pedido.bebidas.map((item, index) => (
                <div key={index} className="item-hamburguesa">
                  <select
                    value={item.nombre}
                    onChange={(e) => {
                      const nuevasBebidas = [...pedido.bebidas];
                      nuevasBebidas[index].nombre = e.target.value;
                      setPedido({ ...pedido, bebidas: nuevasBebidas });
                    }}
                  >
                    <option value="">Seleccionar</option>
                    {opciones.bebidas.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevasBebidas = [...pedido.bebidas];
                      nuevasBebidas[index].cantidad = parseInt(e.target.value);
                      setPedido({ ...pedido, bebidas: nuevasBebidas });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const nuevasBebidas = pedido.bebidas.filter((_, i) => i !== index);
                      setPedido({ ...pedido, bebidas: nuevasBebidas });
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setPedido({
                    ...pedido,
                    bebidas: [...pedido.bebidas, { nombre: '', cantidad: 1 }]
                  });
                }}
              >
                + Agregar bebida
              </button>
            </div>


        </div>

        <div className='contenedor-botones'>
          <button type="submit" className="boton-pedido" onClick={cargarPedido}>Enviar</button>
          <button type="button" className="boton-pedido-cancelar" onClick={cerrarFormularioNuevo}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default FormularioPedidoNuevo;
