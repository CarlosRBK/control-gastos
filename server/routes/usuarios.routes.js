const { authenticate } = require('../config/jwc.config');
const UsuarioController = require('../controllers/usuarios.controller');
module.exports = function(app){
    app.post('/api/usuario', UsuarioController.createUsuario);
    app.get('/api/usuario/salir',UsuarioController.logout);
    app.post('/api/usuario/login',UsuarioController.login);
    app.get('/api/usuarios', authenticate, UsuarioController.getAllUsuarios);
}
