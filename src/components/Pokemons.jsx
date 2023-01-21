import React, {useEffect, useState} from "react";

const Pokemons = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagina,setPagina] = useState()
    const [limit,setLimit] = useState(30)
    const [offset,setOffset] = useState(0)

    const ObetenerDatosApi = async () => {
        try {
            let api = await fetch('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset)
            let datos = await api.json()
            setData(datos)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
    }

    if (data!=={}){
        console.log(data.results)
    }

    useEffect(()=>{
        ObetenerDatosApi()
    },[])

    return (
        <div>

        </div>
    )
}
export default Pokemons