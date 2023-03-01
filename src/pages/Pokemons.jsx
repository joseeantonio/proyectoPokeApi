import React, {useEffect, useState} from "react";
import Paginacion from "../components/Paginacion.jsx";
import Cards from "../components/Cards.jsx";
import Filtros from "../components/Filtros.jsx";

const Pokemons = () => {
    const [data, setData] = useState([])
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

    const [buscandoPorFiltros,setBuscandoPorFiltros] = useState(false)
    const [tipo,setTipo] = useState('all')
    const [generacion,setGeneracion] = useState('all')
    const [habitat,setHabitat] = useState('all')
    let [pokemonsFiltros,setPokemonsFiltros] = useState([])



    const anadirHabitat = async (pokemon) => {
        let apiHabitat = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`)
        let datosHabitat = await apiHabitat.json()
        for (let x = 0; x < datosHabitat.pokemon_species.length; x++) {
            if (datosHabitat.pokemon_species[x].name === pokemon.name) {
                return true
            }
        }
    }

    const anadirGeneracion = (todosLosPokemonsX,datos) => {
        if (generacion==='generation-i'){
            if (datos.id<152){
                return true
            }
        }else if(generacion==='generation-ii'){
            if (datos.id>151 && datos.id<252){
                return true
            }
        }else if(generacion==='generation-iii'){
            if (datos.id>251 && datos.id<387){
                return true
            }
        }else if(generacion==='generation-iv'){
            if (datos.id>386 && datos.id<495){
                return true
            }
        }else if(generacion==='generation-v'){
            if (datos.id>=494 && datos.id<=649){
                return true
            }
        }else if(generacion==='generation-vi'){
            if (datos.id>=650 && datos.id<=721){
                return true
            }
        }else if(generacion==='generation-vii'){
            if (datos.id>=722 && datos.id<=809){
                return true
            }
        }else if(generacion==='generation-viii'){
            if (datos.id>=810 && datos.id<=905){
                return true
            }
        }else if(generacion==='generation-ix'){
            if (datos.id>=906 && datos.id<=1008){
                return true
            }
        }
    }

    const buscarPorFiltros = async () => {
        setPokemonsFiltros((pokemonsFiltros=[]))
        setLoading(true)
        for (let i = 0; i < todosLosPokemons.length; i++) {
                let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${todosLosPokemons[i].name}`)
                let datos = await api.json()
                let tiposPokemon = []
                for (let x=0;x<datos.types.length;x++) {
                    tiposPokemon.push(datos.types[x].type.name)
                }
                if (tipo==='all' && generacion!=='all' && habitat==='all'){
                     if(anadirGeneracion(todosLosPokemons[i],datos)){
                         pokemonsFiltros.push(todosLosPokemons[i])
                     }
                }else if (generacion==='all' && tipo!=='all' && habitat==='all'){
                    if (tiposPokemon.includes(tipo)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo!=='all' && generacion!=='all' && habitat==='all'){
                    if (tiposPokemon.includes(tipo) && anadirGeneracion(todosLosPokemons[i],datos)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo!=='all' && generacion!=='all' && habitat!=='all'){
                    if (tiposPokemon.includes(tipo) && anadirGeneracion(todosLosPokemons[i],datos) && await anadirHabitat(todosLosPokemons[i])){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if(tipo!=='all' && generacion==='all' && habitat!=='all'){
                    if (tiposPokemon.includes(tipo) && await anadirHabitat(todosLosPokemons[i])){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if(tipo==='all' && generacion==='all' && habitat!=='all'){
                    if (await anadirHabitat(todosLosPokemons[i])){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo==='all' && generacion!=='all' && habitat!=='all'){
                    if (await anadirHabitat(todosLosPokemons[i]) && anadirGeneracion(todosLosPokemons,datos)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }
        }
        setBuscandoPorFiltros(true)
        setLoading(false)
    }

    useEffect(()=>{
        ObetenerDatosApiTodosPokemons()
    },[])
    //este useEffect sirev para cuando cambie el offset llame a la funcion , esto nos sirve para la paginacion
    useEffect(()=>{
        ObetenerDatosApi()
    },[offset])

    useEffect(()=>{
        buscarPorFiltros()
    },[generacion,tipo,habitat])


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
                        <Filtros
                            buscarPorFiltros={buscarPorFiltros}
                            pokemonsBusqueda={pokemonsFiltros}
                            tipo={tipo}
                            setTipo={setTipo}
                            generacion={generacion}
                            setGeneracion={setGeneracion}
                            setHabitat={setHabitat}
                            habitat={habitat}
                        />
                    </div>

                    {buscandoPorFiltros && tipo && pokemonsFiltros.length>0 ?
                        <div>
                            <h1 className='h1-busqueda'>Resultados de la busqueda ({pokemonsFiltros.length})</h1>
                            <Cards pokemons={pokemonsFiltros}/>
                        </div>
                        : !buscando ?
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
                                <h1>Primeros resultados ({pokemonBusqueda.length})</h1>
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