import Home from "../pages/Home.jsx";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import {createBrowserRouter} from "react-router-dom";
import Error from "../pages/Error.jsx";
import Pokemons from "../pages/Pokemons.jsx";
import DetallesPokemon from "../pages/DetallesPokemon.jsx";
import Register from "../pages/Register.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";

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
                element: <LayoutPrivate />,
                children: [
                    {
                        path: '/pokemons',
                        element : <Pokemons />
                    },{
                        path: '/pokemons/:id',
                        element: <DetallesPokemon />,
                    },
                ]
            }
        ],
    },
])


