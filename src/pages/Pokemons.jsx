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
    const [habilidad,setHabilidad] = useState('all')
    let [pokemonsFiltros,setPokemonsFiltros] = useState([])


    const anadirGeneracion = (todosLosPokemonsX,generacion,datos) => {
        if (generacion==='generation-i'){
            if (datos.id<152){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-ii'){
            if (datos.id>151 && datos.id<252){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-iii'){
            if (datos.id>251 && datos.id<387){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-iv'){
            if (datos.id>386 && datos.id<495){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-v'){
            if (datos.id>=494 && datos.id<=649){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-vi'){
            if (datos.id>=650 && datos.id<=721){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-vii'){
            if (datos.id>=722 && datos.id<=809){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-viii'){
            if (datos.id>=810 && datos.id<=905){
                pokemonsFiltros.push(todosLosPokemonsX)
            }
        }else if(generacion==='generation-ix'){
            if (datos.id>=906 && datos.id<=1008){
                pokemonsFiltros.push(todosLosPokemonsX)
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
                // let generaciones = []
                // for (let x=0;x<datos.past_types.length;x++){
                //     generaciones.push(datos.past_types[x].generation.name)
                // }
                let habilidades = []
                for (let x=0;x<datos.abilities.length;x++){
                    habilidades.push(datos.abilities[x].ability.name)
                }
                if (tipo==='all' && generacion!=='all' && habilidad==='all'){
                    anadirGeneracion(todosLosPokemons[i],generacion,datos)
                }else if (generacion==='all' && tipo!=='all' && habilidad==='all'){
                    debugger
                    if (tiposPokemon.includes(tipo)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                    debugger
                }else if (tipo!=='all' && generacion!=='all' && habilidad==='all'){
                    if (tiposPokemon.includes(tipo)){
                        anadirGeneracion(todosLosPokemons[i],generacion,datos)
                    }
                }else if (tipo==='all' && generacion==='all' && habilidad!=='all'){
                    if (habilidades.includes(habilidad) ){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }else if (tipo==='all' && generacion!=='all' && habilidad!=='all'){
                    if (habilidades.includes(habilidad) ){
                        anadirGeneracion(todosLosPokemons[i],generacion,datos)
                    }
                }else if (tipo!=='all' && generacion!=='all' && habilidad!=='all'){
                    if (tiposPokemon.includes(tipo) && habilidades.includes(habilidad)){
                        anadirGeneracion(todosLosPokemons[i],generacion,datos)
                    }
                }else if(tipo!=='all' && generacion==='all' && habilidad!=='all'){
                    if (tiposPokemon.includes(tipo) && habilidades.includes(habilidad)){
                        pokemonsFiltros.push(todosLosPokemons[i])
                    }
                }
            //    FILTRAR POR HABILIDADES
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
    },[generacion,tipo,habilidad])


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
                            setHabilidad={setHabilidad}
                            habilidad={habilidad}
                        />
                    </div>

                    {buscandoPorFiltros && tipo && pokemonsFiltros.length>0 ?
                        <div>
                            <h1>Primeros resultados ({pokemonsFiltros.length})</h1>
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