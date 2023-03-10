const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required:[true, 'Este dato es requerido'] 
    },
    categoria: {
        type: String,
        enum:['Cobro Encomiendas','Flete','Impuestos','Combustible', 'Internet','Agua', 'Luz','Reparaciones', 'Celular','Alquiler', 'Seguros','Sueldo', 'Publicidad','Papeleria y Utiles','Otros'],
        required:[true, 'Este dato es requerido'] 
    },
    debeHaber: { 
        type: String,
        required:[true, 'Este dato es requerido'] 
    },
    monto: { 
        type: Number,
        required:[true, 'Este dato es requerido'] 
    },
    agencia: {
        type: String,
        required:[true, 'Este dato es requerido'] 
    },
    total: {
        type: Number,
        required:[true, 'Este dato es requerido'] 
    },
    descripcion: {type: String,
        required:[true, 'Este dato es requerido'] 
    }
});
module.exports.Data = mongoose.model('Data', DataSchema);

