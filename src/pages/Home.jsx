import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return(
        <div className='home' style={{ backgroundImage: "url(/img_fondo_index.png)" }}>
            <main>
                <h1>BIENVENIDO</h1>
                <p>¿Seguro de empezar esta nueva aventura?</p>
                <NavLink to='/pokemons' className="boton_principal">EMPEZAR</NavLink>
            </main>
        </div>
    )
}
export default Home