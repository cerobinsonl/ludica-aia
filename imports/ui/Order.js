import React, { Component } from "react";

export default class Order extends Component {
  constructor(props) {
    super(props);
  }


    accept() {
        Meteor.call("orders.accept", this.props.order._id);
    }

    decline() {
        Meteor.call("orders.decline", this.props.order._id);
    }

    textoAceptada() {
      if (this.props.order.answered&&this.props.order.result) return "Aceptada";
      else if (this.props.order.answered&&!this.props.order.result) return "-";
    }
    textoRechazada() {
        if (this.props.order.answered&&this.props.order.result) return "-";
        else if (this.props.order.answered&&!this.props.order.result) return "Rechazada";
    }

  render() {
    return (
      <tr>
        <td>
            {this.props.order.clientEmail}
        </td>
        <td>
            {this.props.order.amount}
        </td>
        <td>
            {this.props.order.answered? this.textoAceptada():
                this.props.order.expired ?
                    <p>Vencida</p>
                    :
                <a onClick={this.accept.bind(this)}>
                    <i className="fa fa-check"/>
                </a>
            }
        </td>
        <td>
            {this.props.order.answered ? this.textoRechazada():
                this.props.order.expired ?
                    <p>Vencida</p>
                    :
                    <a onClick={this.decline.bind(this)}>
                        <i className="fa fa-times"/>
                    </a>
            }
        </td>
      </tr>

    );
  }
}