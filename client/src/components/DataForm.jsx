import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


const dataErrores = Yup.object().shape({
    fecha: Yup.date()
        .required('Campo Obligatorio'),
    categoria: Yup.string()
        .required('Campo Obligatorio'),
    debeHaber: Yup.string()
        .required('*Campo Obligatorio.'),
    monto: Yup.number()
        .integer('Debe ser numero entero')
        .required('Campo Obligatorio')
        .positive('No puede ser negativo'),
    total: Yup.number(),
    descripcion: Yup.string()
        .required('*Campo Obligatorio.'),
});

const DataForm = ({initialValues, botonTexto, onSubmit, options}) => {


  return (
    <Formik 
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={dataErrores}
        options={options}
    >
        {({ errors, touched }) => (
            <Form>
                <label htmlFor="fecha" className='form-label'>Fecha</label>
                <Field name="fecha" type="date" className="form-control" />
                <label htmlFor="categoria" className='form-label'>Categoria</label>
                <Field name="categoria" as="select" className="form-control">
                    <option value=" ">Selecciona una categoria</option>
                    {
                        options.map(( option, index ) =>
                        <option key={index} value={option.value}>{option}</option>)
                    }
                </Field >
                {touched.categoria && errors.categoria && <div className="form-text text-danger">{errors.categoria}</div>}
                <label htmlFor="debeHaber" className='form-label'>Tipo de transacción:</label>
                <Field name="debeHaber" as="select" className="form-control" >
                    <option value=" ">Selecciona un tipo</option>
                    <option value="INGRESO">Ingreso</option>
                    <option value="EGRESO">Egreso</option>                            
                </Field>
                {touched.debeHaber && errors.debeHaber && <div className="form-text text-danger">{errors.debeHaber}</div>}
                <label htmlFor="monto" className='form-label'>Monto</label>
                <Field name="monto" type="number" className="form-control" />
                {touched.monto && errors.monto && <div className="form-text text-danger">{errors.monto}</div>}
                <label htmlFor="descripcion" className='form-label' placeholder='Ingrese una breve descripción'>Descripcion</label>
                <Field name="descripcion" as="textarea" className="form-control" />
                <button className="btn btn-primary mt-2" type="submit">{botonTexto}</button>
                <Link to='/data' className='btn btn-dark mt-2 ms-2'>Volver</Link>
            </Form>
        )}
    </Formik>
  )
}

export default DataForm