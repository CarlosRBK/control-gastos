import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Layout from "../layouts/Layout";
import Data from "../pages/data/Data";
import DataAdd from "../pages/data/DataAdd";
import DataDetails from "../pages/data/DataDetails";
import DataEditar from "../pages/data/DataEditar";
import NotFound from "../pages/NotFound";


export default createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        errorElement: <NotFound />,
        children:[
            {
                index: true,
                element: <Login />
            },
            {
                path:'data',
                element: <Data />
            },
            {
                path:'data/new',
                element: <DataAdd />
            },
            {
                path:'data/:id',
                element: <DataDetails />
            },
            {
                path:'data/:id/edit',
                element: <DataEditar />
            },
        ]
    }
]);