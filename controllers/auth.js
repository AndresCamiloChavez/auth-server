const {response} = require('express');
const {validationResult} = require('express-validator');

const crearUsuario = (req, res = response) => {

    const {email, name, password } = req.body;
    
    return res.json({ok: true});
}
const loginUsuario = (req, res = response) => {

    // const errors = validationResult(req)
    // console.log('mis errores', errors);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         erros: errors.mapped()
    //     });
    // }
    const {email, password } = req.body;
    console.log(email, password);
    return res.json({
        ok: true,
        msg: 'Login de usuario / '
    });
}
const revalidarToken = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}