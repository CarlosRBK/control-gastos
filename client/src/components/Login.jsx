import React from 'react'
import { Formik, Form, Field } from 'formik';
import './login.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onSubmit }) => {

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    }

    const login = async(values, actions) => {
        try {
            const respuesta = await axios.post(`${process.env.REACT_APP_API_URL}/usuario/login`, values);
            console.log(respuesta);
            if (respuesta.status === 200){
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: "Ingreso correcto",
                    showConfirmButton: false,
                    timer: 1500
                  })
    
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
    return (

        <div className="login">
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={login}
            >
                {({ errors, touched }) => (
                    <Form className='form'>
                        <span>KD Express</span>
                        <Field name="email" className="form-control" placeholder="Ingrese su e-mail" />
                        <Field name="password" type="password" className="form-control mt-2" placeholder="Ingrese su contraseña" />
                        <button className="btn btn-primary mt-5" type='submit'>Acceder</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login