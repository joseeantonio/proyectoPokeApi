import Home from "../pages/Home.jsx";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import {createBrowserRouter} from "react-router-dom";
import Error from "../pages/Error.jsx";
import Pokemons from "../components/Pokemons.jsx";
import Pokemon from "../components/Pokemon.jsx";
import PaginaBusqueda from "../pages/PaginaBusqueda.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },{
                path: '/pokemons',
                element : <Pokemons />
            },{
                path: '/pokemons/:id',
                element: <Pokemon />,
            },{
                path: '/busqueda/:nombre',
                element: <PaginaBusqueda />,
            },
        ],
    },
])


