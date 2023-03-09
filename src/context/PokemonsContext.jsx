import {createContext, useContext, useEffect, useState} from 'react'

export const PokemonContext = createContext()
const PokemonProvider = ({ children }) => {

    const [todosLosPokemons,setTodosLosPokemons] = useState([])
    //cojo todos los pokemons para filtrar la busqueda
    const ObetenerDatosApiTodosPokemons = async () => {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            let datos = await api.json()
            datos = datos.results
            for (let i=0;i<datos.length;i++){
                let apiDetalles = await fetch(`https://pokeapi.co/api/v2/pokemon/${datos[i].name}`)
                let datosDetalles = await apiDetalles.json()
                datosDetalles.url=datos[i].url
                todosLosPokemons.push(datosDetalles)
            }
        }finally {
        }
        return
    }

    useEffect(()=>{
        ObetenerDatosApiTodosPokemons()
    },[])

    return (
        <PokemonContext.Provider value={{ todosLosPokemons,setTodosLosPokemons }}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider

export const usePokemonContext = () => useContext(PokemonContext)
