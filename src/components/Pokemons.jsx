import React, {useEffect, useState} from "react";
import Paginacion from "./Paginacion.jsx";
import CardPokemon from "./CardPokemon.jsx";

const Pokemons = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit,setLimit] = useState(21)
    const [offset,setOffset] = useState(0)
    const [pagina,setPagina] = useState(1)


    function pagAnterior() {
        if (offset-21<0){
            setOffset(0)
        }else {
            setOffset(offset - 21)
            setPagina(pagina-1)
        }
        ObetenerDatosApi()
    }

    async function pagSiguiente() {
        setOffset(offset + 21)
        setPagina(pagina+1)
        ObetenerDatosApi()
    }

    const ObetenerDatosApi = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            let datos = await api.json()
            setData(datos)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    useEffect(()=>{
        ObetenerDatosApi()
    },[offset])


    return (
        <div className='Pokemons'>
            {loading
                ?
                <h1>Cargando...</h1>
                :
                <div>
                    <div className='encabezado' style={{ backgroundImage: "url(/img_fondo_encabezado.png)" }}>
                        <h1>Listado de Pokemons</h1>
                    </div>
                    <section>
                            {data.results.map(pokemon=>(
                                <div className='pokemon'>
                                    <li key={pokemon.name}>
                                        <CardPokemon
                                        urlDetalles={pokemon.url}
                                        />
                                    </li>
                                </div>
                            ))
                            }
                    </section>
                </div>
            }
            <Paginacion
                limit={limit}
                offset={offset}
                pagAnterior={pagAnterior}
                pagSiguiente={pagSiguiente}
                pagina={pagina}
            />
        </div>
    )
}
export default Pokemons