import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Busqueda from "../components/Busqueda.jsx";
import Cards from "../components/Cards.jsx";
import Paginacion from "../components/Paginacion.jsx";

const PaginaBusqueda = () => {

    const {nombre} = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [busqueda,setBusqueda] = useState({})

    const buscar = (nombre) => {
        debugger
        for (let i=0;i<data.length;i++){
            console.log('buscando')
            console.log(data[i])
            if (data[i].name.toString().toLowerCase().includes(nombre.toLowerCase())){
                console.log('buscando')
                setBusqueda(...data[i])
            }
        }
    }


    const ObetenerDatosApi = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            let datos = await api.json()
            setData(datos.results)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    useEffect(()=>{
        ObetenerDatosApi()
    },[])

    buscar(nombre)


    return (
        <div>
            {

            }

        </div>
    )

}
export default PaginaBusqueda