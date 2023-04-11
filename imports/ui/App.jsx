import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import { Orders } from "../api/orders";

import AccountsUIWrapper from "./AccountsUIWrapper.js";
import { Meteor } from "meteor/meteor";
import ReqList from "./ReqList";
import AdminInput from "./AdminInput";

import Countdown from "react-countdown-now";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulation: false,
            end: false,
            iteration: 0,
            beginsAt: new Date().valueOf(),
            countdownBegin: Date.now(),
            simTime: 0,
            primero: 6,
            puntaje: 0,
        };
        this.contadorfaltantes = {
            "JCPlanta@gmail.com": 0,
            "JCCentroDistribucion@gmail.com": 0,
            "JCMinorista1@gmail.com": 0,
            "JCMinorista2@gmail.com": 0,
            "JCMinorista3@gmail.com": 0,
            "JCMinorista4@gmail.com": 0,
        };
        this.simulate = this.simulate.bind(this);
        this.endSimulation = this.endSimulation.bind(this);
        this.restart = this.restart.bind(this);
        this.printResults = this.printResults.bind(this);
        this.copy = this.copy.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updatePuntaje = this.updatePuntaje.bind(this);
    }

    async updatePuntaje() {
        let puntaje = 0;
        let contadorInventarios = {
            "JCMinorista1@gmail.com": 7,
            "JCMinorista2@gmail.com": 7,
            "JCMinorista3@gmail.com": 7,
            "JCMinorista4@gmail.com": 7,
            "JCCentroDistribucion@gmail.com": 15,
        };
        let contadorfaltantes = {
            "JCPlanta@gmail.com": 0,
            "JCCentroDistribucion@gmail.com": 0,
            "JCMinorista1@gmail.com": 0,
            "JCMinorista2@gmail.com": 0,
            "JCMinorista3@gmail.com": 0,
            "JCMinorista4@gmail.com": 0,
        };

        await this.props.all.forEach((item) => {
            if (isNaN(item.amount)) {
                return; // Skip this iteration
            }
            //Actualizamos Contador
            if (
                !(
                    item.providerEmail.includes("JCPlanta") ||
                    item.providerEmail.includes("cliente")
                )
            ) {
                contadorInventarios[item.providerEmail] -= item.answered
                    ? item.amount
                    : 0;
            }
            if (contadorInventarios[item.clientEmail] !== undefined) {
                //Si no existe, devuelve undefined y no entra a if
                contadorInventarios[item.clientEmail] += item.answered ? item.amount : 0;
            }

            //Actualizar Suma
            if (item.providerEmail.includes("JCMinorista")) {
                //Si es minorista
                if (item.expired || (item.answered & !item.result & !item.expired)) {
                    puntaje -= 500;
                    contadorfaltantes[item.providerEmail] += item.amount;
                } // Se penaliza si el pedido expira o se rechaza y se suma a contador de faltantes
                if (item.answered) {
                    puntaje += item.amount * 1110;
                } //Y Si se responde la orden
                puntaje -= contadorInventarios[item.providerEmail] * 6; //Y si mantiene inventario
                
                
            }

            if (item.providerEmail.includes("JCCentro")) {
                //Si es centro
                if (item.expired || (item.answered & !item.result & !item.expired)) {
                    puntaje -= 460;
                    contadorfaltantes[item.providerEmail] += item.amount;
                } // Y si se expira
                if (item.result) {
                    puntaje -= 115;
                } // Y si Aceptado
                puntaje -= contadorInventarios[item.providerEmail] * 3; // Y si mantiene inventario
            }

            if (item.providerEmail.includes("JCPlanta")) {
                if (item.result) puntaje -= 50 * item.amount - 150; //Y si Aceptado
                if (item.expired || (item.answered & !item.result & !item.expired)) {
                    contadorfaltantes[item.providerEmail] += item.amount;
                }
            }
        });
        this.setState({ puntaje: puntaje, contadorfaltantes: contadorfaltantes });
    }

    onAdd(amount) {
        Meteor.call("orders.insert", amount);
    }

    onSubmit(simulationTime, intervalTime, orderTime) {
        this.setState({ simulation: true });
        let inicio = new Date().valueOf();
        this.setState({ beginsAt: inicio });
        this.setState({ countdownBegin: Date.now() });
        this.setState({ simTime: simulationTime * 60000 });

        const id = Meteor.setInterval(this.simulate, intervalTime * 1000);
        Meteor.setTimeout(this.endSimulation.bind(null, id), simulationTime * 60000);

        const id2 = Meteor.setInterval(this.expire.bind(null, orderTime * 1000), 1000);
        Meteor.setTimeout(this.endSimulation.bind(null, id2), simulationTime * 60000);
    }

    simulate() {
        const a = 33;
        const c = 5;
        const m = 32;

        let nuevo = (a * this.state.primero + c) % m;

        let r = nuevo / m;

        this.setState({ primero: nuevo });
        this.setState({ iteration: this.state.iteration + 1 });
        Meteor.call("orders.simulate", r);
    }

    expire(time) {
        Meteor.call("orders.checkExpired", time);
    }

    endSimulation(id) {
        Meteor.clearInterval(id);
        Meteor.call("orders.delete");
        this.setState({ end: true });
        this.updatePuntaje();
    }

    restart() {
        this.setState({
            simulation: false,
            end: false,
            iteration: 0,
        });
    }

    copy() {
        /* Get the text field */
        let copyText = document.getElementById("results");

        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert */
        alert("Los resultados fueron copiados al portapapeles");
    }

    tablaFaltantes() {
        const { contadorfaltantes } = this.state;
    
        if (!contadorfaltantes) {
            return null;
        }
    
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Faltantes</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(contadorfaltantes).map((provider) => (
                        <tr key={provider}>
                            <td>{provider}</td>
                            <td>{contadorfaltantes[provider]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    printResults() {
        let results = "[";
        this.props.all.forEach((item) => {
            let amount = item.amount;
            let answered = item.answered;
            let result = item.result ? "Aceptado" : "Rechazado";
            let clientEmail = item.clientEmail;
            let providerEmail = item.providerEmail;
            let Ctime = item.createdAt;
            let Atime = item.acceptedAt - this.state.beginsAt;
            let Dtime = item.declinedAt - this.state.beginsAt;
            let Vencido = item.expired;

            let entry = `{"cantidad": "${amount}","estado": "${!answered ? "En espera de respuesta" : result
                }","cliente": "${clientEmail}","proveedor": "${providerEmail}", "tiempoCreacion": "${Ctime}", "tiempoAceptar": "${Atime}", "tiempoDeclinar": "${Dtime}" },`;
            results = results.concat(entry);
        });

        results = results.substr(0, results.length - 1);
        if (results.length > 5) results = results.concat("]");
        return results;
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>IIND 3221 Logística: Beer Game</h1>

                    <div id="sign-in-place">
                        <AccountsUIWrapper />
                    </div>

                    <hr />

                    <Countdown
                        date={this.state.countdownBegin + this.state.simTime}
                    ></Countdown>

                    <hr />

                    <div className="col-md-12 jumbotron">
                        {this.props.user &&
                            !Roles.userIsInRole(Meteor.userId(), "admin") ? (
                            <div className="col-sm-12">
                                {Roles.userIsInRole(Meteor.userId(), "planta") ? (
                                    ""
                                ) : (
                                    <OrderAdd onAdd={this.onAdd.bind(this)}></OrderAdd>
                                )}
                                <OrderList orders={this.props.orders}></OrderList>
                                <ReqList reqs={this.props.reqs}></ReqList>
                            </div>
                        ) : (
                            <div>
                                {this.props.user &&
                                    Roles.userIsInRole(Meteor.userId(), "admin") ? (
                                    <div>
                                        <h2>Admin</h2>
                                        {this.state.simulation ? (
                                            <div>
                                                <h3>Iteración: {this.state.iteration}</h3>
                                                <Countdown
                                                    date={this.state.countdownBegin + this.state.simTime}
                                                ></Countdown>
                                                {this.state.end ? (
                                                    <div>
                                                        <div className="col-row">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={this.restart}
                                                            >
                                                                Reiniciar
                                                            </button>
                                                            <button
                                                                className="btn btn-default"
                                                                onClick={this.copy}
                                                            >
                                                                Copiar resultados
                                                            </button>
                                                        </div>
                                                        <div className="col-row">
                                                            <h3>Resultados: {this.state.puntaje}</h3>
                                                            {this.tablaFaltantes()} 
                                                        </div>
                                                        <div className="col-row">
                                                            <textarea
                                                                className="boxsizingBorder"
                                                                id="results"
                                                                defaultValue={this.printResults()}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        ) : (
                                            <AdminInput
                                                onSubmit={this.onSubmit.bind(this)}
                                            ></AdminInput>
                                        )}
                                    </div>
                                ) : (
                                    <h3>
                                        Inicia sesión para realizar pedidos y manejar ordenes.
                                    </h3>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("Orders");
    return {
        user: Meteor.user(),
        all: Orders.find({}).fetch(),
        orders: Orders.find({ provider: Meteor.userId() }).fetch(),
        reqs: Orders.find({ client: Meteor.userId() }).fetch(),
    };
})(App);
