import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import jsPDF from 'jspdf';
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const darkTheme = createTheme({
  palette: {
      mode:'dark'
  }
})

axios.defaults.withCredentials = true;

const dateFormat = (date) =>{
  const current = new Date(date);
  let day = current.getDate();
  if(day<10){
    day = "0"+day;
  }
  let month = current.getMonth()+1;
  if(month<10){
    month = "0"+month;
  }
  const year = current.getFullYear(); 
  return `${day}/${month}/${year}`;
};


const montoFormat = (moneda) =>{
  return moneda.toLocaleString('es-PG', { style: 'currency', currency: 'PYG' });
};

const Data = () => {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams()
  const datosPDF = datos.length-1

const getData = async () => {
  const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
  const respuestaFormateada = respuesta.data.map((item, index) => {
    item.fecha = dateFormat(item.fecha);
    item.monto = montoFormat(item.monto);
    item.total = montoFormat(item.total);
    return item
  })
  setDatos(respuestaFormateada)
  console.log(datos[datos.length-1])
}

  useEffect(() => {

    getData();
  }, []);

  const dowloadPdf=()=>{
    const doc=new jsPDF()
    doc.text(`Total en caja: ${datos[datos.length-1].total}`,20,10)
    doc.autoTable({
      head: [['Fecha', 'Descipción', 'Categoria', 'Tipo', 'Monto','Agencia']],
      theme:"striped",
      columns:columns.map(col=>({...col,dataKey:col.name})),
      body:datos,
    })
    
    doc.save('table.pdf')
  }

  const handleRedirect = (ruta) => {
    navigate(`/data/${ruta}`)
  }

  const eliminarDatos = (id) => {

    Swal.fire({
  title: 'Estas seguro?',
  text: "No se puede revertir!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then(async(result) => {
  if (result.isConfirmed) {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/data/${id}`)
    console.log(res.data)
    Swal.fire(
      'Eliminado!',
      'Se ha eliminado con exito.',
      'success'
    )
    getData()
  }
})


    
}

  const columns = [
    {
      name: "fecha",
      label:"FECHA",
      options: {
        sortOrder: "desc",
        searchable: false
      }
    },
    {
      name:"descripcion",
      label:"DESCRIPCION"
    },
    {
      name:"categoria",
      label:"CATEGORIA",
    },
    {
      name:"debeHaber",
      label:"INGRESO/EGRESO",
    },
    {
      name:"monto",
      label:"MONTO",
    },
    {
      name:"agencia",
      label:"AGENCIA"
    },
    {
      name: "_id",
      label: 'ACCIONES',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
                <button className='btn btn btn-outline-primary' onClick={() => handleRedirect(tableMeta.rowData[6])}>
                <i className="bi bi-clipboard2"></i>
                </button>
                <button className='btn btn btn-outline-light ms-2' onClick={() => handleRedirect(`${tableMeta.rowData[6]}/edit`)}>
                <i className="bi bi-pencil"></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={() => eliminarDatos(tableMeta.rowData[6])}>
                <i className="bi bi-trash3"></i>
                </button>
            </div>
          );
        }
      }
    }

]

const options = {
  filterType: "dropdown",        
      rowsPerPageOptions:[5,10,20,30],
      sort: false,
  jumpToPage: true,
    selectableRows:'none',
    exportMenu: [
      {
        label: "Export PDF",
        exportFunc: (cols, datas) =>
          ExportPdf(cols, datas, "myPdfFileName"),
      },
      {
        label: "Export CSV",
        exportFunc: (cols, datas) =>
          ExportCsv(cols, datas, "myCsvFileName"),
      },
    ],
    };

  return (
    <div className='container'>
      <div className=''>
        <div>
          <Link to='/data/new' className='btn btn-primary m-2'>Agregar nuevo</Link>
          <button className='btn btn-danger ms-2' onClick={() => dowloadPdf()}>
            Exportar en PDF
          </button>
        </div>
        <div className='card text-center bg-black text-white'>
          <h2> Total: {datos.at(-1) ? datos.at(-1).total : null } </h2>
        </div>
      </div>
      <div>
      <ThemeProvider theme={darkTheme}>
          <MUIDataTable
          title={"Show data"}
          data={datos}
          columns={columns}
          options={options}
          />
          
        </ThemeProvider>
      </div>

    </div>
  )
}

export default Data