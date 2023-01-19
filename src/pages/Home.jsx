import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return(
        <main>
            <h1>BIENVENIDO</h1>
            <p>¿Seguro de empezar esta nueva aventura?</p>
            <NavLink className="boton_principal" id="ancla" to="#">EMPEZAR</NavLink>
        </main>
    )
}
export default Home