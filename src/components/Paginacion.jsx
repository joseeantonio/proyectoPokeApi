import React from "react";

const Paginacion = (props) => {
    //Obtenemos como props el offset que vamos a utilizar como a partir de que pokemons vamos a mostrar y siempre seran 21 en total,
    // y tambien recibimos varias funuciones como pagSiguiente y pagAnterior que van a modicficar el offset, segun el
    // offset mostrara el boton de pagAnterior o no
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