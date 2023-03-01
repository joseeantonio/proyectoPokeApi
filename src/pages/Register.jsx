import React, {useState} from "react";

const Register = () => {

    const [datos,setDatos] = useState({
        name: '',
        email: '',
        password: '',
        password_rep: '',
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        })
    }

    const validar = (e) => {
        e.preventDefault()
        const { name,email,password,password_rep } = datos

        if (!email.trim()) {
            setError('Comlete el correo electronico')
            return
        }
        if (!password.trim()) {
            setError('Complete la contraseña')
            return
        }
        if (!name.trim()){
            setError('Complete el nombre de usuario')
            return
        }
        if (password.length < 6) {
            setError('La contraseña debe de tener mas de 5 caracteres')
            return
        }
        if (!isNaN(name)) {
            setError('El nombre de usuario no debe de tener numeros')
            return
        }
        if (password_rep!==password){
            setError('La contraseñas no coinciden')
            return
        }
        else {
            setError(null)
        }
    }



    return(
        <div className='Register'>
            <div className="caja-de-fuera">
                <div className="caja">
                    <h1>REGISTRO</h1>
                    <form className='formulario' onSubmit={validar}>
                        <label type='name'>Nombre de usuario</label>
                        <input
                            name='name'
                            type="text"
                            value={datos.name}
                            onChange={(e) => handleChange(e)}
                        />


                        <label type='name'>Correo electronico</label>
                        <input
                            name='email'
                            type="email"
                            value={datos.email}
                            onChange={(e) => handleChange(e)}
                        />


                        <label type='name'>Contraseña</label>
                        <input
                            name='password'
                            type="password"
                            value={datos.password}
                            onChange={(e) => handleChange(e)}
                        />


                        <label type='name'>Repetir contraseña</label>
                        <input
                            name='password_rep'
                            type="password"
                            value={datos.password_rep}
                            onChange={(e) => handleChange(e)}
                        />


                        <div><input className="ckeckbox" type="checkbox"/>Acepto el acuerdo de terminos</div>
                        <button className='btn btn-lg btn-dark w-100  mb-2' type='submit'>
                            Registrar
                        </button>
                    </form>
                    {error && <div className='error'>{error}</div>}
                </div>
            </div>
        </div>
    )
}
export default Register