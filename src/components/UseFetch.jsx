import React, {useEffect, useState} from "react";

const UseFetch = (url) => {

    const [data, setData] = useState();
    // const [loading, setLoading] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    async function getDatos(url) {
        try {
            const resp = await fetch(url)
            const datos = await resp.json()

            setData(datos)
        }catch (e){
            setError('No se ha podido coger los datos de la api')
        }finally {
            setLoading(false)
        }
        return
    }
    return data

    useEffect(()=>{
        getDatos(url)
    },[url])


}
export default UseFetch