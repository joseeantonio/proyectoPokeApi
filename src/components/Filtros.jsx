import React, {useEffect, useState} from "react";

const Filtros = (props) => {

    return(
        <div className='tipos'>
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
                <option value="dark">Oscuro</option>
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

            <select name="habilidades" value={props.habilidad} onChange={ (e) => props.setHabilidad( e.target.value) }>
                <option value="all">Habilidades</option>
                <option value="stench">stench</option>
                <option value="drizzle">drizzle</option>
                <option value="speed-boost">speed-boost</option>
                <option value="battle-armor">battle-armor</option>
                <option value="sturdy">sturdy</option>
                <option value="damp">damp</option>
                <option value="limber">limber</option>
                <option value="sand-veil">sand-veil</option>
                <option value="static">static</option>
                <option value="volt-absorb">volt-absorb</option>
                <option value="water-absorb">water-absorb</option>
                <option value="oblivious">oblivious</option>
                <option value="cloud-nine">cloud-nine</option>
                <option value="compound-eyes">compound-eyes</option>
                <option value="insomnia">insomnia</option>
                <option value="color-change">color-change</option>
                <option value="immunity">immunity</option>
                <option value="flash-fire">flash-fire</option>
                <option value="shield-dust">shield-dust</option>
                <option value="own-tempo">own-tempo</option>
            </select>
        </div>
    )

}

export default Filtros