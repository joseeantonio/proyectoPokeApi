import React, {useEffect, useState} from "react";
import Paginacion from "../components/Paginacion.jsx";
import Cards from "../components/Cards.jsx";
import Filtros from "../components/Filtros.jsx";

const Pokemons = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit,setLimit] = useState(21)
    const [offset,setOffset] = useState(0)
    const [pagina,setPagina] = useState(1)

    //todos los pokemons
    const [todosLosPokemons,setTodosLosPokemons] = useState([])
    //lo que busco
    const [busqueda,setBusqueda] = useState('')
    //pokemons de la busqueda
    let [pokemonBusqueda,setPokemonBusqueda] = useState([])
    //variable de si estoy buscando o no
    const [buscando,setBuscando] = useState(false)
    //cojo datos que escribe en la busqueda
    const handleChange=(e)=>{
        setBusqueda(e.target.value)
    }
    //funcion que llamo dentro de otra funcion para añadir pokemon a mostrar de la busqueda
    function añadirPokemon(nombre){
        for (let i=0;i<todosLosPokemons.length;i++){
            debugger
            if (pokemonBusqueda.length<21){
                if (!isNaN(busqueda)){
                    const split = todosLosPokemons[i].url.split("/")
                    // console.log(split)
                    const idPokemon = split[6]
                    // console.log(idPokemon)
                    debugger
                    if (idPokemon===busqueda){
                        pokemonBusqueda.push(todosLosPokemons[i])
                    }
                }
                else if (todosLosPokemons[i].name.toString().toLowerCase().includes(nombre.toLowerCase())){
                    pokemonBusqueda.push(todosLosPokemons[i])
                }
            }else{
                return
            }
        }
    }
    //funcion de busqueda
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
    //PAGINACION
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
    //Funcion para coger 21 pokemons segun su offset
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
    //cojo todos los pokemons para filtrar la busqueda
    const ObetenerDatosApiTodosPokemons = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
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
    //este useEffect sirev para cuando cambie el offset llame a la funcion , esto nos sirve para la paginacion
    useEffect(()=>{
        ObetenerDatosApi()
    },[offset])


    const buscarFiltros = async (tipo) => {
        setPokemonBusqueda((pokemonBusqueda = []))
        for (let i = 0; i < todosLosPokemons.length; i++) {
            let api = await fetch(`https://pokeapi.co/api/v2/type/${todosLosPokemons[i].name}`)
            let datos = await api.json()
            let tipoPokemon = datos.name
        }


    }

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
                    <div className='input-busqueda'>
                        <input
                            type="search"
                            value={busqueda}
                            onChange={handleChange}
                            placeholder="Buscar por nombre o por id"
                        />
                        <button onClick={buscar}>buscar</button>
                    </div>
                    <div className='filtros'>
                        <Filtros/>
                    </div>
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