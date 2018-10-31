import React, {Component} from "react";
import PropTypes from "prop-types";

import Order from "./Order";

export default class OrderList extends Component {
    constructor(props) {
        super(props);

    }

    renderOrders() {
        return this.props.orders.map((p, i) =>
            <Order
                key={i}
                order={p}>
            </Order>
        );
    }

    render() {
        return (
            <div className="OrderList">
                <h2>Ordenes</h2>
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th>
                            Cliente
                        </th>
                        <th>
                            Cantidad
                        </th>
                        <th>
                            Aceptar
                        </th>
                        <th>
                            Rechazar
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderOrders()}
                    </tbody>
                </table>

            </div>
        );
    }
}
