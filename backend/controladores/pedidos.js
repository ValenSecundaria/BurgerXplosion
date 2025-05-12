
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'burguerxplosion@gmail.com',
    pass: 'qesw zvcl egay zqlr'
  }
});

  let pedidos = [];
  let pedido_id = 0;
  
  exports.obtenerPedidos = (req, res) => {
    res.json(pedidos);
  };

  
  exports.crearPedido = (req, res) => {
    const nuevo_pedido = {
        nombreCliente: req.body.nombreCliente, 
        emailCliente: req.body.emailCliente,
        telefonoCliente: req.body.telefonoCliente,
        direccionCliente: req.body.direccionCliente,
        hamburguesa: req.body.hamburguesas || [],
        papas: req.body.papas || [],
        bebida: req.body.bebidas || [],
        id: pedido_id
    };
    pedidos.push(nuevo_pedido);
    const mailOptions = {
      from: 'burguerxplosion@gmail.com',
      to: nuevo_pedido.emailCliente,
      subject: `Confirmación de pedido de ${nuevo_pedido.nombreCliente}`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d35400;">Hola ${nuevo_pedido.nombreCliente} 👋</h2>
        <p>Gracias por tu pedido en Burguer Xplosion 🍔.</p>
        <p><strong>Tu número de orden es:</strong> <span style="font-size: 20px;">#${nuevo_pedido.id}</span></p>
        <p>Estamos preparando todo y estará listo para retirar muy pronto.</p>
        <p style="margin-top: 30px;">¡Te esperamos en 25'! 😊</p>
        <hr />
        <p style="font-size: 12px; color: #888;">Este es un mensaje automático, por favor no responder.</p>
      </div>`,
        
    };
    res.status(201).json(nuevo_pedido);
    pedido_id++;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email enviado:', info.response);
      }
    })
  };

  

  exports.eliminarPedido = (req, res) => {
    const id = parseInt(req.params.id);
    pedidos = pedidos.filter(pedido => pedido.id !== id);
    res.status(201).json({ mensaje: `Pedido ${id} eliminado` });
  };

  exports.verPedido = (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.filter(pedido => pedido.id === id);
    
    if (pedido.length >0 ) {
        res.status(200).json(pedido);
    } else {
        res.status(404).json({ message: "Pedido no encontrado" });
    }
};

exports.modificarPedido = (req, res) => {
  const id = parseInt(req.params.id);
  const nuevoPedido = req.body;
  const index = pedidos.findIndex(pedido => pedido.id === id);
  
  if (index !== -1) {
    pedidos[index] = {
        nombreCliente: nuevoPedido.nombreCliente || '' ,
        emailCliente: nuevoPedido.emailCliente || '' ,
        telefonoCliente: nuevoPedido.telefonoCliente || '' ,
        direccionCliente: nuevoPedido.direccionCliente || '' ,
        hamburguesa: nuevoPedido.hamburguesas || [],
        papas: nuevoPedido.papas || [],
        bebida: nuevoPedido.bebidas || [],
        id: nuevoPedido.id
    };
    res.status(200).json(pedidos[index]);
  } else {
    res.status(404).json({ message: "Pedido no encontrado" });
  }
};
