import React from "react";
import CardPokemon from "./CardPokemon.jsx";

const Cards = ({pokemons}) => {

    //Cogemos lista de objetos pokemons en los que tiene dos atributos el name y la url.
    return (
        <section>
            { pokemons?.map(pokemon => (
                <div key={pokemon.name} className='pokemon'>
                    <li key={pokemon.name}>
                        <CardPokemon
                            urlDetalles={pokemon.url}
                        />
                    </li>
                </div>
            ))
            }
        </section>
    )
}


export default Cards