import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";


import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import {Orders} from "../api/orders";

import AccountsUIWrapper from './AccountsUIWrapper.js';
import {Meteor} from "meteor/meteor";
import ReqList from "./ReqList";
import AdminInput from "./AdminInput";

import Countdown from 'react-countdown-now';


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
            primero: 6
        }
        this.simulate = this.simulate.bind(this);
        this.endSimulation = this.endSimulation.bind(this);
        this.restart = this.restart.bind(this);
        this.printResults = this.printResults.bind(this);
        this.copy = this.copy.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onAdd(amount) {
        Meteor.call("orders.insert", amount);
    }


    onSubmit(simulationTime, intervalTime, orderTime) {
        this.setState({simulation: true});
        let inicio = new Date().valueOf();
        this.setState({beginsAt: inicio});
        this.setState({countdownBegin:Date.now()});
        this.setState({simTime: simulationTime * 60000});


        const id = Meteor.setInterval(this.simulate, intervalTime * 1000);
        Meteor.setTimeout(this.endSimulation.bind(null, id), simulationTime * 60000)

        const id2 = Meteor.setInterval(this.expire.bind(null,orderTime*1000), 1000);
        Meteor.setTimeout(this.endSimulation.bind(null, id2), simulationTime * 60000)
    }

    simulate() {

        const a = 33;
        const c = 5;
        const m = 32;

    
            
        let nuevo = (a * this.state.primero + c) % m;

        let r = nuevo / m;

        this.setState({primero: nuevo})
        this.setState({iteration: this.state.iteration + 1});
        Meteor.call("orders.simulate", r);
    }

    expire(time) {
        Meteor.call("orders.checkExpired", time);
    }

    endSimulation(id) {
        Meteor.clearInterval(id);
        Meteor.call("orders.delete");
        this.setState({end: true});
    }

    restart() {
        this.setState({
            simulation: false,
            end: false,
            iteration: 0
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

            let entry =
                `{"cantidad": "${amount}","estado": "${!answered?"En espera de respuesta":result}","cliente": "${clientEmail}","proveedor": "${providerEmail}", "tiempoCreacion": "${Ctime}", "tiempoAceptar": "${Atime}", "tiempoDeclinar": "${Dtime}" },`;
            results = results.concat(entry);
        });
        results = results.substr(0,results.length-1);
        if (results.length>5)results = results.concat("]");
        
        return results;
    }

    
        

    render() {

        return (
            <div className="App">

                <div className="container">


                    <h1>Lúdica Logística AIA</h1>

                    <div id="sign-in-place">
                        <AccountsUIWrapper/>
                    </div>

                    <hr/>

                        <Countdown date={this.state.countdownBegin + this.state.simTime}>
                        
                     </Countdown>

                    <hr/>
                    
                    <div className="col-md-12 jumbotron">

                        {this.props.user && !Roles.userIsInRole(Meteor.userId(), "admin") ?

                            <div className="col-sm-12">
                                {Roles.userIsInRole(Meteor.userId(), "planta") ?
                                    ""
                                    :
                                    <OrderAdd
                                        onAdd={this.onAdd.bind(this)}
                                    >
                                    </OrderAdd>
                                }
                                <OrderList
                                    orders={this.props.orders}
                                >
                                </OrderList>
                                <ReqList
                                    reqs={this.props.reqs}
                                >
                                </ReqList>
                            </div>
                            :
                            <div>
                                {this.props.user && Roles.userIsInRole(Meteor.userId(), "admin") ?
                                    <div>
                                        <h2>Admin</h2>
                                        {this.state.simulation ?
                                            <div>
                                                <h3>Iteración: {this.state.iteration}</h3>
                                                <Countdown date={this.state.countdownBegin + this.state.simTime}>

                                                </Countdown>
                                                {this.state.end ?
                                                    <div>
                                                        <div className="col-row">
                                                            <button className="btn btn-primary" onClick={this.restart}>
                                                                Reiniciar
                                                            </button>
                                                            <button className="btn btn-default" onClick={this.copy}>
                                                                Copiar resultados
                                                            </button>
                                                        </div>
                                                        <div className="col-row">
                                                            <textarea className="boxsizingBorder"
                                                                      id="results" defaultValue={this.printResults()}></textarea>
                                                        </div>
                                                    </div>
                                                    : ""
                                                }
                                            </div>
                                            :
                                            <AdminInput onSubmit={this.onSubmit.bind(this)}></AdminInput>
                                        }
                                    </div>
                                    :
                                    <h3>Inicia sesión para realizar pedidos y manejar ordenes.</h3>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}



export default withTracker(
    () => {
        Meteor.subscribe("Orders");
        return {
            user: Meteor.user(),
            all: Orders.find({}).fetch(),
            orders: Orders.find({provider: Meteor.userId()}).fetch(),
            reqs: Orders.find({client: Meteor.userId()}).fetch()
        };
    }
)(App);









