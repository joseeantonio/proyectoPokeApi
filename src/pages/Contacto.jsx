import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import swal from "sweetalert2";

const Contacto = () => {

    const [error,setError] = useState()
    const [datos,setDatos] = useState({
        email: '',
        asunto: '',
        mensaje: '',
    })

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        })
    }

    const validar = (e) => {
        e.preventDefault()
        const { asunto,email,mensaje} = datos
        const regExpEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (!email.trim()) {
            setError('Complete el correo electronico')
            return
        }
        if (!regExpEmail.test(email)) {
            setError('Correo electronico incorrecto')
            return
        }if (!asunto.trim()){
            setError('Complete el asunto')
            return
        }
        if (!mensaje.trim()){
            setError('Complete el mensaje')
            return
        }
        if (mensaje.length<10){
            setError('El mensaje debe tener una longitud al menos de 10')
            return
        }
        else {
            setError(null)
            setDatos({
                email: '',
                asunto: '',
                mensaje: '',
            })
            console.log(datos)
            swal.fire({
                title: "¡Listo!",
                text: "Su mensaje ha sido enviado",
                icon: "success",
                confirmButtonText: "OK"
            })
            return;
        }
    }

    return(
        <div className='Contacto'>
            <div className="caja-de-fuera">
                <div className="caja">
                    <h1>Contacto</h1>
                    <form className='formulario' onSubmit={validar} action="" method="post">
                        <label type='name'>Correo electronico</label>
                        <input
                            placeholder='Correo electronico'
                            name='email'
                            type="email"
                            onChange={(e)=>handleChange(e)}
                            value={datos.email}
                        />
                        <label type='name'>Asunto</label>
                        <input
                            placeholder='Asunto'
                            name='asunto'
                            type="text"
                            onChange={(e)=>handleChange(e)}
                            value={datos.asunto}
                        />
                        <label type='name'>Mensaje</label>
                        <textarea
                            name='mensaje'
                            placeholder='Explicacion del asunto'
                            onChange={(e)=>handleChange(e)}
                            value={datos.mensaje}
                        />

                        <button class="btn btn-outline-secondary" type="submit">Enviar</button>
                    </form>
                    {error && <div className='error'>{error}</div>}
                </div>
            </div>
        </div>
    )
}
export default Contacto