import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Busqueda = () => {

    const navigate = useNavigate()
    const [busqueda,setBusqueda] = useState('')

    const mandarDatos=(e)=>{
        e.preventDefault()
        if (busqueda === "") {
            return;
        }else{

        }
    }

    const darValor = (e) =>{
        setBusqueda(e.target.value)
    }

    return(
        <form onSubmit={mandarDatos}>
            <input
                type="search"
                value={busqueda}
                onChange={darValor}
                placeholder="Buscar por nombre o por id"
            />
            <button type="submit">
                Buscar
            </button>
        </form>
    )
}

export default Busqueda