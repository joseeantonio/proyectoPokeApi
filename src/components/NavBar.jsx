import React from "react";
import {NavLink} from "react-router-dom";
import Logo from '../images/logo_pokemon.png'

const NavBar = () => {
    return(
        <header>
            <section className="section">
                <NavLink to="/"><img src={Logo}/></NavLink>
                <nav className="menu_ordenador">
                    <ul>
                        {/*{user && (*/}
                            <div>
                                <li><NavLink to="#">PERSONAJES</NavLink></li>
                                <li><NavLink to="#">CONTACTO</NavLink></li>
                                <li><NavLink to="#">INICIAR SESION</NavLink></li>
                                <li className="boton"><NavLink to="#">REGISTRARSE</NavLink></li>
                            </div>

                        {/*{user ? (*/}
                        {/*    <button className='btn btn-dark'*/}
                        {/*            onClick={cerrarSesion}>*/}
                        {/*        Cerrar sesión*/}
                        {/*    </button>*/}
                        {/*):(*/}
                        {/*    <div>*/}
                        {/*        <li><NavLink to="/login">INICIAR SESION</NavLink></li>*/}
                        {/*        <li className="boton"><NavLink to="/register">REGISTRARSE</NavLink></li>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                    </ul>
                </nav>
                <button onClick={() => {
                    document.querySelector('.menu_hamburguesa').classList.toggle('mostrar');
                }} className="menu_hamburguesa"><i className="fas fa-bars"></i></button>
            </section>
        </header>
    )
}

export default NavBar