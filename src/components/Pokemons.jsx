import React, {useEffect, useState} from "react";
import Paginacion from "./Paginacion.jsx";
import Cards from "./Cards.jsx";

const Pokemons = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit,setLimit] = useState(21)
    const [offset,setOffset] = useState(0)
    const [pagina,setPagina] = useState(1)

    const [todosLosPokemons,setTodosLosPokemons] = useState([])
    const [busqueda,setBusqueda] = useState('')
    let [pokemonBusqueda,setPokemonBusqueda] = useState([])
    const [buscando,setBuscando] = useState(false)

    const handleChange=(e)=>{
        setBusqueda(e.target.value)
    }

    function añadirPokemon(nombre){
        for (let i=0;i<todosLosPokemons.length;i++){
            debugger
            if (pokemonBusqueda.length<21){
                if (todosLosPokemons[i].name.toString().toLowerCase().includes(nombre.toLowerCase())){
                    pokemonBusqueda.push(todosLosPokemons[i])
                }
            }else{
                return
            }
        }
    }

    const buscar = () => {
        const nombre = busqueda
        if (nombre.length===0){
            setBuscando(false)
            setOffset(0)
            setPagina(1)
        }else{
            setPokemonBusqueda((pokemonBusqueda=[]))
            setBuscando(true)
                añadirPokemon(nombre)
        }
    }






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
    const ObetenerDatosApiTodosPokemons = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`)
            let datos = await api.json()
            setTodosLosPokemons(datos.results)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    useEffect(()=>{
        ObetenerDatosApiTodosPokemons()
    },[])

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
                    <input
                        type="search"
                        value={busqueda}
                        onChange={handleChange}
                        placeholder="Buscar por nombre o por id"
                    />
                    <button onClick={buscar}>buscar</button>
                    {!buscando ?
                        <div>
                            <Cards
                                pokemons={data.results}
                            />
                            <Paginacion
                                limit={limit}
                                offset={offset}
                                pagAnterior={pagAnterior}
                                pagSiguiente={pagSiguiente}
                                pagina={pagina}
                            />
                        </div>
                        :
                        <div>
                            <h1>PRIMEROS 21 RESULTADOS</h1>
                            <Cards
                                pokemons={pokemonBusqueda}
                            />
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default Pokemons