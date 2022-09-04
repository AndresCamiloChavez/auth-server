const { response } = require("express");
const { validationResult } = require("express-validator");
const { db } = require("../models/Usuario");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');




const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {

    console.log('se está creando el usuario');
    //Verificar el email que no existe
    const usuario = await Usuario.findOne({ email });
    if(usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        })
    }

    // Crear usuario con el modelo

    const dbUser = new Usuario(req.body);

    //Hasear la contraseña

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);



    //generar JWT

    const token = await generarJWT(dbUser.id, dbUser.name);

    // Crear usuario de base de datos
    await dbUser.save();

    //Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        name,
        token
    });


  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: true, msg: "Por favor hable con el administrador" });
  }
};
const loginUsuario = (req, res = response) => {
  // const errors = validationResult(req)
  // console.log('mis errores', errors);

  // if(!errors.isEmpty()){
  //     return res.status(400).json({
  //         ok: false,
  //         erros: errors.mapped()
  //     });
  // }
  const { email, password } = req.body;
  console.log(email, password);
  return res.json({
    ok: true,
    msg: "Login de usuario / ",
  });
};
const revalidarToken = (req, res) => {
  return res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
