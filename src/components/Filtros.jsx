import React, {useEffect, useState} from "react";

const Filtros = (props) => {

    return(
        <div className='filtros'>
            <select name='tipos' value={props.tipo} onChange={ (e) => props.setTipo( e.target.value) }>
                <option value="all">Tipos</option>
                <option value="grass">Planta</option>
                <option value="normal">Normal</option>
                <option value="fighting">Luchador</option>
                <option value="flying">Volador</option>
                <option value="poison">Veneno</option>
                <option value="ground">Tierra</option>
                <option value="rock">Roca</option>
                <option value="bug">Bicho</option>
                <option value="ghost">Fantasma</option>
                <option value="steel">Acero</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="electric">Electrico</option>
                <option value="psychic">Psiquico</option>
                <option value="ice">Hielo</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Siniestro</option>
                <option value="fairy">Hada</option>
            </select>

            <select name="generaciones" value={props.generacion} onChange={ (e) => props.setGeneracion( e.target.value) }>
                <option value="all">Generaciones</option>
                <option value="generation-i">Generacion-i</option>
                <option value="generation-ii">Generacion-ii</option>
                <option value="generation-iii">Generacion-iii</option>
                <option value="generation-iv">Generacion-iv</option>
                <option value="generation-v">Generacion-v</option>
                <option value="generation-vi">Generacion-vi</option>
                <option value="generation-vii">Generacion-vii</option>
                <option value="generation-viii">Generacion-viii</option>
                <option value="generation-ix">Generacion-ix</option>
            </select>

            <select name="habitats" value={props.habitat} onChange={ (e) => props.setHabitat( e.target.value)}>
                <option value="all">Habitats</option>
                <option value="cave">Cueva</option>
                <option value="forest">Bosque</option>
                <option value="grassland">Pradera</option>
                <option value="mountain">Montaña</option>
                <option value="rare">Extraño</option>
                <option value="rough-terrain">Terreno dificil</option>
                <option value="sea">Mar</option>
                <option value="urban">Urbano</option>
                <option value="waters-edge">Borde del agua</option>
            </select>
        </div>
    )

}

export default Filtros