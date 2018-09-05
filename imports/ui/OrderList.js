import React, { Component } from "react";
import PropTypes from "prop-types";

import Order from "./Order";

export default class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderOrders() {
    return this.props.orders.map((p,i) =>
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
        {this.renderOrders()}
      </div>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
};
