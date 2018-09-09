import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTracker} from "meteor/react-meteor-data";


import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import {Orders} from "../api/orders";

import AccountsUIWrapper from './AccountsUIWrapper.js';
import {Meteor} from "meteor/meteor";
import ReqList from "./ReqList";


export class App extends Component {
    constructor(props) {
        super(props);

    }

    onAdd(amount) {
        Meteor.call("orders.insert", amount);
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">

                <div className="container">
                    <h1>Lúdica Logística AIA</h1>

                    <div id="sign-in-place">
                        <AccountsUIWrapper/>
                    </div>

                    <hr/>

                    <div className="col-md-12 jumbotron">

                        {this.props.user?
                            <div className="col-sm-12">
                                {Roles.userIsInRole(Meteor.userId(), "planta")?
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
                            <h3>Inicia sesión para realizar pedidos y manejar ordenes.</h3>
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
            orders: Orders.find({provider: Meteor.userId()}).fetch(),
            reqs: Orders.find({client: Meteor.userId()}).fetch()
        };
    }
)(App);









