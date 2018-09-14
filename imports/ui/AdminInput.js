import React, {Component} from "react";

export default class AdminInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="OrderAdd">
                <h3>Tiempo entre pedidos</h3>

                <div className="row">
                    <form action="">
                        <div className="col-md-8">
                            <input
                                required
                                type="number"
                                className="form-control"
                                placeholder="Segundos"
                                ref="time"/>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary"
                                    onClick={
                                        (e) =>{
                                            e.preventDefault();
                                            this.props.onSubmit(parseInt(this.refs.time.value))
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
