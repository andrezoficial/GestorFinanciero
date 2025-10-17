import React from "react";
import { Link } from "react-router-dom";

export const Card_data = ({children}) => {
    return (
        <div className="card-data" id="card-data">
            {children}
        </div>
    );
};

export const Tittle_card = ({ children }) => {
    return (
        <h2 className="tittle-card">{children}</h2>
    );
};

export const Parrafo = ({children}) => {
    return (
        <div className="parrafo" id="parrafo">
            {children}
        </div>
    );
};

export const Number_card = ({ children }) => {
    return (
        <p className="number-card">{children}</p>
    );
};


export const Card_ilustration = ({children}) => {
    return (
        <div className="card_ilustration" id="card_ilustration">
            {children}
        </div>
    );
};

