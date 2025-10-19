import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Tittle_card, Card_data, Number_card, Card_ilustration, Parrafo } from "../components/inicio_components";
import { ChartFinanzas } from "../components/ChartFinanzas";
import { FinanzasProvider } from "../context/FinanzasContext";
import { ButtonsSelector } from "../components/ButtonsSelector";

export const Inicio = () => {
    return (
        <FinanzasProvider>
            <div id="inicio">
                <div className="cards">
                    <Card_data>
                        <Tittle_card>Balance Total</Tittle_card>
                        <Number_card>$0</Number_card>
                    </Card_data>

                    <Card_data>
                        <Tittle_card>Ingresos</Tittle_card>
                        <Number_card>$0</Number_card>
                    </Card_data>

                    <Card_data>
                        <Tittle_card>Egresos</Tittle_card>
                        <Number_card>$0</Number_card>
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
                            <div style={{ textAlign: "center", marginTop: "40px" }}>
                                <ButtonsSelector />
                                <ChartFinanzas />
                            </div>
                        </Card_ilustration>
                    </div>
                </div>
            </div>
        </FinanzasProvider>
    );
};