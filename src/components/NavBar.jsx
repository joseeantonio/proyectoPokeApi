import React from "react";
import {NavLink} from "react-router-dom";
import Logo from '../images/logo_pokemon.png'
import {useUserContext} from "../context/UserContext.jsx";

const NavBar = () => {

    //Cogemos valor del usuario del context
    const { usuario, setUsuario } = useUserContext()

    const cerrarSesion = () => {
        setUsuario(null)
    }

    return(
        <div className='NavBar'>
            <header>
                <section className="section">
                    <NavLink to="/"><img src={Logo}/></NavLink>
                    <nav className="menu_ordenador">
                        <ul>
                            {usuario ? (
                                <div>
                                    <li><NavLink to="/pokemons">PERSONAJES</NavLink></li>
                                    <li><NavLink to="/contacto">CONTACTO</NavLink></li>
                                    <li><NavLink to="/favoritos">FAVORITOS</NavLink></li>
                                    <button className='btn btn-dark'
                                            onClick={cerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            ):(
                                <div>
                                    <li><NavLink to="/pokemons">PERSONAJES</NavLink></li>
                                    <li><NavLink to="/login">INICIAR SESION</NavLink></li>
                                    <li className="boton"><NavLink to="/register">REGISTRARSE</NavLink></li>
                                </div>
                            )}

                        </ul>
                    </nav>
                    <button onClick={() => {
                        document.querySelector('.menu_hamburguesa').classList.toggle('mostrar');
                    }} className="menu_hamburguesa"><i className="fas fa-bars"></i></button>
                </section>
            </header>
        </div>
    )
}

export default NavBar