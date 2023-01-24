import React from "react";

const Paginacion = (props) => {

    //console.log(props)

    return(
        <div className='botones'>
            <button className='BotonAtras' onClick={props.pagAnterior}>izq</button>
            <br/>
            <button className='botonAlante' onClick={props.pagSiguiente}>drch</button>
        </div>
    )

}
export default Paginacion