import React from "react";
import { Outlet } from 'react-router-dom'
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";

//A este layout podra acceder cualquiera sin necesidad de estar regitrado
const LayoutPublic = () => {
    return(
        <main>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}
export default LayoutPublic