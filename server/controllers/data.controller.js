const { Data } = require("../models/data.model");

module.exports.index = (request, response) => {
    response.json({
       message: "Control de gastos"
    });
}

module.exports.createData = async (request, response) => {
    try {
        let { categoria, debeHaber, monto, total, descripcion, fecha } = request.body;
        let agencia = request.usuario.agencia;
        console.log(request.usuario);
        let ultimoValor = await Data.findOne({}, {}, { sort: { '_id' : -1 } });
        if(ultimoValor){
            if(debeHaber == "INGRESO"){
                total=ultimoValor.total+monto;
            }else{
                total=ultimoValor.total-monto;
            }
        }else{

            if(debeHaber == "INGRESO"){
                total = monto;
            }else{
                total = -monto;
            }

        }

        data = await Data.create({
            fecha,
            categoria,
            debeHaber,
            monto,
            agencia,
            total,
            descripcion
        });
        response.json(data);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getAllData = async (request, response) => {
    try {
        const datas = await Data.find({})
        response.json(datas);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getData = async (request, response) => {
    try {
        const data = await Data.findOne({_id:request.params.id})
        response.json(data);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


module.exports.updateData = async (request, response) => {
    try {
        const data = await Data.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        let ultimoValor = await Data.findOne({}, {}, { sort: { '_id' : -1 } });
        if(ultimoValor){
            if(debeHaber == "INGRESO"){
                total=ultimoValor.total+monto;
            }else{
                total=ultimoValor.total-monto;
            }
        }else{
            
            if(debeHaber == "INGRESO"){
                total = monto;
            }else{
                total = -monto;
            }
            
        }
        response.json(data);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.deleteData = async (request, response) => {
    try {
        const data = await Data.deleteOne({ _id: request.params.id })
        response.json(data);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}