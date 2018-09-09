import React, { Component } from "react";

export default class Request extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
            {this.props.req.providerEmail}
        </td>
        <td>
            {this.props.req.amount}
        </td>
        <td>
            {this.props.req.answered && this.props.req.result ?
                "Aceptado":null
            }
            {this.props.req.answered && !this.props.req.result ?
                "Rechazado":null
            }
            {!this.props.req.answered ?
                "Esperando respuesta":null
            }

        </td>
      </tr>

    );
  }
}
