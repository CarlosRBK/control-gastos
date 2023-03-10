import React from 'react'
import DataForm from '../../components/DataForm'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const DataAdd = () => {
  const initialValues = {
    fecha:'',
    categoria: '',
    debeHaber: '',
    monto: 0,
    agencia: '',
    total: 0,
    descripcion: ''
  }
const navigate = useNavigate();

  const crearData = async(values, actions) => {

    try {
        const respuesta = await axios.post(`${process.env.REACT_APP_API_URL}/data`, values);
        console.log(respuesta);
        if (respuesta.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'GENIAL!!!',
                text: `Se ha agregado perfectamente!`,
            });

            actions.resetForm(initialValues);
            navigate('/data')
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Ops que mal!!!',
            text: `Error: ${error?.response?.data?.message || error.message}`,
        })
    }
  }

  const options = ['Cobro Encomiendas','Flete','Impuestos','Combustible', 'Internet','Agua', 'Luz','Reparaciones',
  'Celular','Alquiler', 'Seguros','Sueldo', 'Publicidad','Papeleria y Utiles','Otros']

  return (
    <>
        <hr className='mt-5'/>
        <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
                <DataForm 
                  initialValues={initialValues}
                  botonTexto="Agregar"
                  onSubmit={crearData}
                  options={options}
                />
            </div>
        </div>
    </>
  )
}

export default DataAdd