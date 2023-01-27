import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return(
        <div className='home' style={{ backgroundImage: "url(/img_fondo_index.png)" }}>
            <main>
                <h1>BIENVENIDO</h1>
                <p>¿Seguro de empezar esta nueva aventura?</p>
                <NavLink className="boton_principal" id="ancla" to="#">EMPEZAR</NavLink>
            </main>
        </div>
    )
}
export default Home