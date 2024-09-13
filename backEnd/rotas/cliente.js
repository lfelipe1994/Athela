const { Router } = require("express");
const router = Router();
const { getClientesDoUsuario, postNovoCliente, putConcluirCliente } = require("../controladores/cliente");

router.get('/:id', getClientesDoUsuario);
router.post('/adicionar', postNovoCliente)
router.put('/concluir/:id', putConcluirCliente)

module.exports = router;