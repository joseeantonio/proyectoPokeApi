import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const DetallesPokemon = () => {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [url,setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const ObetenerDetalles = async (url) => {
        try {
            let api = await fetch(url)
            let datos = await api.json()
            setData(datos)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }

    useEffect(()=>{
        ObetenerDetalles(url)
    },[])


    return(
        <div>
            {
                loading
                ?
                <h1>Cargando...</h1>
                    :
                    (<div className='cards' style={{width:'14rem'}}>
                        <div className='card-body'>
                            <p>Foto por delante</p>
                            <img src={data.sprites.front_default} alt="pokemon"/>
                            <p>Foto por detras</p>
                            <img src={data.sprites.back_default} alt="pokemon"/>
                        </div>
                        <div className='card-footer'>
                            <p className='card-text text-capitalize'>Nombre : {data.forms[0].name} </p>
                            <p className='card-text text-capitalize'>Experiencia : {data.base_experience} </p>
                            <p className='card-text text-capitalize'>Altura: {data.height} </p>
                            <p className='card-text text-capitalize'>Peso: {data.weight} </p>
                        </div>
                    </div>)
            }
            </div>
    )

}
export default DetallesPokemon