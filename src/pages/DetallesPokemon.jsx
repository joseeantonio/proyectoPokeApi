import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const DetallesPokemon = () => {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [url,setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [descripcion,setDescripcion] = useState()
    const [tipos,setTipos] = useState([])

    const ObetenerDetalles = async (url) => {
        try {
            let api = await fetch(url)
            let datos = await api.json()
            setData(datos)
            let descripcion = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
            let datosDescripcion = await descripcion.json()
            for (let x=0;x<datos.types.length;x++) {
                if (datos.types[x].type.name==='grass'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Planta</h4>)
                }
                else if (datos.types[x].type.name==='normal'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Normal</h4>)
                }
                else if (datos.types[x].type.name==='flying'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Volador</h4>)
                }
                else if (datos.types[x].type.name==='fighting'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Luchador</h4>)
                }
                else if (datos.types[x].type.name==='poison'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Veneno</h4>)
                }
                else if (datos.types[x].type.name==='ground'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Tierra</h4>)
                }
                else if (datos.types[x].type.name==='rock'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Roca</h4>)
                }
                else if (datos.types[x].type.name==='bug'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Bicho</h4>)
                }
                else if (datos.types[x].type.name==='ghost'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Fantasma</h4>)
                }
                else if (datos.types[x].type.name==='steel'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Acero</h4>)
                }
                else if (datos.types[x].type.name==='fire'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Fuego</h4>)
                }
                else if (datos.types[x].type.name==='water'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Agua</h4>)
                }
                else if (datos.types[x].type.name==='electric'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Electrico</h4>)
                }
                else if (datos.types[x].type.name==='psychic'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Psiquico</h4>)
                }
                else if (datos.types[x].type.name==='ice'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Hielo</h4>)
                }
                else if (datos.types[x].type.name==='dragon'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Dragon</h4>)
                }
                else if (datos.types[x].type.name==='dark'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Siniestro</h4>)
                }
                else if (datos.types[x].type.name==='fairy'){
                    tipos.push(<h4 className={datos.types[x].type.name}>Hada</h4>)
                }
            }
            for (let i=0;i<datosDescripcion.descriptions.length;i++){
                if (datosDescripcion.descriptions[i].language.name==='es'){
                    setDescripcion(datosDescripcion.descriptions[i].description)
                    return
                }
            }
            setDescripcion(datosDescripcion)
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
        <div className='DetallesPokemon'>
            {
                loading
                ?
                <h1>Cargando...</h1>
                    :
                    (<div>
                        <div className='descripcion-img'>
                            <div className='imagenPokemon'>
                                <h1>{data.forms[0].name}</h1>
                                <img src={data.sprites.other['official-artwork'].front_default} alt="pokemon"/>
                            </div>
                            <div className='descripcion'>
                                <p>Tiene una altura de {data.height}cm y un peso de {data.weight}kg ,hemos podido
                                comprobar que a {data.name} {descripcion}. Tiene una experiencia de {data.base_experience}XP
                                </p>
                            </div>
                        </div>
                        <div className='tipos'>
                            {tipos}
                        </div>
                    </div>)
            }
            </div>
    )

}
export default DetallesPokemon