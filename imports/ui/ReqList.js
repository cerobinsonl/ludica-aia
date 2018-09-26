import React, { Component } from "react";

import Request from "./Request";

export default class ReqList extends Component {
  constructor(props) {
    super(props);

  }

  renderRequests() {
    return this.props.reqs.map((p,i) =>
      <Request
        key={i}
        req={p}>
      </Request>
    );
  }
  render() {
    return (
      <div className="ReqList">
        <h2>Pedidos realizados</h2>
        <table className="table table-hover table-striped">
          <thead>
          <tr>
              <th>
                  Correo proveedor
              </th>
              <th>
                  Cantidad
              </th>
              <th>
                  Estado
              </th>
          </tr>
          </thead>
          <tbody>
          {this.renderRequests()}
          </tbody>

        </table>

      </div>
    );
  }
}
