import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BeatLoader} from "react-spinners";

const CardPokemon = (props) => {
    //Este componente sirve para recibir la url de un pokemons por props y sacar la informacion para crear una carta

    const [data,setData] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [url,setUrl] = useState(props.urlDetalles)

    //Cogemos los datos
    async function getDatos(url) {
        try {
            const resp = await fetch(url)
            const data = await resp.json()
            setData(data)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    //Cada vez que recibimos un props nuevo se ejecuta esta funcion ya que la url la cogemos del props
    useEffect(()=>{
        getDatos(url)
    },[url])

    return(
        <div className='CardPokemon'>
            {
                loading
                ?
                    <div className='carta'>
                        <div className='cargando-card'>
                            <BeatLoader
                                color="#000000"
                            />
                        </div>
                    </div>
                    :
                    <div className='carta'>
                        <Link to={`/pokemons/${data.id}`}>
                            <img src={data.sprites.front_default}/>
                            <h3>{data.name}</h3>
                        </Link>
                    </div>
            }
        </div>
    )
}
export default CardPokemon