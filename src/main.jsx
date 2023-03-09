import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import UserProvider from "./context/UserContext.jsx";
import PokemonProvider from "./context/PokemonsContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
          <PokemonProvider>
            <RouterProvider router={router} />
          </PokemonProvider>
      </UserProvider>
  </React.StrictMode>,
)
