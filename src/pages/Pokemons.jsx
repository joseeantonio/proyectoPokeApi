import React, {useEffect, useState} from "react";
import Paginacion from "../components/Paginacion.jsx";
import Cards from "../components/Cards.jsx";
import Filtros from "../components/Filtros.jsx";
import {FadeLoader} from "react-spinners";

const Pokemons = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    //Son el numero de pokemons que se van a mostrar
    const [limit,setLimit] = useState(21)
    //A partir de que pokemon va a ser esos 21
    const [offset,setOffset] = useState(0)
    //N de pagina
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
    //Segun si es un numero o letras va a buscar por id o por nombre
    function añadirPokemon(nombre){
        for (let i=0;i<todosLosPokemons.length;i++){
            if (pokemonBusqueda.length<21){
                if (!isNaN(busqueda)){
                    const split = todosLosPokemons[i].url.split("/")
                    const idPokemon = split[6]
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
        setPokemonsInicio(false)
        restablecerFiltros()
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
        setLoading(true)
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
            datos = datos.results
            console.log(datos)
            let listaDetalles = []
            for (let i=0;i<datos.length;i++){
                let apiDetalles = await fetch(`https://pokeapi.co/api/v2/pokemon/${datos[i].name}`)
                let datosDetalles = await apiDetalles.json()
                datosDetalles.url=datos[i].url
                listaDetalles.push(datosDetalles)
            }
            setTodosLosPokemons(listaDetalles)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    //Estas variables estan definidas para filtrar por tipo, generacion y habitat
    const [buscandoPorFiltros,setBuscandoPorFiltros] = useState(false)
    const [tipo,setTipo] = useState('all')
    const [generacion,setGeneracion] = useState('all')
    const [habitat,setHabitat] = useState('all')
    let [pokemonsFiltros,setPokemonsFiltros] = useState([])

    //Funcion para saber si un pokemon pertenece a ese habitat
    const anadirHabitat = async (pokemon) => {
        let apiHabitat = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`)
        let datosHabitat = await apiHabitat.json()
        for (let x = 0; x < datosHabitat.pokemon_species.length; x++) {
            if (datosHabitat.pokemon_species[x].name === pokemon.name) {
                debugger
                return true
            }
        }
    }
    //Funcion para saber si un pokemon pertenece a esa generacion
    const anadirGeneracion = (datos) => {
        if (generacion==='generation-i'){
            if (datos.id<152){
                debugger
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

    //Funcion para filtrar segun los parametros que esten completados en ese momento
    const buscarPorFiltros = async () => {
        restablecerFiltros()
        setBusqueda('')
        setPokemonsFiltros((pokemonsFiltros=[]))
        setLoading(true)
        for (let i = 0; i < todosLosPokemons.length; i++) {
                let tiposPokemon = []
                for (let x=0;x<todosLosPokemons[i].types.length;x++) {
                    tiposPokemon.push(todosLosPokemons[i].types[x].type.name)
                }
                if (tipo==='all' && generacion!=='all' && habitat==='all'){
                     if(anadirGeneracion(todosLosPokemons[i])){
                         pokemonsFiltros.push(todosLosPokemons[i])
                     }
                }else if (generacion==='all' && tipo!=='all' && habitat==='all'){
                    if (tiposPokemon.includes(tipo)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo!=='all' && generacion!=='all' && habitat==='all'){
                    if (tiposPokemon.includes(tipo) && anadirGeneracion(todosLosPokemons[i])){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo!=='all' && generacion!=='all' && habitat!=='all'){
                    if (tiposPokemon.includes(tipo) && anadirGeneracion(todosLosPokemons[i]) && await anadirHabitat(todosLosPokemons[i])){
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
                    if (anadirGeneracion(todosLosPokemons[i]) && await anadirHabitat(todosLosPokemons[i])){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo==='all' && generacion==='all' && habitat==='all'){
                    setBuscandoPorFiltros(false)
                    setLoading(false)
                    setPokemonsInicio(true)
                    return
                }
        }
        setPokemonsInicio(false)
        setBuscandoPorFiltros(true)
        setLoading(false)
    }
    //Nos sirve para que cuando escriba en el input de busqueda y le de al enter haga la funcion
    const enter = (e) => {
        if (e.key === 'Enter') {
            buscar()
        }
    };

    //este useEffect sirev para cuando cambie el offset llame a la funcion , esto nos sirve para la paginacion
    useEffect(()=>{
        ObetenerDatosApi()
    },[offset])

    //Si cambia alguno de los campos de los filtros se ejecutara esta funcion
    useEffect(()=>{
        buscarPorFiltros()

    },[generacion,tipo,habitat])

    useEffect(()=>{
        ObetenerDatosApiTodosPokemons()
        setPokemonsInicio(true)
    },[])

    const restablecerFiltros = () => {
        setBuscandoPorFiltros(false)
        setBuscando(false)
        setPokemonsInicio(true)
    }
    const [pokemonsInicio,setPokemonsInicio] = useState(true)

    return (
        <div className='Pokemons'>
            {loading || todosLosPokemons.length===0
                ?
                <div className='cargando'>
                    <FadeLoader
                        color="#000000"
                        margin={16}
                        height={42}
                        width={8}
                    />
                </div>
                :
                <div>
                    <div className='encabezado' style={{ backgroundImage: "url(/img_fondo_encabezado.png)" }}>
                        <h1>Listado de Pokemons</h1>
                    </div>
                    <div className='input-busqueda'>
                        <input
                            onKeyPress={enter}
                            type="search"
                            value={busqueda}
                            onChange={handleChange}
                            placeholder="Buscar por nombre o id"
                        />
                        <i className="fas fa-search" onClick={buscar}></i>
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
                    <div className='divRestablecerFiltros'>
                        <button className='btn-restablecer-filtros' onClick={restablecerFiltros}>Restablecer Filtros</button>
                    </div>

                    {buscandoPorFiltros && pokemonsFiltros.length>0 ?
                        <div>
                            <h1 className='h1-busqueda'>Resultados de la busqueda ({pokemonsFiltros.length})</h1>
                            <Cards pokemons={pokemonsFiltros}/>
                        </div>
                        : pokemonsInicio && !buscando ?
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
                        : buscandoPorFiltros && pokemonsFiltros.length===0 && pokemonsInicio===false ?
                            <div>
                                <h1 className='h1-busqueda'>No se ha encontrado ningun pokemon con estas caracteristicas</h1>
                            </div>
                        :buscando && pokemonBusqueda.length===0 ?
                                <div>
                                    <h1 className='h1-busqueda'>No se ha encontrado ningun pokemon con este id o nombre.</h1>
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