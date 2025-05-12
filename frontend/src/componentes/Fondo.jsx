import React from "react";
import "./Fondo.css";
import burgerBlur from '../assets/burger-blur.png';

function Fondo({children}) {
    return (
        <>
        <div className="fondo">
            <img className="imagen-left-top" alt = 'Imagen Fondo'src={burgerBlur}></img>
            <img className="imagen-right-top" alt = 'Imagen Fondo' src={burgerBlur}></img>
            <img className="imagen-left-bottom" alt = 'Imagen Fondo' src={burgerBlur}></img>
            <img className="imagen-right-bottom" alt = 'Imagen Fondo' src={burgerBlur}></img>
            {children}
        </div>
        
        </>
    );
}
   
export default Fondo;
    