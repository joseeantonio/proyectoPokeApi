import Home from "../pages/Home.jsx";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import {createBrowserRouter} from "react-router-dom";
import Error from "../pages/Error.jsx";
import Pokemons from "../pages/Pokemons.jsx";
import DetallesPokemon from "../pages/DetallesPokemon.jsx";
import Register from "../pages/Register.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";
import Login from "../pages/Login.jsx";
import Contacto from "../pages/Contacto.jsx";
import Favoritos from "../pages/Favoritos.jsx";

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
                path: '/register',
                element: <Register />,
            },{
                path: '/login',
                element: <Login />
            },{
                path: '/pokemons',
                element : <Pokemons />
            },{
                path: '/pokemons/:id',
                element: <DetallesPokemon />,
            },

            {
                element: <LayoutPrivate />,
                children: [
                    {
                        path: '/contacto',
                        element: <Contacto />
                    },{
                        path: '/favoritos',
                        element: <Favoritos />
                    },
                ]
            }
        ],
    },
])


