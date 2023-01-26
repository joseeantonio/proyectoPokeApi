import React from "react";

const Paginacion = (props) => {

    //console.log(props)

    return(


                props.offset<=0
                ?
                    (
                        <div className='paginacion'>
                            <h1>{props.pagina}</h1>
                            <button className='btn btn-outline-dark' onClick={props.pagSiguiente}>Siguiente</button>
                        </div>
                            )
                    : (

                        <div className='paginacion' >
                            <button className='btn btn-outline-dark' onClick={props.pagAnterior}>Anterior</button>
                            <h1>{props.pagina}</h1>
                            <button className='btn btn-outline-dark' onClick={props.pagSiguiente}>Siguiente</button>
                        </div>
                    )
    )

}
export default Paginacion