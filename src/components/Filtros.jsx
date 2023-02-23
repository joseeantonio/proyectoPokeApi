import React, {useState} from "react";
import pokemons from "../pages/Pokemons.jsx";

const Filtros = (props) => {

    const [tipo,setTipo] = useState(null)
    const [pokemonsBusqueda,setPokemonsBusqueda] = useState([])
    const [todosPokemons,setTodosPokemons] = useState(props.pokemons)

    const buscarPorTipo = async () => {
        for (let i = 0; i < todosPokemons.length; i++) {
            if (pokemonsBusqueda.length < 21) {
                let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${todosPokemons[i].name}`)
                let datos = await api.json()
                let tiposPokemon = []
                for (let x=0;x<datos.types.length;x++) {
                    tiposPokemon.push(datos.types[x].type.name)
                }
                if (tiposPokemon.includes('grass')) {
                    pokemonsBusqueda.push(todosPokemons[i])
                }
            }
        }
        console.log(pokemonsBusqueda)
    }

    return(
        <div className='tipos'>
                <select name='tipos' value={tipo} onChange={ (e) => setTipo( e.target.value) }>
                    <option value="hierba">Hierba</option>
                    <option value="normal">Normal</option>
                    <option value="luchador">Luchador</option>
                    <option value="volador">Volador</option>
                    <option value="veneno">Veneno</option>
                    <option value="tierra">Tierra</option>
                    <option value="roca">Roca</option>
                    <option value="bicho">Bicho</option>
                    <option value="fantasma">Fantasma</option>
                    <option value="acero">Acero</option>
                    <option value="fuego">Fuego</option>
                    <option value="agua">Agua</option>
                    <option value="electrico">Electrico</option>
                    <option value="psiquico">Psiquico</option>
                    <option value="hielo">Hielo</option>
                    <option value="dragon">Dragon</option>
                    <option value="oscuro">Oscuro</option>
                    <option value="hada">Hada</option>
                    <option value="desconocido">Desconocido</option>
                    <option value="sombra">Sombra</option>
                </select>
            <button onClick={buscarPorTipo}>Buscar</button>
        </div>
    )

}

export default Filtros