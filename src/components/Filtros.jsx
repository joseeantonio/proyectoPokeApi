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
                if (tiposPokemon.includes(tipo)) {
                    pokemonsBusqueda.push(todosPokemons[i])
                }
            }
        }
        console.log(pokemonsBusqueda)
    }

    return(
        <div className='tipos'>
                <select name='tipos' value={tipo} onChange={ (e) => setTipo( e.target.value) }>
                    <option value="grass">Planta</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Luchador</option>
                    <option value="flying">Volador</option>
                    <option value="poison">Veneno</option>
                    <option value="ground">Tierra</option>
                    <option value="rock">Roca</option>
                    <option value="bug">Bicho</option>
                    <option value="poison">Fantasma</option>
                    <option value="steel">Acero</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="electric">Electrico</option>
                    <option value="psychic">Psiquico</option>
                    <option value="ice">Hielo</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Oscuro</option>
                    <option value="fairy">Hada</option>
                </select>
            <button onClick={buscarPorTipo}>Buscar</button>
        </div>
    )

}

export default Filtros