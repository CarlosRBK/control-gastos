const { Usuario } = require("../models/usuarios.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.createUsuario = async (request, response) => {
    try {
        const usuario= new Usuario(request.body);
        await usuario.save();
        response.json({msg:"Usuario Registrado", usuario});
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.login = async (request, response) => {
    console.log(request.params)
    try {
        const {email, password} = request.body;
        const usuario = await Usuario.findOne({email: email})
        if (usuario === null) {
            return  response.status(403).json({ msg: "correo no encontrado" });
        }
        const esValidaLaPass = await bcrypt.compare(password, usuario.password);

        if (esValidaLaPass){
            const secret = process.env.SECRET_KEY;

            const newJWT = jwt.sign({
                _id: usuario._id,
                nombre: `${usuario.name} ${usuario.agencia}`,
                email: usuario.email,
                agencia: usuario.agencia
            }, secret )

            response.cookie("kd_token", newJWT, {
                httpOnly: true
            })
            response.json({msg: "Logeado Correctamente"});
        }
        else
            return  response.status(403).json({ msg: "Clave incorrecta" });

        //response.cookie("kd_token", "valor de la cookie", { httpOnly: true })
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.logout = async (request, response) => {
    console.log(request.params)
    try {
        response.clearCookie("kd_token");
        response.json({msg:"Saliste correctamente."});
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getAllUsuarios = async (request, response) => {
    try {
        console.log(request.usuario)
        const usuarios = await Usuario.find({})
        response.json(usuarios);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}