import './App.css'
import Fondo from './componentes/Fondo'
import ContenedorTarjetasPedido from './componentes/ContenedorTarjetasPedido'
import MenuBotones from './componentes/MenuBotones'
import ContenedorPedido from './componentes/ContenedorPedido'
import { useEffect, useState } from 'react'
import FormularioPedidoNuevo from './componentes/FormularioPedidoNuevo'
import FormularioModificarPedido from './componentes/FormularioModificarPedido'
import MostrarDatos from './componentes/MostrarDatos';
import CompletarCampos  from './componentes/CompletarCampos'  
import OperacionExitosa from './componentes/OperacionExitosa'

function App() {
  const[mostrarFormulario,setMostrarFormulario] = useState(false);
  const[pedidos,setPedidos] = useState([]);
  const[pedidoSeleccionado,setPedidoSeleccionado] = useState([]);
  const[mostrarPedido,setMostrarPedido] = useState(false);
  const[modificarFormulario,setModificarFormulario] = useState(false);
  const [pedidoMostrado, setPedidoMostrado] = useState(null);

  const [pedidoAEditar, setPedidoAEditar] = useState(null);
  const [completarCampos, setCompletarCampos] = useState(null);
  const [operacionExitosa, setOperacionExitosa] = useState(null);



  const agregarPedido = (pedido) =>{
    setPedidos([...pedidos,pedido]);
  }

  const seleccionarPedido = (id) =>{
    setPedidoSeleccionado(prev => 
      prev.includes(id) 
        ? prev.filter(pedidoId => pedidoId !== id)
        : [...prev, id] 
    );
  }

  const actualizarPedido = (pedido) =>{
    setPedidos(pedidos.map(p => p.id === pedido.id ? pedido : p));
  }

  const eliminarPedido = async() =>{
    if (pedidoSeleccionado.length === 0) {
      setCompletarCampos("⚠️ Seleccione 1 o varios pedidos.");
      setTimeout(() => setCompletarCampos(null), 3000);
      return;
    };
    try {
      await Promise.all(
        pedidoSeleccionado.map(async (id) => {
          await fetch(`/api/pedidos/eliminar/${id}`, {
            method: 'DELETE',
          });
        })
      );
      setPedidos(pedidos.filter(pedido => !pedidoSeleccionado.includes(pedido.id)));
      setPedidoSeleccionado([]);
      setOperacionExitosa("✅ Eliminacion exitosa.");
      setTimeout(() => setOperacionExitosa(null), 3000);

    } catch (error) {
      console.error("Error al eliminar pedidos:", error);
    }
  }

  const verPedido = async () =>{
    if (pedidoSeleccionado.length === 0 || pedidoSeleccionado.length > 1) {
      setCompletarCampos("⚠️ Seleccione 1 pedido.");
      setTimeout(() => setCompletarCampos(null), 3000);
      return;
    };

    try {
      const response = await fetch(`/api/pedidos/ver/${pedidoSeleccionado[0]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      setMostrarPedido(true);
      setPedidoMostrado(data[0]); 
    
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }

  }

  const modificarPedido = async () =>{

    if (pedidoSeleccionado.length === 0 || pedidoSeleccionado.length > 1) {
      setCompletarCampos("⚠️ Seleccione 1 pedido.");
      setTimeout(() => setCompletarCampos(null), 3000);
      return;
    };

    try {
      const response = await fetch(`https://burgerxplosion.onrender.com/api/pedidos/ver/${pedidoSeleccionado[0]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      console.log("Antes de hacer el fetch y abrir el form estoy aca")
      const data = await response.json();
      setPedidoAEditar(data);  
      setModificarFormulario(true);


    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }

  }

  const handleVolver = async () => {
    setMostrarPedido(false);
  }


  useEffect(() => {
  
      const obtener_pedidos = async () => {
        try {
          const response = await fetch('https://burgerxplosion.onrender.com/api/pedidos/obtenerPedido', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Error en la petición');
          }
          const data = await response.json();
          setPedidos(data);
  
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
  
      obtener_pedidos();
  
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        const obtener_pedidos = async () => {
          try {
            const response = await fetch('https://burgerxplosion.onrender.com/api/pedidos/obtenerPedido', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Error en la petición');
            }
            const data = await response.json();
            setPedidos(data);
    
          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
    
        obtener_pedidos();
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  


  return (
    <>
      <Fondo>
        <Fondo>
          {completarCampos && <CompletarCampos mensajeCompletar = {completarCampos}/>}
          {operacionExitosa && <OperacionExitosa mensaje = {operacionExitosa}/>}
        <div className='contenedor_principal'>
          <MenuBotones onNuevoPedido={() => setMostrarFormulario(true)} onObtenerMensaje ={eliminarPedido} onVerPedidos={verPedido} onModificarPedidos={modificarPedido}/> 
            {mostrarFormulario && <FormularioPedidoNuevo cerrarFormularioNuevo={() => setMostrarFormulario(false)} onSubmit={(pedido) => {agregarPedido(pedido);setMostrarFormulario(false)}}   mostrarAlerta={(mensaje) => {setCompletarCampos(mensaje);setTimeout(() => setCompletarCampos(null), 3000);}}
              mostrarResultadoOperacion={(mensaje) => {setOperacionExitosa(mensaje);setTimeout(() => setOperacionExitosa(null), 3000);}}/>}

            {mostrarPedido && pedidoMostrado && (<MostrarDatos pedido={pedidoMostrado} onVolver={handleVolver} />)}

            {modificarFormulario && (<FormularioModificarPedido  pedidoAEditar={pedidoAEditar} cerrarFormularioModificar={() => setModificarFormulario(false)} onSubmit={(pedido) =>{actualizarPedido(pedido);  setModificarFormulario(false)}}  mostrarAlerta={(mensaje) => {setCompletarCampos(mensaje);setTimeout(() => setCompletarCampos(null), 3000);}}
              mostrarResultadoOperacion={(mensaje) => {setOperacionExitosa(mensaje);setTimeout(() => setOperacionExitosa(null), 3000);}}/>)}
          <ContenedorTarjetasPedido>
            {pedidos.map((pedido) =>(
              <ContenedorPedido key={pedido.id} estaSeleccionado={pedidoSeleccionado.includes(pedido.id)} onSeleccionar={() => seleccionarPedido(pedido.id)} pedido={pedido}/>
            ))}
          </ContenedorTarjetasPedido>
        </div>
        </Fondo>
      </Fondo>
      
    </>
  )
}
export default App;
