const express = require("express");
const cors = require('cors');

const rotaUsuario = require("./rotas/usuario");
const rotaCliente = require("./rotas/cliente");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/usuario', rotaUsuario);
app.use('/cliente', rotaCliente);

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
});