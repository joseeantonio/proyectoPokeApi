import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

const Contacto = () => {


    return(
        <div className='Contacto'>
            <div className="caja-de-fuera">
                <div className="caja">
                    <h1>Contacto</h1>
                    <hr/>
                    <form className='formulario' action="" method="post">
                        <label type='name'>Correo electronico</label>
                        <input
                            placeholder='Correo electronico'
                            name='email'
                            type="email"
                        />
                        <label type='name'>Asunto</label>
                        <input
                            placeholder='Asunto'
                            name='email'
                            type="email"
                        />

                        <label type='name'>Mensaje</label>
                        <textarea placeholder='Explicacion del asunto'></textarea>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Contacto