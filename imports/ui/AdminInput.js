import React, {Component} from "react";

export default class AdminInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="OrderAdd">
                <h3>Configuraciones simulación</h3>

                <div className="row">
                    <form action="">
                        <div className="col-md-8">
                            <label>Tiempo de la simulación</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                placeholder="Minutos"
                                ref="simulationTime"/>
                            <label>Tiempo entre pedidos</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                placeholder="Segundos"
                                ref="intervalTime"/>
                            <label>Tiempo para perder una orden</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                placeholder="Segundos"
                                ref="orderTime"/>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary"
                                    onClick={
                                        (e) =>{
                                            e.preventDefault();
                                            this.props.onSubmit(parseInt(this.refs.simulationTime.value), parseInt(this.refs.intervalTime.value), parseInt(this.refs.orderTime.value))
                                        }
                                    }>Start
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
