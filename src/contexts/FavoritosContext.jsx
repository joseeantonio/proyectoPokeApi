import React from "react";

const FavoritosContext = React.createContext({
    pokemonsFavoritos: [],
    // actualizarPokemon: (nombre) => null
})

export const FavoritosProvider = FavoritosContext.Provider

export default FavoritosContext