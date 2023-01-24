import React, {useEffect, useState} from "react";
import Paginacion from "./Paginacion.jsx";

const Pokemons = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit,setLimit] = useState(20)
    const [offset,setOffset] = useState(0)
    const [pagina,setPagina] = useState(1)


    function pagAnterior() {
        setOffset(offset-20)
        ObetenerDatosApi()
    }

    async function pagSiguiente() {
        setOffset(offset + 20)
        await ObetenerDatosApi()
    }

    const ObetenerDatosApi = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            let datos = await api.json()
            console.log(datos)
            setData(datos)
            console.log(data)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }
    console.log(data)

    useEffect(()=>{
        ObetenerDatosApi()
    },[offset])


    return (
        <div>


            {loading
                ?
                <h1>Cargando...</h1>
                :
                <div>
                    {data.results.map(pokemon=>(
                        <div>{pokemon.name}</div>
                    ))


                    }
                </div>

            }



            <Paginacion
                limit={limit}
                offset={offset}
                pagAnterior={pagAnterior}
                pagSiguiente={pagSiguiente}
            />
        </div>
    )
}
export default Pokemons