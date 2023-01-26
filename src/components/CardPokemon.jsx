import React, {useEffect, useState} from "react";

const CardPokemon = (props) => {

    const [data,setData] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [url,setUrl] = useState(props.urlDetalles)

    async function getDatos(url) {
        try {
            const resp = await fetch(url)
            const data = await resp.json()
            console.log(data)
            setData(data)

        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }
    useEffect(()=>{
        getDatos(url)
    },[url])


    return(
        <div>
            {
                loading
                ?
                    <h1>Cargando...</h1>
                    :
                    <div className='cards' style={{width:'220px'}}>
                        <div className='cards-header'>
                            <h5 className='card-title'>Nº{data.id} </h5>
                        </div>
                        <div className='card-body'>
                            <img src={data.sprites.front_default} alt="pokemon"/>
                        </div>
                        <div className='card-footer'>
                            <p className='card-text text-capitalize'> {data.forms[0].name} </p>
                        </div>
                        <br/>
                        <br/>
                    </div>
            }
        </div>
    )

}
export default CardPokemon