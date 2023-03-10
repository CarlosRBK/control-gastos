import React, { useEffect, useState } from 'react'
import DataForm from '../../components/DataForm'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';


const DataEditar = () => {
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
const { id } = useParams;
const [datos, setDatos] = useState([]);

const getData = async () => {
    const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
    setDatos(respuesta.data)
}
  useEffect(() => {
    getData()
  }, [id])
  


  const editarData = async(values, actions) => {

    try {
        const respuesta = await axios.put(`${process.env.REACT_APP_API_URL}/data/${id}`, values);
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
                  initialValues={datos}
                  botonTexto="Agregar"
                  onSubmit={editarData}
                  options={options}
                />
            </div>
        </div>
    </>
  )
}

export default DataEditar