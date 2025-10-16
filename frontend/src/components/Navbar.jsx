import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <header id="header">
            <div className="contenido-header">
                <div className="logo">
                    <h1>Finanzas</h1>
                </div>
                <nav className="nav">
                    <ul className="links">
                        <li className="link"><Link to="/" className="a">Inicio</Link></li>
                        <li className="link"><Link to="/" className="a">Ingresos</Link></li>
                        <li className="link"><Link to="/" className="a">Egresos</Link></li>
                        <li className="link"><Link to="/" className="a">Reportes</Link></li>
                        <li><Link to="/login" className="a login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};