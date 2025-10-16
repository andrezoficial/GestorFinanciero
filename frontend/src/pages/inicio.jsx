import React from "react";
import { Link } from "react-router-dom";
import { Tittle_card, Card_data, Number_card, Card_ilustration, Parrafo } from "../components/inicio_components";


export const Inicio = () => {

    return (
        <div id="inicio">
            <div className="cards">
                <Card_data>
                    <Tittle_card>Balance Total</Tittle_card>
                    <Number_card>$00.0</Number_card>
                </Card_data>

                <Card_data>
                    <Tittle_card>Ingresos</Tittle_card>
                    <Number_card>$00.0</Number_card>
                </Card_data>

                <Card_data>
                    <Tittle_card>Egresos</Tittle_card>
                    <Number_card>$00.0</Number_card>
                </Card_data>
            </div>

            <div className="panel">
                <div className="agregar-list">
                    <h3>Nueva Transaccion</h3>
                    <p>Registra tus gastos e ingresos</p>
                    <Card_data>
                        <Tittle_card>Agregar gastos</Tittle_card>
                    </Card_data>
                    <Card_data>
                        <Tittle_card>Agregar Ingresos</Tittle_card>
                    </Card_data>
                </div>
                <div className="grafica">
                    <Card_ilustration>
                        <Tittle_card>Grafica de transacciones</Tittle_card>
                        <Parrafo>Grafica de todas tus transacciones </Parrafo>

                        <div className="mensaje">
                            <Tittle_card>Aun no hay Transacciones realizadas</Tittle_card>
                            <Parrafo>Inicializa una Transaccion para comenzar </Parrafo>
                            <Link to="/" className="btnIniciar">Iniciar transaccion</Link>
                        </div>
                    </Card_ilustration>
                </div>
            </div>
        </div>
    );
};