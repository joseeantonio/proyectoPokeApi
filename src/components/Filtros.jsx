import React from "react";

const Filtros = () => {

    return(
        <div className='tipos'>
            <form action="#">
                <select name='tipos'>
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
                <input type="submit" value='Buscar'/>
            </form>
        </div>
    )

}

export default Filtros