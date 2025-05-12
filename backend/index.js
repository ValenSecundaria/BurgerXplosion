const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());


const rutasPedidos = require('./rutas/pedidos');
app.use('/api/pedidos', rutasPedidos);

const rutasOpciones = require('./rutas/opciones');
app.use('/api/opciones', rutasOpciones);


if (process.env.DEPLOY_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}



const PORT = process.env.PORT ||3000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
