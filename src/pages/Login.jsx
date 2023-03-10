import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useUserContext} from "../context/UserContext.jsx";

const Login = () => {

    //Dedfinimos los datos
    const [datos,setDatos] = useState({
        email: '',
        password: ''
    })
    const [usuarios,setUsuarios] = useState([])
    const [error, setError] = useState(null)
    const { usuario, setUsuario } = useUserContext()
    const navigate = useNavigate()

    //Funcion cada vez que escriba en los input para obtener los datos
    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        })
    }

    //Esta funcion comprueba si esta cuenta ha estado registrada antes o no , si es asi debe de estar almcenada en el LocalStorage.
    const iniciarSesion = async () => {
        setUsuarios([...usuarios, datos])
        if (localStorage.getItem('password')!==datos.password && localStorage.getItem('email')===datos.email){
            setError('Contraseña incorrecta')
        }
        else if (localStorage.getItem('email')===datos.email){
            setError(null)
            setUsuario(true)
            navigate('/pokemons')
            await Swal.fire({
                title: 'Usuario registrado',
            })
        }else{
            setError('Registrate por favor.')
        }
    }

    //Validamos
    const validar = (e) => {
        e.preventDefault()
        const {email,password} = datos

        if (!email.trim()) {
            setError('Comlete el correo electronico')
            return
        }
        if (!password.trim()) {
            setError('Complete la contraseña')
            return
        }
        if (password.length < 6) {
            setError('La contraseña debe de tener mas de 5 caracteres')
            return
        }
        else {
            iniciarSesion()
        }
    }

    return(
        <div className='Register'>
            <div className="caja-de-fuera">
                <div className="caja">
                    <h1>INICIAR SESION</h1>
                    <form className='formulario' onSubmit={validar}>
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

                        <NavLink to='/register'>¿Todavía no tienes cuenta?</NavLink>
                        <button className='btn btn-lg btn-dark w-100  mb-2' type='submit'>
                            Iniciar Sesion
                        </button>
                    </form>
                    {error && <div className='error'>{error}</div>}
                </div>
            </div>
        </div>
    )
}
export default Login