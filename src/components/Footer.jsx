import React from "react";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div className='Footer'>
            <footer>
                <NavLink to="#">cookie</NavLink>
                <NavLink to="#">politica de privacidad</NavLink>
                <NavLink to="#">aviso legal</NavLink>
                <div>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter-square"></i>
                </div>
            </footer>
        </div>
    )
}
export default Footer