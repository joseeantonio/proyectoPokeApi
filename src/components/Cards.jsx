import React from "react";
import CardPokemon from "./CardPokemon.jsx";

const Cards = ({pokemons}) => {
    return (
        <section>
            {pokemons.map(pokemon => (
                <div className='pokemon'>
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