const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



//Crear un nuevo usuario
router.post('/new', [ 
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], crearUsuario);

//Login de usuario
// -> path -> middlewares -> controller
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], loginUsuario );

//Validar y revalidar el token
router.get('/renew', validarJWT ,revalidarToken);

module.exports = router;