const { Router } = require("express");
const router = Router();
const { postNovoUsuario, getTodosUsuarios, getVerificacaoLogin, putAtualizaNotificacao } = require("../controladores/usuario");

router.get('/', getTodosUsuarios);
router.post('/adicionar', postNovoUsuario)
router.post('/verificaLogin', getVerificacaoLogin)
router.put('/atualiza', putAtualizaNotificacao)

module.exports = router;