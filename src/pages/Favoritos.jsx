import React, {useEffect, useState} from "react";
import Cards from "../components/Cards.jsx";

const Favoritos = (props) => {

    const [listaPokemons,setListaPokemons] = useState([])


    const ordenarDatos = () => {

        let favoritos = []
        if (JSON.parse(localStorage.getItem('favoritos'))){
            favoritos = JSON.parse(localStorage.getItem('favoritos'))
            let lista = []
            for (let i=0;i<favoritos.length;i++){
                let nombre = favoritos[i].name
                let url = `https://pokeapi.co/api/v2/pokemon/${favoritos[i].id}`
                const pokemon = {
                    nombre,url
                }
                lista.push(pokemon)
            }
            setListaPokemons(lista)
        }
    }

    useEffect(()=> {
        ordenarDatos()
    },[])

    return(
        <div className='Pokemons'>
            <h1 className='h1-favoritos'>Tienes {listaPokemons.length} favoritos</h1>
            <Cards
                pokemons={listaPokemons}
            />
        </div>
    )

}
export default Favoritos