import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Pedido extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }



  render() {
    return (
      <div className="Pedido">

        <div>Cliente </div>
        <div>Proveedor </div>
        <div>Unidades </div>
        
      </div>
    );
  }
}

Pedido.propTypes = {
  order: PropTypes.object.isRequired,
};
